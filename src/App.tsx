import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { CpuSchedulingModule } from './modules/phase1-core/CpuScheduling';
import { MODULES } from './data/curriculum';
import { Card } from './components/ui/Card';
import { Badge } from './components/ui/Badge';
import { Sparkles, BookOpen, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string>('cpu-scheduling');
  const [filterPhase, setFilterPhase] = useState<number | null>(null);

  const activeModule = MODULES.find((m) => m.id === activeModuleId);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar currentPhase={filterPhase} onSelectPhase={setFilterPhase} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* 左側：模組與階段導航選單 */}
          <Sidebar
            activeModuleId={activeModuleId}
            onSelectModule={setActiveModuleId}
            filterPhase={filterPhase}
          />

          {/* 右側：主內容區塊 */}
          <div className="flex-1 min-w-0 w-full">
            {activeModuleId === 'cpu-scheduling' ? (
              <CpuSchedulingModule />
            ) : (
              <div className="space-y-6">
                <Card variant="academic" className="p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-academic-50 text-academic-600 flex items-center justify-center mx-auto border border-academic-200">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="blue" size="sm">Phase {activeModule?.phase}</Badge>
                      <Badge variant="amber" size="sm">即將推出 (Upcoming)</Badge>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {activeModule?.title}
                    </h2>
                    <p className="text-sm text-slate-600 max-w-xl mx-auto">
                      {activeModule?.description}
                    </p>
                  </div>

                  {activeModule?.interviewFocus && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg max-w-xl mx-auto text-left text-xs space-y-1">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-academic-600" />
                        面試與業界對標焦點：
                      </span>
                      <p className="text-slate-600 leading-relaxed pl-5">
                        {activeModule.interviewFocus}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setActiveModuleId('cpu-scheduling')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-academic-600 hover:bg-academic-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                    >
                      <span>前往已上線模組：CPU 排班演算法</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
