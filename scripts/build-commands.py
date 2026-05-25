#!/usr/bin/env python3
"""
Build commands/ folder from commands_collection.json
and generate commands-catalog.json.
"""

import json
import os
import re
import shutil

ROOT = os.path.dirname(os.path.dirname(__file__))
COLLECTION = os.path.join(ROOT, "data", "commands_collection.json")
COMMANDS_DIR = os.path.join(ROOT, "commands")
OUT_FILE = os.path.join(ROOT, "data", "commands-catalog.json")

# Category inference
CATEGORY_RULES = [
    (["git", "commit", "pr", "pull-request", "branch", "merge", "diff", "stash"], "git"),
    (["test", "tdd", "spec", "coverage", "jest", "vitest", "playwright", "e2e"], "testing"),
    (["security", "audit", "pentest", "vulnerability", "xss", "injection", "owasp"], "security"),
    (["refactor", "clean", "lint", "format", "style", "quality", "review"], "quality"),
    (["debug", "fix", "error", "bug", "diagnose", "trace", "log"], "debugging"),
    (["doc", "readme", "comment", "explain", "wiki", "changelog"], "docs"),
    (["deploy", "docker", "k8s", "kubernetes", "ci", "cd", "pipeline", "infra", "terraform", "devops"], "devops"),
    (["api", "rest", "graphql", "endpoint", "swagger", "openapi", "mock", "scaffold"], "api"),
    (["database", "sql", "postgres", "mongo", "redis", "migration", "schema", "query"], "database"),
    (["frontend", "react", "vue", "svelte", "ui", "css", "tailwind", "component", "html"], "frontend"),
    (["backend", "server", "node", "python", "django", "fastapi", "express", "rails"], "backend"),
    (["ai", "llm", "ml", "rag", "claude", "openai", "prompt", "agent", "embedding"], "ai"),
    (["performance", "optimize", "speed", "profil", "benchmark", "cache"], "performance"),
    (["workflow", "automation", "task", "process", "routine", "session", "checkpoint"], "workflow"),
    (["accessibility", "a11y", "aria", "wcag"], "accessibility"),
]


def infer_category(name: str, desc: str) -> str:
    combined = (name + " " + desc).lower()
    for keywords, cat in CATEGORY_RULES:
        if any(kw in combined for kw in keywords):
            return cat
    return "other"


def derive_name(cmd: dict) -> str:
    name = cmd.get("name", "")
    path = cmd.get("path", "")
    if name.upper() in ("SKILL", "README", "INDEX", ""):
        parts = path.replace("\\", "/").split("/")
        fname = os.path.splitext(parts[-1])[0]
        if fname.upper() in ("SKILL", "README", "INDEX") and len(parts) > 1:
            return parts[-2]
        return fname
    return name


def extract_desc(content: str) -> str:
    """Extract first meaningful line from markdown as description."""
    lines = content.splitlines()
    # Skip frontmatter
    in_fm = False
    if lines and lines[0].strip() == "---":
        in_fm = True
    fm_done = False
    for i, line in enumerate(lines):
        if i == 0 and line.strip() == "---":
            continue
        if in_fm and not fm_done:
            if line.strip() == "---":
                fm_done = True
            # Check for description field in frontmatter
            m = re.match(r"description\s*:\s*(.+)", line, re.IGNORECASE)
            if m:
                return m.group(1).strip().strip('"').strip("'")[:200]
            continue
        # Skip empty lines and headings (take text after heading)
        line = line.strip()
        if not line:
            continue
        if line.startswith("#"):
            text = line.lstrip("#").strip()
            if text:
                return text[:200]
            continue
        # First real paragraph line
        if not line.startswith(("```", "---", "===", ">>>")):
            return line[:200]
    return ""


def build_commands():
    with open(COLLECTION, encoding="utf-8") as f:
        data = json.load(f)

    # Rebuild commands/ folder
    shutil.rmtree(COMMANDS_DIR, ignore_errors=True)
    os.makedirs(COMMANDS_DIR, exist_ok=True)

    catalog = []
    written_paths = set()

    for cmd in data:
        source = cmd.get("source", "unknown")
        repo = cmd.get("repo", "")
        path = cmd.get("path", "")
        content = cmd.get("content", "")

        name = derive_name(cmd)
        safe_name = re.sub(r"[^\w\-]", "-", name).lower().strip("-")
        desc = extract_desc(content)
        cat = infer_category(safe_name, desc)

        folder = os.path.join(COMMANDS_DIR, source)
        os.makedirs(folder, exist_ok=True)

        filepath = os.path.join(folder, safe_name + ".md")
        # Deduplicate
        if filepath in written_paths:
            i = 2
            while True:
                alt = os.path.join(folder, f"{safe_name}-{i}.md")
                if alt not in written_paths:
                    filepath = alt
                    break
                i += 1

        written_paths.add(filepath)
        rel = os.path.relpath(filepath, os.path.dirname(__file__)).replace("\\", "/")

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)

        uid = f"{source}/{safe_name}"
        catalog.append({
            "id": uid,
            "name": name,
            "desc": desc,
            "category": cat,
            "source": source,
            "repo": repo,
            "path": path,
            "file": rel,
        })

    catalog.sort(key=lambda c: (c["category"], c["name"]))
    out = {"commands": catalog}
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))

    print(f"OK {len(catalog)} commands -> commands-catalog.json")
    from collections import Counter
    by_cat = Counter(c["category"] for c in catalog)
    for cat, n in sorted(by_cat.items()):
        print(f"  {cat}: {n}")


if __name__ == "__main__":
    build_commands()
