# 資管核心知識與互動沙盒學習平台 (mis-learning-sandbox)

> 專為資管系學生、跨領域轉職者與求職者打造的系統化核心知識庫與視覺化沙盒平台。  
> 深入作業系統、網路、資料庫、資安、企業系統到智慧製造與生成式 AI，**對標台積電 MFG SME / 科技大廠後端與系統職缺**。

---

## 專案亮點

1. **拒絕死記硬背，動手驗證底層原理**：
   - 每個單元均配備可自訂參數、步驟逐步控制的動態視覺化沙盒（Gantt Chart、State Machine、Vector Projection 等）。
2. **清爽學術風 (Academic Clean)**：
   - Notion / 現代技術期刊排版風格，充足留白、極簡 Slate / 學術藍配色、高可讀性。
3. **四大學習階段完整藍圖 (One-Year Blueprint)**：
   - **Phase 1**：程式基礎、核心技術與作業系統打底 (OS, DS, OOP)
   - **Phase 2**：網路、資料庫與後端系統架構 (Networks, DBMS, DevOps)
   - **Phase 3**：企業級應用、資安與系統管理 (Security, ERP/MRP, IT Mgmt)
   - **Phase 4**：智慧製造、數據分析與 AI 應用 (Smart MFG, MES, RAG/GenAI)
4. **標準三段式單元架構**：
   - **理論與觀念解析區**：名詞定義、技術運作剖析、**業界實務情境對照（如台積電晶圓代工派工）**。
   - **互動沙盒操作區**：即時參數調校 + 步驟分步控制（上一步/下一步/播放/重置）+ 即時操作日誌 (Operation Log)。
   - **隨堂小考與觀念驗證區**：精選大廠面試題，即時作答與詳解。

---

## 技術棧 (Tech Stack)

- **核心框架**：React 18 + TypeScript + Vite
- **樣式與設計系統**：Tailwind CSS（Academic Clean Palette）
- **圖示庫**：Lucide React
- **沙盒組件庫 (`sandbox-kit`)**：
  - `StepController`：上一步、下一步、自動播放、重置、播放速度調節
  - `ParamSlider`：即時數值調校滑桿
  - `LogViewer`：終端風格時間戳操作日誌
  - `Card` / `Button` / `Badge`：清爽學術風 UI 基礎元件

---

## 本地開發與構建

```bash
# 1. 安裝相依套件
npm install

# 2. 啟動開發伺服器
npm run dev

# 3. 專案構建與型別檢查
npm run build
```

---

## 規範手冊

本專案遵循 [`AGENTS.md`](./AGENTS.md) 的最高協作規範與架構原則。
