# AGENTS.md - 專案導引與 AI 協作規範

本文件為「**資管核心知識與互動沙盒學習平台 (mis-learning-sandbox)**」的最高指導原則與協作規範。所有在此專案進行開發與內容維護的 AI 助理均須嚴格遵循本文件的架構、設計風格與擴充規則，確保所有課程模組與互動沙盒維持高度的一致性、學術質感與高品質。

---

## 1. 專案願景與核心目的
打造一個系統化的**「資訊管理（MIS）核心知識與互動沙盒學習平台」**。
- **目標客群**：資管系學生、跨領域轉職者、準備申請頂尖實習與正職的求職者（特別對標智慧製造、後端開發、系統維運職缺，如**台積電 MFG SME / IT Engineer**）。
- **教育核心價值**：
  - 拒絕單向枯燥背誦，結合**「清爽學術風的深度理論解析」**與**「高互動性可視化沙盒」**。
  - 透過**步驟分步控制（Step-by-step Control）**與**即時參數調校（Live Parameter Tuning）**，讓學習者親自動手驗證從底層系統（OS、網路、資安）到上層企業應用（ERP、MES、智慧製造、GenAI）的運作機制。
  - 作為學習者求職與面試時極具說服力的實作作品與複習利器。

---

## 2. 一年期資管核心專業知識學習藍圖（四大階段）

所有擴充單元與內容生成必須嚴格對齊以下藍圖：

### Phase 1：程式基礎、核心技術與作業系統打底（第 1 - 3 個月）
- **資料結構與演算法（DS & Algorithms）**：時間/空間複雜度、陣列/鏈結串列、樹狀結構（Binary Tree, BST, AVL）、圖形遍歷（BFS/DFS）、排序與搜尋。
- **物件導向程式設計（OOP）與設計模式**：封裝/繼承/多型、SOLID 原則、常見設計模式（Factory, Singleton, Observer, Strategy）。
- **作業系統核心概念（Operating Systems）**：
  - 行程與執行緒（Process vs. Thread、Context Switch、IPC）
  - CPU 排班演算法（FCFS, SJF, Round Robin, Multi-level Queue）
  - 記憶體管理與虛擬記憶體（Paging, Segmentation, LRU/FIFO Page Replacement）
  - 併發控制與死結（Race Condition, Mutex/Semaphore, Deadlock 4 條件與 Banker's Algorithm）

### Phase 2：網路、資料庫與後端系統架構（第 4 - 6 個月）
- **電腦網路技術與通訊協定（Computer Networks）**：
  - OSI 七層與 TCP/IP 四層模型對比
  - TCP 三向交握、四向揮手與滑動窗口流量控制
  - 應用層通訊協定（HTTP/1.1 vs. HTTP/2 vs. HTTP/3、HTTPS TLS 握手、DNS 遞迴解析）
  - RESTful API 設計原則、GraphQL 與 WebSocket 即時通訊
- **資料庫管理系統（DBMS & SQL / NoSQL）**：
  - 關聯式資料庫設計（正規化 1NF 到 BCNF、ER Model、SQL DDL/DML/DQL）
  - 資料庫底層索引機制（B+ Tree 原理、覆蓋索引、執行計畫 EXPLAIN）
  - 事務處理與 ACID（交易隔離等級、MVCC、分散式交易 2PC）
  - NoSQL 數據模型（Redis 鍵值緩存與快照、MongoDB 文件儲存）
- **版本控制與現代 DevOps 基礎**：
  - Git 分支策略（Git Flow, Trunk-based）、衝突解決
  - Docker 容器化原理、映像檔構建、Docker Compose 本地編排

### Phase 3：企業級應用、資安與系統管理（第 7 - 9 個月）
- **資訊安全與防禦實務（Information Security）**：
  - 現代 Web 安全威脅與防禦（OWASP Top 10：SQL Injection, XSS, CSRF, SSRF）
  - 身分驗證與授權機制（Session-Cookie、OAuth 2.0、OIDC、JWT 結構與防偽）
  - 現代密碼學基礎（對稱/非對稱加密 RSA/AES、雜湊函數 SHA-256、數位簽章）
- **企業系統架構與業務流程（Enterprise Systems）**：
  - 企業資源規劃（ERP）核心模組架構（財務、生管、銷貨、採購之整合機制）
  - 客戶關係管理（CRM）與供應鏈整合
  - 系統整合技術（EDI、Webhook、微服務架構）
- **IT 專案管理與系統效益分析**：
  - 專案生命週期（Agile/Scrum 框架、Waterfall 瀑布式開發）
  - 資訊專案成本效益分析（TCO, ROI, Payback Period, NPV）

### Phase 4：智慧製造、數據分析與 AI 應用（第 10 - 12 個月）
- **商業智慧與數據分析（BI & Analytics）**：
  - 資料倉儲與 ETL/ELT 流程架構（Star Schema, Snowflake Schema）
  - 數據視覺化原則與指標體系設計（KPI Dashboard, Cohort Analysis）
- **生成式 AI 與現代大語言模型應用（GenAI & LLM）**：
  - 檢索增強生成（RAG）架構、向量嵌入（Vector Embeddings）與向量資料庫檢索原理
  - Agent 架構（Function Calling、Tool Use、ReAct 思考決策鏈）
