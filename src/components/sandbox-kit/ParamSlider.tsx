import React from 'react';

export interface ParamSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  description?: string;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const ParamSlider: React.FC<ParamSliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  description,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-1.5 py-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 tracking-tight flex items-center gap-1.5">
          {label}
        </label>
        <span className="font-mono text-xs font-bold text-academic-700 bg-academic-50 border border-academic-200/80 px-2 py-0.5 rounded">
          {value} {unit}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-academic-600 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {description && (
        <span className="text-[11px] text-slate-500 leading-tight">
          {description}
        </span>
      )}
    </div>
  );
};
