#!/usr/bin/env python3
"""
LLM Wiki Health Check (Lint) Script
檢查知識庫內的雙向鏈結有效性、孤島頁面、未登記於 index.md 的檔案等。
"""

import os
import re
import sys
from pathlib import Path
from collections import defaultdict

WIKI_DIR = Path(__file__).resolve().parent.parent / "wiki"
EXCLUDED_FROM_ORPHAN_CHECK = {"index.md", "log.md"}

# 匹配 [[target]] 或 [[target|display]]
WIKILINK_PATTERN = re.compile(r'\[\[([^\]\|#]+)(?:#[^\]\|]+)?(?:\|[^\]]+)?\]\]')

def get_wiki_files():
    files = {}
    for p in WIKI_DIR.rglob("*.md"):
        rel_path = p.relative_to(WIKI_DIR)
        # 標識符：例如 "concepts/attention" 或只用 stem "attention"
        stem = p.stem.lower()
        full_rel = str(rel_path.with_suffix("")).lower()
        files[stem] = p
        files[full_rel] = p
    return files

def lint():
    if not WIKI_DIR.exists():
        print(f"[ERROR] 找不到知識庫目錄: {WIKI_DIR}")
        sys.exit(1)

    all_md_files = list(WIKI_DIR.rglob("*.md"))
    if not all_md_files:
        print("[INFO] wiki/ 目錄中目前尚無 Markdown 檔案。")
        return

    known_targets = set()
    file_by_stem = {}
    for p in all_md_files:
        stem = p.stem.lower()
        rel = str(p.relative_to(WIKI_DIR).with_suffix("")).lower()
        known_targets.add(stem)
        known_targets.add(rel)
        file_by_stem[stem] = p

    # 追蹤入鏈
    inbound_links = defaultdict(set)
    broken_links = []
    
    # 檢查 index.md 中收錄的頁面
    index_file = WIKI_DIR / "index.md"
    indexed_stems = set()
    if index_file.exists():
        content = index_file.read_text(encoding="utf-8")
        for match in WIKILINK_PATTERN.findall(content):
            indexed_stems.add(match.strip().lower())

    for p in all_md_files:
        rel_path = p.relative_to(WIKI_DIR)
        content = p.read_text(encoding="utf-8")
        links = WIKILINK_PATTERN.findall(content)
        
        for link in links:
            cleaned = link.strip().lower()
            if not cleaned or cleaned.startswith("http"):
                continue
            
            # 判斷目標是否存在
            if cleaned in known_targets or cleaned in {"agents", "agents.md"}:
                inbound_links[cleaned].add(str(rel_path))
            else:
                broken_links.append((str(rel_path), link.strip()))

    # 檢查孤島頁面 (無任何入鏈)
    orphan_pages = []
    for p in all_md_files:
        rel_name = p.name
        if rel_name in EXCLUDED_FROM_ORPHAN_CHECK:
            continue
        stem = p.stem.lower()
        if len(inbound_links[stem]) == 0:
            orphan_pages.append(str(p.relative_to(WIKI_DIR)))

    # 檢查未登錄於 index.md 的頁面
    unindexed_pages = []
    for p in all_md_files:
        if p.name in EXCLUDED_FROM_ORPHAN_CHECK:
            continue
        stem = p.stem.lower()
        if stem not in indexed_stems:
            unindexed_pages.append(str(p.relative_to(WIKI_DIR)))

    # 輸出報告
    print("=" * 60)
    print("  LLM Wiki 健康檢查報告 (Lint Report)")
    print("=" * 60)
    print(f"總檢視檔案數: {len(all_md_files)}")
    print(f"斷鏈 (Broken Links): {len(broken_links)}")
    print(f"孤島頁面 (Orphan Pages): {len(orphan_pages)}")
    print(f"未收錄於 index.md 的頁面: {len(unindexed_pages)}")
    print("-" * 60)

    if broken_links:
        print("\n[!] 發現斷鏈：")
        for src, target in broken_links:
            print(f"  - 檔案 '{src}' 鏈向不存在的目標: [[{target}]]")

    if orphan_pages:
        print("\n[!] 發現孤島頁面（無任何外部入鏈）：")
        for page in orphan_pages:
            print(f"  - {page}")

    if unindexed_pages:
        print("\n[!] 發現未登入 index.md 的頁面：")
        for page in unindexed_pages:
            print(f"  - {page}")

    if not broken_links and not orphan_pages and not unindexed_pages:
        print("\n 知識庫狀態極佳！沒有斷鏈、孤島或未索引頁面。")
    print("=" * 60)

if __name__ == "__main__":
    lint()
