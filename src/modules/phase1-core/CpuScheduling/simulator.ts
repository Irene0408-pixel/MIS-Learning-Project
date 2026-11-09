import { Process, SchedulingAlgorithm, SimulationStep, GanttBlock } from './types';

export const INITIAL_PROCESSES: Process[] = [
  { id: 'P1', name: 'P1', arrivalTime: 0, burstTime: 6, remainingTime: 6, color: '#3B82F6' }, // Blue
  { id: 'P2', name: 'P2', arrivalTime: 1, burstTime: 3, remainingTime: 3, color: '#10B981' }, // Emerald
  { id: 'P3', name: 'P3', arrivalTime: 2, burstTime: 8, remainingTime: 8, color: '#F59E0B' }, // Amber
  { id: 'P4', name: 'P4', arrivalTime: 3, burstTime: 4, remainingTime: 4, color: '#8B5CF6' }, // Purple
];

export function runSimulation(
  processesInput: Process[],
  algorithm: SchedulingAlgorithm,
  quantum: number = 2
): SimulationStep[] {
  // 深度複製輸入行程
  const processes: Process[] = processesInput.map((p) => ({
    ...p,
    remainingTime: p.burstTime,
    waitingTime: 0,
    turnaroundTime: 0,
  }));

  const steps: SimulationStep[] = [];
  let currentTime = 0;
  let readyQueue: Process[] = [];
  const completedProcesses: Process[] = [];
  const ganttChart: GanttBlock[] = [];
  let currentRunning: Process | null = null;
  let currentQuantumUsed = 0;

  // 初始步驟 (t = 0)
  const initialArrivals = processes.filter((p) => p.arrivalTime === 0);
  initialArrivals.forEach((p) => readyQueue.push({ ...p }));

  steps.push({
    stepIndex: 0,
    currentTime: 0,
    runningProcess: null,
    readyQueue: [...readyQueue],
    completedProcesses: [],
    ganttChart: [],
    logMessage: `[系統初始化] 演算法: ${algorithm}。時間 t=0，行程 ${initialArrivals.map((p) => p.name).join(', ') || '無'} 進入 Ready Queue。`,
    logType: 'info',
    metrics: { avgWaitingTime: 0, avgTurnaroundTime: 0, cpuUtilization: 0 },
  });

  const totalBurst = processes.reduce((acc, p) => acc + p.burstTime, 0);
  const maxSimulationTime = totalBurst + 20; // 避免死迴圈保護

  let stepCounter = 1;

  while (completedProcesses.length < processes.length && currentTime < maxSimulationTime) {
    // 檢查是否有新抵達的行程 (排除已在隊列或已完成者)
    const newArrivals = processes.filter(
      (p) =>
        p.arrivalTime === currentTime &&
        p.arrivalTime > 0 &&
        !readyQueue.some((q) => q.id === p.id) &&
        (!currentRunning || currentRunning.id !== p.id) &&
        !completedProcesses.some((c) => c.id === p.id)
    );

    newArrivals.forEach((p) => readyQueue.push({ ...p }));

    // 依據演算法挑選執行的行程
    if (!currentRunning) {
      if (readyQueue.length > 0) {
        if (algorithm === 'SJF') {
          // 最短工作優先 (Shortest Job First)
          readyQueue.sort((a, b) => a.remainingTime - b.remainingTime);
        }
        currentRunning = readyQueue.shift()!;
        currentQuantumUsed = 0;

        steps.push({
          stepIndex: stepCounter++,
          currentTime,
          runningProcess: { ...currentRunning },
          readyQueue: [...readyQueue],
          completedProcesses: [...completedProcesses],
          ganttChart: [...ganttChart],
          logMessage: `[排班派工] CPU 分配給行程 ${currentRunning.name} (剩餘執行時間: ${currentRunning.remainingTime})。`,
          logType: 'info',
          metrics: calculateMetrics(processes, completedProcesses, currentTime),
        });
      } else {
        // CPU Idle 空轉
        currentTime++;
        continue;
      }
    }

    // 執行 1 個時間單位
    const execStartTime = currentTime;
    currentTime++;
    currentRunning.remainingTime--;
    currentQuantumUsed++;

    // 更新甘特圖
    const lastGantt = ganttChart[ganttChart.length - 1];
    if (lastGantt && lastGantt.processId === currentRunning.id && lastGantt.end === execStartTime) {
      lastGantt.end = currentTime;
    } else {
      ganttChart.push({
        processId: currentRunning.id,
        name: currentRunning.name,
        start: execStartTime,
        end: currentTime,
        color: currentRunning.color,
      });
    }

    // 檢查執行中是否有新抵達行程
    const arrivalsDuringExec = processes.filter(
      (p) =>
        p.arrivalTime === currentTime &&
        !readyQueue.some((q) => q.id === p.id) &&
        (!currentRunning || currentRunning.id !== p.id) &&
        !completedProcesses.some((c) => c.id === p.id)
    );
    arrivalsDuringExec.forEach((p) => readyQueue.push({ ...p }));

    // 檢查目前行程是否完成
    if (currentRunning.remainingTime === 0) {
      const turnaround = currentTime - currentRunning.arrivalTime;
      const waiting = turnaround - currentRunning.burstTime;
      const finished: Process = {
        ...currentRunning,
        completionTime: currentTime,
        turnaroundTime: turnaround,
        waitingTime: waiting,
      };
      completedProcesses.push(finished);

      steps.push({
        stepIndex: stepCounter++,
        currentTime,
        runningProcess: null,
        readyQueue: [...readyQueue],
        completedProcesses: [...completedProcesses],
        ganttChart: [...ganttChart],
        logMessage: `[執行完成] 行程 ${finished.name} 於 t=${currentTime} 完成！周轉時間: ${turnaround}, 等待時間: ${waiting}。`,
        logType: 'success',
        metrics: calculateMetrics(processes, completedProcesses, currentTime),
      });

      currentRunning = null;
      currentQuantumUsed = 0;
    } else if (algorithm === 'RR' && currentQuantumUsed >= quantum) {
      // Round Robin 時間配額耗盡，觸發 Context Switch
      readyQueue.push({ ...currentRunning });

      steps.push({
        stepIndex: stepCounter++,
        currentTime,
        runningProcess: null,
        readyQueue: [...readyQueue],
        completedProcesses: [...completedProcesses],
        ganttChart: [...ganttChart],
        logMessage: `[時間配額耗盡] 行程 ${currentRunning.name} 用完 Quantum=${quantum}，觸發 Context Switch 放回隊尾。`,
        logType: 'warning',
        metrics: calculateMetrics(processes, completedProcesses, currentTime),
      });

      currentRunning = null;
      currentQuantumUsed = 0;
    }
  }

  return steps;
}

function calculateMetrics(
  _allProcesses: Process[],
  completed: Process[],
  currentTime: number
): { avgWaitingTime: number; avgTurnaroundTime: number; cpuUtilization: number } {
  if (completed.length === 0) {
    return { avgWaitingTime: 0, avgTurnaroundTime: 0, cpuUtilization: 0 };
  }

  const totalWaiting = completed.reduce((acc, p) => acc + (p.waitingTime || 0), 0);
  const totalTurnaround = completed.reduce((acc, p) => acc + (p.turnaroundTime || 0), 0);
  const totalBusyTime = completed.reduce((acc, p) => acc + p.burstTime, 0);

  return {
    avgWaitingTime: Number((totalWaiting / completed.length).toFixed(2)),
    avgTurnaroundTime: Number((totalTurnaround / completed.length).toFixed(2)),
    cpuUtilization: currentTime > 0 ? Number(Math.min(100, (totalBusyTime / currentTime) * 100).toFixed(1)) : 0,
  };
}
