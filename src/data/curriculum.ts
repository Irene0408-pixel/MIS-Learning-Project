export interface ModuleMeta {
  id: string;
  title: string;
  subtitle: string;
  phase: 1 | 2 | 3 | 4;
  category: string;
  durationWeek: string;
  status: 'active' | 'upcoming' | 'planned';
  interviewFocus?: string;
  description: string;
  tags: string[];
}

export interface PhaseMeta {
  phase: 1 | 2 | 3 | 4;
  name: string;
  enName: string;
  timeframe: string;
  description: string;
  targetRole: string;
}

export const PHASES: PhaseMeta[] = [
  {
    phase: 1,
    name: '程式基礎、核心技術與作業系統打底',
    enName: 'Core Foundations & Operating Systems',
    timeframe: '第 1 - 3 個月',
    description: '深入資料結構底層、物件導向原則與作業系統四大支柱（行程、排班、虛擬記憶體、死結）。',
    targetRole: '系統工程師 / 後端基礎扎根',
  },
  {
    phase: 2,
    name: '網路、資料庫與後端系統架構',
    enName: 'Networks, Databases & Modern DevOps',
    timeframe: '第 4 - 6 個月',
    description: '精通 TCP/IP 與 HTTP/3 通訊、關聯式資料庫 ACID/索引機制、NoSQL 緩存與 Docker 容器編排。',
    targetRole: '後端開發 / 高併發系統架構',
  },
  {
    phase: 3,
    name: '企業級應用、資安與系統管理',
    enName: 'Enterprise Systems, InfoSec & IT Management',
    timeframe: '第 7 - 9 個月',
    description: '從 OWASP Top 10 與 OAuth/JWT 資安防禦，到 ERP 生產銷售核心模組與 IT 成本效益評估。',
    targetRole: '企業系統整合 / 資訊安全維運',
  },
  {
    phase: 4,
    name: '智慧製造、數據分析與 AI 應用',
    enName: 'Smart Manufacturing, Analytics & GenAI',
    timeframe: '第 10 - 12 個月',
    description: '對標台積電與晶圓代工 MES/CIM 產線派工、OEE 運算、資料倉儲與現代 RAG / Agent 決策鏈。',
    targetRole: '台積電 MFG SME / 智慧製造工程師 / AI 應用工程師',
  },
];

