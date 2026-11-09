import React from 'react';
import { BookOpen, ShieldCheck, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-academic-600" />
          <span className="font-semibold text-slate-800">
            資管核心知識與互動沙盒學習平台 (mis-learning-sandbox)
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>對標半導體製造與後端系統架構</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-slate-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>AGENTS.md Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
