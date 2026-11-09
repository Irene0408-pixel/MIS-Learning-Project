import React, { useRef, useEffect } from 'react';
import { Terminal, Trash2 } from 'lucide-react';

export interface LogEntry {
  id: string;
  timestamp: string;
  step?: number;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export interface LogViewerProps {
  logs: LogEntry[];
  onClear?: () => void;
  maxHeight?: string;
  title?: string;
}

export const LogViewer: React.FC<LogViewerProps> = ({
  logs,
  onClear,
  maxHeight = '220px',
  title = '即時運算日誌 (Operation Log)',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const typeStyles = {
    info: 'text-slate-300',
    success: 'text-emerald-400 font-medium',
    warning: 'text-amber-300 font-medium',
    error: 'text-rose-400 font-medium',
  };

  return (
    <div className="flex flex-col bg-slate-950 border border-slate-800 rounded-lg overflow-hidden shadow-subtle">
      {/* 頂部標題列 */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/90 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-mono font-medium">
          <Terminal className="w-3.5 h-3.5 text-academic-400" />
          <span>{title}</span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-full">
            {logs.length}
          </span>
        </div>

        {onClear && (
          <button
            onClick={onClear}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded hover:bg-slate-800"
            title="清空日誌"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* 日誌內容視窗 */}
      <div
        ref={containerRef}
        style={{ maxHeight }}
        className="p-3 font-mono text-xs overflow-y-auto space-y-1.5 leading-relaxed selection:bg-slate-800"
      >
        {logs.length === 0 ? (
          <div className="text-slate-600 italic py-4 text-center">
            尚無日誌記錄。請點選「下一步」或「播放」啟動沙盒運算...
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 hover:bg-slate-900/50 p-0.5 rounded">
              <span className="text-slate-600 shrink-0 text-[11px] select-none">
                [{log.timestamp}]
              </span>
              {log.step !== undefined && (
                <span className="text-academic-400 shrink-0 text-[11px] font-semibold select-none">
                  [Step {log.step}]
                </span>
              )}
              <span className={typeStyles[log.type || 'info']}>
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