- **智慧製造與半導體供應鏈系統導論（Smart Manufacturing & SCM）**：
  - 半導體晶圓廠/製造業 IT 系統架構（MES 製造執行系統、CIM 電腦整合製造、EAP 設備自動化）
  - 生產排程與派工法則（Dispatching Rules：FIFO, EDD, SPT, CR 模擬驗證）
  - OEE（整體設備效率：可用率 × 表現率 × 良率）計算與 SPC 統計製程管制

---

## 3. 視覺設計語言：清爽學術風（Academic Clean）

- **設計基調**：如同現代頂級學術期刊、Notion 教材或高質感技術文件平台，保持理性、極簡、高可讀性。
- **色彩規劃**：
  - **背景**：純白 `#FFFFFF` 與淺冷灰 `#F8FAFC`（Slate-50）層次交疊。
  - **文字**：深墨灰 `#0F172A`（Slate-900）為主文本，次要說明為 `#475569`（Slate-600）。
  - **主題品牌色**：檔案藍/學術藍 `#2563EB`（Blue-600）或深海藍 `#1E40AF`（Blue-800），強調專業沉穩。
  - **功能性標色**：翠綠 `#10B981`（成功/執行中）、琥珀橙 `#F59E0B`（警告/緩衝區）、珊瑚紅 `#EF4444`（錯誤/衝突/死結）。
- **排版規範**：
  - 充足的邊距留白（Whitespace），段落行距 `line-height: 1.7`。
  - 精緻的卡片邊框（`border: 1px solid #E2E8F0`）與微柔和陰影（`shadow-sm` 至 `shadow-md`）。
  - 等寬字型（如 `JetBrains Mono` 或 `Fira Code`）用於程式碼、數值與即時紀錄輸出。

---

## 4. 單元標準頁面結構與沙盒規範

每個知識單元必須具備**三段式標準結構**：

```text
┌──────────────────────────────────────────────────────────┐
│ 1. 理論與觀念解析區 (Theory & Real-world Context)         │
│   - 核心名詞定義與直觀比喻                                │
│   - 技術運作原理剖析 (配備架構示意圖/流程圖)               │
│   - 業界實務情境 (如台積電晶圓廠派工、大型金融交易系統)    │
├──────────────────────────────────────────────────────────┤
│ 2. 互動沙盒操作區 (Interactive Visual Sandbox)           │
│   ┌────────────────────────┬─────────────────────────┐   │
│   │ 參數配置面板           │ 動態畫布 / 狀態渲染區    │   │
│   │ - 滑桿 / 輸入框 / 選擇器│ - SVG / HTML Canvas 繪製│   │
│   │ - 播放速度控制         │ - 高亮當前執行節點      │   │
│   ├────────────────────────┼─────────────────────────┤   │
│   │ 步驟分步控制           │ 即時操作日誌 (Log)       │   │
│   │ [上一步] [下一步]      │ [10:00:01] 釋放 Lock... │   │
│   │ [自動播放] [重置]      │ [10:00:02] CPU 移至 P2..│   │
│   └────────────────────────┴─────────────────────────┘   │
├──────────────────────────────────────────────────────────┤
│ 3. 隨堂小考與觀念驗證區 (Self-assessment Quiz)            │
│   - 2~3 題觀念確認選擇題/情境題，提供即時詳解與盲點提醒    │
└──────────────────────────────────────────────────────────┘
```

### 沙盒實作硬性規定
1. **即時參數調整**：允許使用者改變輸入數據（如行程長度、時間配額 Quantum、陣列長度、快取大小等）。
2. **步驟分步控制**：必須具備「上一步 (Step Back)」、「下一步 (Step Next)」、「自動播放 (Play/Pause)」、「重置 (Reset)」四合一控制器。
3. **動態日誌 (Operation Log)**：每一步狀態變更必須輸出白話且具備時間戳/步驟編號的文字說明，讓使用者精確掌握內部變化。

---

## 5. 目錄架構與模組劃分

```text
mis-learning-sandbox/
├── AGENTS.md                  # 專案規範（本文件）
├── README.md                  # 專案總覽
├── package.json
├── src/
│   ├── components/            # 全域共用 UI 元件
│   │   ├── layout/            # 導覽列 (Navbar)、側邊選單 (Sidebar)、頁尾
│   │   ├── sandbox-kit/       # 沙盒共用元件 (StepController, Slider, LogViewer)
│   │   └── ui/                # 基礎按鈕、卡片、標籤、彈窗等
│   ├── modules/               # 四大學習階段單元模組
│   │   ├── phase1-core/       # OS, DS/Algo, OOP
│   │   ├── phase2-systems/    # Networks, DBMS, Docker/Git
│   │   ├── phase3-enterprise/ # Security, ERP, Project Mgmt
│   │   └── phase4-ai/         # Smart MFG, BI, GenAI/RAG
│   ├── data/                  # 課程大綱目錄清單、題庫、文字定義 JSON
│   ├── utils/                 # 通用計算邏輯、演算法模擬引擎
│   └── styles/                # Tailwind / 全域 CSS 樣式
```

---

## 6. AI 協作執行法則
1. **嚴格守門**：所有程式碼與模組均嚴格對齊本藍圖四大階段，不產生脫離資管主軸的冗餘內容。
2. **風格堅守**：遵循「清爽學術風」，禁止花俏過度的霓虹漸層，注重專注與學習效率。
3. **沙盒完備性**：實作任何沙盒單元，**絕不可偷工減料省略「步驟分步控制」與「即時參數調整」**。
4. **程式碼健康度**：提供乾淨、模組化、帶有 TypeScript/JSDoc 型別註解的現代 React 程式碼，確保能直接構建運行。
