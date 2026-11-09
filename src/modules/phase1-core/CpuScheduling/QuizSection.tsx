import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: '在 Round Robin (時間片輪轉) 排班演算法中，如果將時間配額 (Time Quantum) 設定得「極大」（大於所有行程的執行時間），該演算法的行為將等同於下列何者？',
    options: [
      'SJF (最短工作優先)',
      'FCFS (先來先服務)',
      'Priority Scheduling (優先權排班)',
      'Multilevel Feedback Queue (多層回饋佇列)',
    ],
    correctIndex: 1,
    explanation: '當 Time Quantum 趨近於無限大時，每個行程在分配到 CPU 後都能直接執行至完畢，不再發生因時間用罄而被強制搶占放回隊尾的情況，因此完全退化為先來先服務 (FCFS)。',
  },
  {
    id: 2,
    question: 'SJF (Shortest Job First) 在理論上被證明能達成「最小的平均等待時間」，然而在通用的作業系統核心中難以完美實現，最根本的原因為何？',
    options: [
      '作業系統無法精確預測行程「下一次的 CPU Burst 時間」',
      'SJF 需要過於龐大的記憶體空間儲存隊列',
      'SJF 無法在多核心處理器上執行',
      'SJF 會導致 CPU 稼動率嚴重下降',
    ],
    correctIndex: 0,
    explanation: 'SJF 最大的實務難題在於 OS 無法預知使用者的行程還需要執行多久（雖然可透過指數平滑法 Exponential Smoothing 預測，但仍有誤差），因此純粹的 SJF 屬於理論最佳基準。',
  },
  {
    id: 3,
    question: '【台積電 MFG SME 面試實務情境】若晶圓代工廠的機台派工採取類似 FCFS 的策略，當產線遭遇長時間批次（CPU-bound / 長製程）卡在瓶頸機台前方時，最可能引發何種生產危機？',
    options: [
      '機台損耗率過高導致當機',
      '引發護衛效應 (Convoy Effect)，使大量後續短製程急單 (Hot Lots) 嚴重超時延遲',
      '晶圓製造良率 (Yield) 立即降為零',
      '機台更換光罩的 Setup 時間自動歸零',
    ],
    correctIndex: 1,
    explanation: '此現象即為製造系統中的「護衛效應 (Convoy Effect)」：如同高速公路上慢速重卡卡在最前端，後方所有輕便小車都被迫以最慢速度蠕行，將造成產線在製品 (WIP) 大量積壓、客戶達交率 (On-Time Delivery) 急遽惡化。',
  },
];

export const QuizSection: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = QUESTIONS.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <section className="space-y-4">
      <Card variant="academic">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-academic-600" />
              <CardTitle className="text-base">
                隨堂小考與觀念驗證 (Self-assessment Quiz)
              </CardTitle>
            </div>
            {showResults && (
              <Badge variant={correctCount === QUESTIONS.length ? 'emerald' : 'amber'}>
                得分: {correctCount} / {QUESTIONS.length}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {QUESTIONS.map((q, qIndex) => {
            const userAnswer = selectedAnswers[q.id];
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <div key={q.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-xs font-bold bg-academic-100 text-academic-700 px-2 py-0.5 rounded shrink-0">
                    Q{qIndex + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                    {q.question}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = userAnswer === optIndex;
                    let btnStyle = 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200';

                    if (showResults) {
                      if (optIndex === q.correctIndex) {
                        btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-800 font-medium';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-50 border-rose-300 text-rose-800';
                      } else {
                        btnStyle = 'bg-white opacity-60 border-slate-200';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-academic-50 border-academic-500 text-academic-800 font-medium';
                    }

                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleSelectOption(q.id, optIndex)}
                        disabled={showResults}
                        className={`text-left text-xs p-3 rounded-lg border transition-all flex items-start gap-2 ${btnStyle}`}
                      >
                        <span className="font-mono font-bold text-slate-400 shrink-0">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        <span className="leading-tight">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* 結果與解析 */}
                {showResults && (
                  <div className={`p-3 rounded-md text-xs leading-relaxed ${isCorrect ? 'bg-emerald-50/80 border border-emerald-200 text-emerald-900' : 'bg-amber-50/80 border border-amber-200 text-amber-900'}`}>
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>答對了！</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>需要留意：正解為 ({String.fromCharCode(65 + q.correctIndex)})</span>
                        </>
                      )}
                    </div>
                    <p className="text-slate-600">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* 底部操作按鈕 */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              已完成 {answeredCount} / {QUESTIONS.length} 題
            </span>

            <div className="flex items-center gap-2">
              {showResults ? (
                <Button variant="outline" size="sm" onClick={handleResetQuiz}>
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  重新測驗
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  disabled={answeredCount === 0}
                  onClick={() => setShowResults(true)}
                >
                  提交答案並檢閱詳解
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
