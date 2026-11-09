# 知識庫操作日誌 (Wiki Activity Log)

本檔案為 append-only（僅追加）紀錄，追蹤此 LLM Wiki 的演進歷史。
標題遵循統一格式，方便使用終端工具解析（例如：`grep "^## \[" wiki/log.md`）：
`## [YYYY-MM-DD] <action> | <title>`

---

## [2026-11-09] init | 初始化 LLM Wiki 架構
- 建立三層架構目錄：`raw/`（唯讀來源）、`wiki/`（LLM維護知識庫）、`scripts/`（輔助維護工具）
- 建立核心規範檔案：`AGENTS.md`
- 建立全域索引目錄：`wiki/index.md`
- 建立操作日誌：`wiki/log.md`
- 建立專案導覽說明：`README.md`
- 建立知識庫健康檢查工具：`scripts/lint_wiki.py`
