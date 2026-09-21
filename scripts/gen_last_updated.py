#!/usr/bin/env python3
"""Writes docs/assets/last-updated.json: URL of each page -> date of its last git commit."""
import json
import subprocess
from pathlib import Path

DOCS = Path("docs")
OUT = DOCS / "assets" / "last-updated.json"


def last_commit_date(path: Path) -> str | None:
    out = subprocess.run(
        ["git", "log", "-1", "--format=%cI", "--", str(path)],
        capture_output=True, text=True, check=True,
    ).stdout.strip()
    return out or None


def page_url(md: Path) -> str:
    parts = list(md.relative_to(DOCS).with_suffix("").parts)
    if parts[-1] == "index":
        parts.pop()
    return "/".join(parts) + "/" if parts else ""


dates = {}
for md in sorted(DOCS.rglob("*.md")):
    date = last_commit_date(md)
    if date:
        dates[page_url(md)] = date

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(dates, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"{len(dates)} pages -> {OUT}")
