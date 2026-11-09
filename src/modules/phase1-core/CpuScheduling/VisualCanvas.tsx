import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { StepController } from '../../../components/sandbox-kit/StepController';
import { ParamSlider } from '../../../components/sandbox-kit/ParamSlider';
import { LogViewer, LogEntry } from '../../../components/sandbox-kit/LogViewer';
import { Process, SchedulingAlgorithm } from './types';
import { INITIAL_PROCESSES, runSimulation } from './simulator';
import { Sliders, Activity, Clock, Cpu } from 'lucide-react';

export const VisualCanvas: React.FC = () => {
  // 參數配置
  const [algorithm, setAlgorithm] = useState<SchedulingAlgorithm>('RR');
  const [quantum, setQuantum] = useState<number>(2);
  const [processes, setProcesses] = useState<Process[]>(INITIAL_PROCESSES);

  // 播放與步驟狀態
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(800);

  // 模擬演算法預運算所有步驟
  const simulationSteps = React.useMemo(() => {
    return runSimulation(processes, algorithm, quantum);
  }, [processes, algorithm, quantum]);

  // 當前步驟資料
  const currentStep = simulationSteps[stepIndex] || simulationSteps[0];

  // 日誌陣列
  const logs: LogEntry[] = React.useMemo(() => {
    return simulationSteps.slice(0, stepIndex + 1).map((s) => ({
      id: `step-${s.stepIndex}`,
      timestamp: new Date().toLocaleTimeString(),
      step: s.stepIndex,
      message: s.logMessage,
      type: s.logType,
    }));
  }, [simulationSteps, stepIndex]);

  // 自動播放計時器
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      if (stepIndex < simulationSteps.length - 1) {
        timer = setTimeout(() => {
          setStepIndex((prev) => prev + 1);
        }, speedMs);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, stepIndex, simulationSteps.length, speedMs]);

  // 重置
  const handleReset = () => {
    setIsPlaying(false);
    setStepIndex(0);
  };

  const handleStepNext = () => {
    if (stepIndex < simulationSteps.length - 1) {
      setStepIndex((prev) => prev + 1);
    }
  };

  const handleStepPrev = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  };

  const handleProcessBurstChange = (id: string, newBurst: number) => {
    setProcesses((prev) =>
      prev.map((p) => (p.id === id ? { ...p, burstTime: newBurst } : p))
    );
    handleReset();
  };

  return (
    <div className="space-y-6">
      {/* 步驟分步控制器 */}
      <StepController
        currentStep={stepIndex}
        totalSteps={simulationSteps.length - 1}
        isPlaying={isPlaying}
        onStepNext={handleStepNext}
        onStepPrev={handleStepPrev}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onReset={handleReset}
        speedMs={speedMs}
        onSpeedChange={setSpeedMs}
      />

      {/* 主操作與畫布網格 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 左側：即時參數調校面板 (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card variant="academic">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-academic-600" />
                <CardTitle className="text-sm">即時參數調校 (Live Parameters)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 排班演算法選擇 */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">
                  排班演算法 (Algorithm)
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
                  {(['FCFS', 'SJF', 'RR'] as SchedulingAlgorithm[]).map((algo) => (
                    <button
                      key={algo}
                      onClick={() => {
                        setAlgorithm(algo);
                        handleReset();
                      }}
                      className={`text-xs py-1.5 font-medium rounded transition-all ${
                        algorithm === algo
                          ? 'bg-academic-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {algo}
                    </button>
                  ))}
                </div>
              </div>

              {/* RR 時間配額滑桿 */}
              {algorithm === 'RR' && (
                <div className="p-3 bg-academic-50/60 rounded-lg border border-academic-200/80">
                  <ParamSlider
                    label="時間配額 (Time Quantum)"
                    value={quantum}
                    min={1}
                    max={6}
                    unit="單位"
                    description="每次分配給行程的最大執行時間。過短會增加上下文切換頻率。"
                    onChange={(val) => {
                      setQuantum(val);
                      handleReset();
                    }}
                  />
                </div>
              )}

              {/* 各行程 Burst Time 微調 */}
              <div className="border-t border-slate-100 pt-3 space-y-2">
                <span className="text-xs font-semibold text-slate-700 block">
                  自訂行程執行時長 (Burst Time)
                </span>
                {processes.map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold flex items-center gap-1.5" style={{ color: p.color }}>
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: p.color }} />
                      {p.name} (抵達 t={p.arrivalTime})
                    </span>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={p.burstTime}
                      onChange={(e) => handleProcessBurstChange(p.id, Math.max(1, Number(e.target.value)))}
                      className="w-16 px-2 py-1 text-center font-mono text-xs border border-slate-300 rounded focus:ring-1 focus:ring-academic-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 即時指標統計 */}
          <Card variant="academic">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <CardTitle className="text-sm">系統效能指標 (Metrics)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[11px] text-slate-500 block">平均等待時間</span>
                <span className="text-xl font-bold font-mono text-academic-700">
                  {currentStep.metrics.avgWaitingTime}
                </span>
                <span className="text-[10px] text-slate-400"> 單位時間</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[11px] text-slate-500 block">平均周轉時間</span>
                <span className="text-xl font-bold font-mono text-slate-800">
                  {currentStep.metrics.avgTurnaroundTime}
                </span>
                <span className="text-[10px] text-slate-400"> 單位時間</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右側：動態渲染畫布與狀態 (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <Card variant="academic">
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-academic-600" />
                  <CardTitle className="text-sm">
                    即時狀態：時間 t = <span className="text-academic-600 font-mono text-base">{currentStep.currentTime}</span>
                  </CardTitle>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  已完成: {currentStep.completedProcesses.length} / {processes.length}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* CPU 執行核心與 Ready Queue 視圖 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Ready Queue 隊列 */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2.5">
                    <span>就緒隊列 (Ready Queue)</span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {currentStep.readyQueue.length} 個等待中
                    </span>
                  </div>
                  <div className="flex items-center gap-2 min-h-[52px] overflow-x-auto p-1 bg-white border border-dashed border-slate-300 rounded-md">
                    {currentStep.readyQueue.length === 0 ? (
                      <span className="text-slate-400 text-xs italic mx-auto">隊列為空 (Queue Empty)</span>
                    ) : (
                      currentStep.readyQueue.map((p, idx) => (
                        <div
                          key={`${p.id}-${idx}`}
                          className="px-3 py-1.5 rounded text-white text-xs font-mono font-bold shadow-xs shrink-0 flex items-center gap-1.5"
                          style={{ backgroundColor: p.color }}
                        >
                          <span>{p.name}</span>
                          <span className="text-[10px] opacity-80">({p.remainingTime})</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* CPU 執行單元 */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2.5">
                    <span>CPU 執行核心 (Active Core)</span>
                    <span className="text-emerald-600 font-mono text-[11px] font-bold">
                      {currentStep.runningProcess ? 'BUSY' : 'IDLE'}
                    </span>
                  </div>
                  <div className="flex items-center justify-center min-h-[52px] bg-white border border-slate-200 rounded-md">
                    {currentStep.runningProcess ? (
                      <div
                        className="px-4 py-2 rounded text-white text-sm font-mono font-bold shadow-sm flex items-center gap-2 animate-pulse"
                        style={{ backgroundColor: currentStep.runningProcess.color }}
                      >
                        <Cpu className="w-4 h-4" />
                        <span>執行中: {currentStep.runningProcess.name}</span>
                        <span className="text-xs bg-black/20 px-1.5 py-0.5 rounded">
                          剩餘 {currentStep.runningProcess.remainingTime}
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs italic">CPU 空轉中 (Idle)</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 甘特圖 (Gantt Chart) */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-academic-600" />
                    動態甘特圖 (Gantt Chart Timeline)
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    區段數: {currentStep.ganttChart.length}
                  </span>
                </div>

                {currentStep.ganttChart.length === 0 ? (
                  <div className="h-16 flex items-center justify-center bg-slate-50 border border-dashed border-slate-300 rounded-lg text-slate-400 text-xs italic">
                    尚未開始執行，點擊「下一步」以生成甘特圖...
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-lg p-2.5 bg-white overflow-x-auto">
                    {/* 甘特方塊條 */}
                    <div className="flex items-stretch h-12 gap-0.5">
                      {currentStep.ganttChart.map((block, idx) => {
                        const duration = block.end - block.start;
                        return (
                          <div
                            key={idx}
                            style={{
                              backgroundColor: block.color,
                              flexGrow: duration,
                              minWidth: `${Math.max(36, duration * 24)}px`,
                            }}
                            className="text-white text-xs font-mono font-bold flex flex-col items-center justify-center rounded-sm transition-all shadow-2xs"
                          >
                            <span>{block.name}</span>
                            <span className="text-[10px] opacity-80">{duration}t</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* 時間刻度標記 */}
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1.5 px-0.5">
                      <span>0</span>
                      {currentStep.ganttChart.map((block, idx) => (
                        <span key={idx}>{block.end}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 即時操作日誌 (Operation Log) */}
              <LogViewer logs={logs} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
