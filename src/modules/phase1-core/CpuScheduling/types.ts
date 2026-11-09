export interface Process {
  id: string;
  name: string;
  arrivalTime: number;
  burstTime: number;
  remainingTime: number;
  startTime?: number;
  completionTime?: number;
  waitingTime?: number;
  turnaroundTime?: number;
  color: string;
}

export type SchedulingAlgorithm = 'FCFS' | 'SJF' | 'RR';

export interface GanttBlock {
  processId: string;
  name: string;
  start: number;
  end: number;
  color: string;
}

export interface SimulationStep {
  stepIndex: number;
  currentTime: number;
  runningProcess: Process | null;
  readyQueue: Process[];
  completedProcesses: Process[];
  ganttChart: GanttBlock[];
  logMessage: string;
  logType: 'info' | 'success' | 'warning' | 'error';
  metrics: {
    avgWaitingTime: number;
    avgTurnaroundTime: number;
    cpuUtilization: number;
  };
}
