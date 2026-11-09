import React from 'react';
import { Layers, Cpu, Award } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface NavbarProps {
  currentPhase: number | null;
  onSelectPhase: (phase: number | null) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPhase, onSelectPhase }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo 與平台標題 */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectPhase(null)}>
          <div className="w-9 h-9 rounded-lg bg-academic-600 flex items-center justify-center text-white shadow-sm">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
                MIS Learning Sandbox
              </span>
              <Badge variant="blue" size="sm">v1.0</Badge>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              資管核心知識與互動沙盒學習平台
            </p>
          </div>
        </div>

        {/* Phase 快速導航與對標標籤 */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => onSelectPhase(null)}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                currentPhase === null
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              全部階段
            </button>
            {[1, 2, 3, 4].map((p) => (
              <button
                key={p}
                onClick={() => onSelectPhase(p)}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  currentPhase === p
                    ? 'bg-academic-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Phase {p}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:pl-4">
            <Badge variant="emerald" size="sm" className="hidden lg:inline-flex items-center gap-1">
              <Award className="w-3 h-3" />
              對標台積電 MFG SME / IT
            </Badge>
            <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
              <Layers className="w-3.5 h-3.5 text-academic-600" />
              <span>4 Phases</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