export const MODULES: ModuleMeta[] = [
  // Phase 1
  {
    id: 'cpu-scheduling',
    title: 'CPU 排班演算法 (CPU Scheduling)',
    subtitle: 'FCFS vs. SJF vs. Round Robin 搶占與非搶占模擬',
    phase: 1,
    category: '作業系統 (Operating Systems)',
    durationWeek: 'Week 3',
    status: 'active',
    interviewFocus: '台積電 / 科技大廠 OS 經典考題：Context Switch 成本、Convoy Effect 與時間配額最佳化',
    description: '透過互動甘特圖與 Ready Queue 佇列可視化，理解作業系統如何公平、高效分配 CPU 資源。',
    tags: ['OS', 'CPU Scheduling', 'Round Robin', 'Context Switch'],
  },
  {
    id: 'memory-paging',
    title: '虛擬記憶體與分頁置換 (Paging & Page Replacement)',
    subtitle: 'FIFO vs. LRU vs. Optimal 分頁錯誤率實驗',
    phase: 1,
    category: '作業系統 (Operating Systems)',
    durationWeek: 'Week 5',
    status: 'upcoming',
    interviewFocus: 'Belady 異常、TLB 快取命中與 Page Fault 處理成本',
    description: '模擬虛擬位址轉換為實體位址的過程，並動態調校記憶體 Frame 大小，觀察不同演算法的命中率。',
    tags: ['OS', 'Virtual Memory', 'LRU', 'Page Fault'],
  },
  {
    id: 'deadlock-banker',
    title: '死結防範與銀行家演算法 (Deadlock & Banker)',
    subtitle: '資源配置圖 (RAG) 與安全狀態 (Safe State) 演算法',
    phase: 1,
    category: '作業系統 (Operating Systems)',
    durationWeek: 'Week 7',
    status: 'planned',
    interviewFocus: '死結四大必要條件、死結避免 (Avoidance) vs. 死結偵測 (Detection)',
    description: '動態分配系統資源，預測系統是否會進入 Unsafe State，深入併發系統資源競爭機制。',
    tags: ['OS', 'Concurrency', 'Deadlock', 'Banker Algorithm'],
  },

  // Phase 2
  {
    id: 'tcp-handshake',
    title: 'TCP 三向交握與滑動窗口 (TCP Handshake & Flow Control)',
    subtitle: 'SYN/ACK 封包傳輸與滑動窗口塞車控制視覺化',
    phase: 2,
    category: '電腦網路 (Computer Networks)',
    durationWeek: 'Week 14',
    status: 'upcoming',
    interviewFocus: '為什麼是三次不是兩次？TIME_WAIT 狀態由誰觸發與意義？滑動窗口流量控制',
    description: '互動式發送 SYN/ACK 封包，觀察連線建立與四向揮手斷線的狀態轉移（State Machine）。',
    tags: ['Networking', 'TCP/IP', 'Handshake', 'Flow Control'],
  },
  {
    id: 'database-indexing',
    title: '資料庫 B+ Tree 索引與查詢最佳化 (B+ Tree Indexing)',
    subtitle: '索引遍歷、節點分裂與 EXPLAIN 執行計畫視覺化',
    phase: 2,
    category: '資料庫系統 (DBMS)',
    durationWeek: 'Week 18',
    status: 'planned',
    interviewFocus: '為何不用 Hash/B Tree 而是 B+ Tree？最左前綴原則與覆蓋索引',
    description: '動態插入數據鍵值，觀察 B+ Tree 葉子節點雙向鏈結與分裂過程，親手體驗全表掃描 vs 索引查找差異。',
    tags: ['DBMS', 'B+ Tree', 'SQL Index', 'Query Optimization'],
  },

  // Phase 3
  {
    id: 'web-security-owasp',
    title: 'OWASP Top 10 資安攻防沙盒 (Web Security)',
    subtitle: 'SQL Injection 與 XSS 即時防禦機制驗證',
    phase: 3,
    category: '資訊安全 (Information Security)',
    durationWeek: 'Week 26',
    status: 'planned',
    interviewFocus: 'Parameterized Query 參數化查詢原理、CSP 策略與 JWT 簽名防偽',
    description: '在安全隔離沙盒中發動 SQL Injection 攻擊，觀察資料庫後端如何透過預編譯語句安全阻擋惡意注入。',
    tags: ['Security', 'SQL Injection', 'XSS', 'OWASP'],
  },
  {
    id: 'erp-mrp-engine',
    title: 'ERP 生產與物料需求規劃 (MRP Calculation)',
    subtitle: 'BOM 表展開、庫存扣抵與工單排程引擎',
    phase: 3,
    category: '企業系統 (Enterprise Systems)',
    durationWeek: 'Week 30',
    status: 'planned',
    interviewFocus: '主生產排程 (MPS)、物料需求規劃 (MRP I/II) 與製造供應鏈工單流轉',
    description: '輸入終端產品訂單，動態展開多階層物料清單 (BOM)，計算淨需求與採購前置期。',
    tags: ['ERP', 'MRP', 'BOM', 'Manufacturing'],
  },

  // Phase 4
  {
    id: 'wafer-fab-dispatching',
    title: '半導體晶圓廠動態派工法則 (Wafer Fab Dispatching)',
    subtitle: 'FIFO vs. SPT vs. EDD vs. CR 晶圓批次 (Lot) 派工模擬',
    phase: 4,
    category: '智慧製造 (Smart Manufacturing)',
    durationWeek: 'Week 40',
    status: 'upcoming',
    interviewFocus: '【台積電 MFG SME 必考】機台稼動率 (Utilization)、WIP 控制與瓶頸機台 (Bottleneck) 派工',
    description: '模擬 300mm 晶圓廠光刻/蝕刻機台作業，即時評估不同派工法則對達交率與總等待時間的影響。',
    tags: ['Smart MFG', 'TSMC MFG SME', 'Dispatching Rules', 'MES'],
  },
  {
    id: 'rag-vector-retrieval',
    title: 'RAG 檢索增強生成架構與向量空間 (RAG & Vector Search)',
    subtitle: '語意嵌入 (Embeddings)、餘弦相似度與 Top-K 檢索沙盒',
    phase: 4,
    category: '生成式 AI (GenAI & LLM)',
    durationWeek: 'Week 46',
    status: 'planned',
    interviewFocus: 'Chunking 策略、Vector Indexing (HNSW/IVF) 與 RAG 幻覺抑制',
    description: '輸入查詢語句，即時投影到 2D/3D 語意空間，視覺化觀察高維向量相似度匹配過程。',
    tags: ['GenAI', 'RAG', 'Vector DB', 'LLM'],
  },
];
