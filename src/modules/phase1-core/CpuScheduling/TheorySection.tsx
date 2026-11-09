import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { BookOpen, Factory, Cpu, AlertTriangle, ArrowRight } from 'lucide-react';

export const TheorySection: React.FC = () => {
  return (
    <section className="space-y-6">
      {/* 標題與簡介 */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="blue" size="sm">Phase 1: 作業系統核心</Badge>
          <Badge variant="emerald" size="sm">面試高頻焦點</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          CPU 排班演算法 (CPU Scheduling)
        </h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
          作業系統的核心職責之一，就是在多個並行行程（Processes）之間公平、高效地分配寶貴的 CPU 運算資源。理解不同排班策略的權衡（Trade-offs），是掌握分散式後端與高併發架構的基石。
        </p>
      </div>

      {/* 核心概念卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="academic" className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-academic-600" />
            <h4 className="font-semibold text-slate-900 text-sm">FCFS (先來先服務)</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            最簡單直觀的非搶占演算法。按照抵達順序排隊。致命缺點為<strong>護衛效應 (Convoy Effect)</strong>：若開頭為 CPU-bound 長行程，後續多個短行程將被迫漫長等待。
          </p>
        </Card>

        <Card variant="academic" className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <h4 className="font-semibold text-slate-900 text-sm">SJF (最短工作優先)</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            每次挑選 Burst Time 最短者執行。數學上能保證<strong>最低的平均等待時間 (Minimal Avg Waiting Time)</strong>，但實務上難以精確預測行程未來耗時，且長行程面臨<strong>飢餓 (Starvation)</strong>。
          </p>
        </Card>

        <Card variant="academic" className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h4 className="font-semibold text-slate-900 text-sm">Round Robin (時間片輪轉)</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            現代分時系統的核心。每個行程分配固定的<strong>時間配額 (Time Quantum)</strong>。Quantum 過大退化為 FCFS，過小則引發過多<strong>上下文切換 (Context Switch)</strong> 浪費 CPU 週期。
          </p>
        </Card>
      </div>

      {/* 業界實務對照：台積電晶圓代工與 OS 的對比 */}
      <Card variant="default" className="border-l-4 border-l-academic-600 bg-gradient-to-r from-academic-50/40 to-transparent">
        <CardHeader className="border-b-0 pb-1">
          <div className="flex items-center gap-2">
            <Factory className="w-5 h-5 text-academic-700" />
            <CardTitle className="text-academic-900 text-base">
              【業界實務對標】半導體晶圓廠派工 (Fab Dispatching) vs. CPU 排班
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
          <p>
            在<strong>台積電 (TSMC) 等先進半導體製造廠</strong>中，製造執行系統（MES）內的動態派工演算法（Dispatching Rules）與作業系統的 CPU 排班本質完全相通：
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3 rounded-lg border border-slate-200">
            <div className="space-y-1.5">
              <span className="font-bold text-slate-900 block">作業系統 (OS) 世界</span>
              <ul className="space-y-1 text-slate-600">
                <li className="flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-academic-500" />
                  <strong>CPU 核心</strong>：單一或多個算力處理單元
                </li>
                <li className="flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-academic-500" />
                  <strong>行程 (Process)</strong>：等待被執行的程式
                </li>
                <li className="flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-academic-500" />
                  <strong>Context Switch</strong>：暫存器切換開銷 (Overhead)
                </li>
              </ul>
            </div>
            <div className="space-y-1.5">
              <span className="font-bold text-slate-900 block">晶圓製造 (Fab MES) 世界</span>
              <ul className="space-y-1 text-slate-600">
                <li className="flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-600" />
                  <strong>曝光機 / 蝕刻機</strong>：昂貴瓶頸機台 (Bottleneck Tool)
                </li>
                <li className="flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-600" />
                  <strong>晶圓批次 (Wafer Lot)</strong>：在 FOUP 暫存等待加工的批次
                </li>
                <li className="flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-600" />
                  <strong>Recipe / 光罩更換</strong>：機台換線前置時間 (Setup Time)
                </li>
              </ul>
            </div>
          </div>
          <p className="text-slate-600 text-xs">
            若晶圓廠採用類似 FCFS 的派工法則，大批量非緊急批次卡住機台，將直接導致客戶急單（Hot Lot）延遲；因此現代晶圓廠融合了 SPT（類似 SJF）與 CR（臨界比率），兼顧機台稼動率與準時達交率。
          </p>
        </CardContent>
      </Card>
    </section>
  );
};
