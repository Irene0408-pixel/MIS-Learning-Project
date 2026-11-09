import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, FastForward } from 'lucide-react';
import { Button } from '../ui/Button';

export interface StepControllerProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  onStepNext: () => void;
  onStepPrev: () => void;
  onTogglePlay: () => void;
  onReset: () => void;
  speedMs: number;
  onSpeedChange?: (speedMs: number) => void;
  disabled?: boolean;
}

export const StepController: React.FC<StepControllerProps> = ({
  currentStep,
  totalSteps,
  isPlaying,
  onStepNext,
  onStepPrev,
  onTogglePlay,
  onReset,
  speedMs,
  onSpeedChange,
  disabled = false,
}) => {
  const canGoPrev = currentStep > 0 && !disabled;
  const canGoNext = currentStep < totalSteps && !disabled;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900 text-slate-100 rounded-lg shadow-sm border border-slate-800">
      {/* 步驟進度指示 */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            執行進度 (Step)
          </span>
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-lg font-bold text-academic-300">{currentStep}</span>
            <span className="text-slate-500">/</span>
            <span className="text-sm text-slate-400">{totalSteps}</span>
          </div>
        </div>

        {/* 進度條 */}
        <div className="w-24 sm:w-32 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60 hidden sm:block">
          <div
            className="h-full bg-academic-500 transition-all duration-300 ease-out"
            style={{ width: `${totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* 控制按鈕群組 */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          onClick={onStepPrev}
          disabled={!canGoPrev || isPlaying}
          title="上一步 (Step Back)"
          className="border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white"
        >
          <SkipBack className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">上一步</span>
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={onTogglePlay}
          disabled={disabled || (currentStep >= totalSteps && !isPlaying)}
          title={isPlaying ? '暫停 (Pause)' : '自動播放 (Auto Play)'}
          className={isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-academic-600 hover:bg-academic-700'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 mr-1 fill-current" />
              <span>暫停</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-1 fill-current" />
              <span>播放</span>
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onStepNext}
          disabled={!canGoNext || isPlaying}
          title="下一步 (Step Next)"
          className="border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white"
        >
          <span className="hidden sm:inline">下一步</span>
          <SkipForward className="w-4 h-4 ml-1" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          disabled={disabled}
          title="重置為初始狀態 (Reset)"
          className="text-slate-400 hover:text-slate-200 hover:bg-slate-800 ml-1"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          <span className="hidden md:inline">重置</span>
        </Button>
      </div>

      {/* 播放速度控制 */}
      {onSpeedChange && (
        <div className="flex items-center gap-2 text-xs text-slate-400 border-l border-slate-800 pl-3">
          <FastForward className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden lg:inline">速度:</span>
          <select
            value={speedMs}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="bg-slate-800 text-slate-200 text-xs rounded border border-slate-700 py-1 px-1.5 focus:outline-none focus:ring-1 focus:ring-academic-400"
          >
            <option value={1500}>0.5x (慢速)</option>
            <option value={800}>1.0x (標準)</option>
            <option value={400}>2.0x (快速)</option>
          </select>
        </div>
      )}
    </div>
  );
};
