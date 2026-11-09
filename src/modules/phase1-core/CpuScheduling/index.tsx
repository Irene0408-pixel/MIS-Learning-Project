import React from 'react';
import { TheorySection } from './TheorySection';
import { VisualCanvas } from './VisualCanvas';
import { QuizSection } from './QuizSection';

export const CpuSchedulingModule: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* 1. 理論與觀念解析區 (Theory & Real-world Context) */}
      <TheorySection />

      {/* 2. 互動沙盒操作區 (Interactive Visual Sandbox) */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>互動沙盒：排班演算法動態模擬</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            調整時間配額 Quantum 與各行程 Burst Time，使用「步驟分步控制」深入觀察 CPU 核心分配、就緒隊列與甘特圖生成過程。
          </p>
        </div>

        <VisualCanvas />
      </section>

      {/* 3. 隨堂小考與觀念驗證區 (Self-assessment Quiz) */}
      <QuizSection />
    </div>
  );
};
