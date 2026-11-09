import React from 'react';
import { MODULES, PHASES, ModuleMeta } from '../../data/curriculum';
import { Badge } from '../ui/Badge';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface SidebarProps {
  activeModuleId: string;
  onSelectModule: (moduleId: string) => void;
  filterPhase: number | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModuleId,
  onSelectModule,
  filterPhase,
}) => {
  const displayedPhases = filterPhase
    ? PHASES.filter((p) => p.phase === filterPhase)
    : PHASES;

  const getStatusBadge = (status: ModuleMeta['status']) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="emerald" size="sm" className="gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" /> 已上線沙盒
          </Badge>
        );
      case 'upcoming':
        return (
          <Badge variant="amber" size="sm" className="gap-1">
            <Sparkles className="w-2.5 h-2.5" /> 即將推出
          </Badge>
        );
      case 'planned':
        return (
          <Badge variant="slate" size="sm" className="gap-1">
            <Clock className="w-2.5 h-2.5" /> 規劃中
          </Badge>
        );
    }
  };

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6">
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-subtle">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            一年期核心藍圖
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            {MODULES.length} 單元
          </span>
        </div>

        <div className="space-y-5">
          {displayedPhases.map((phase) => {
            const phaseModules = MODULES.filter((m) => m.phase === phase.phase);

            return (
              <div key={phase.phase} className="space-y-1.5">
                <div className="flex items-baseline justify-between px-1">
                  <span className="text-xs font-bold text-slate-900 tracking-tight">
                    Phase {phase.phase}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {phase.timeframe}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 px-1 font-medium truncate mb-1">
                  {phase.name}
                </div>

                <div className="space-y-1">
                  {phaseModules.map((module) => {
                    const isActive = module.id === activeModuleId;

                    return (
                      <button
                        key={module.id}
                        onClick={() => onSelectModule(module.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all flex flex-col gap-1 border ${
                          isActive
                            ? 'bg-academic-50/80 border-academic-300 text-academic-900 shadow-xs'
                            : 'bg-white hover:bg-slate-50/80 border-transparent text-slate-700 hover:border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className={`font-semibold line-clamp-1 ${isActive ? 'text-academic-700' : 'text-slate-800'}`}>
                            {module.title}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-mono">{module.durationWeek}</span>
                          {getStatusBadge(module.status)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
