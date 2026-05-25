#!/usr/bin/env python3
"""Generate skills-catalog.json from SKILL.md files in the skills/ directory."""

import json
import os
import re

ROOT       = os.path.dirname(os.path.dirname(__file__))
SKILLS_DIR = os.path.join(ROOT, "skills")
OUT_FILE   = os.path.join(ROOT, "data", "skills-catalog.json")

# Category inference rules: keyword in name/desc → category slug
CATEGORY_RULES = [
    (["python"],                          "python"),
    (["golang","go-"],                    "golang"),
    (["rust"],                            "rust"),
    (["java","spring","kotlin"],          "java"),
    (["typescript","javascript","js-","ts-"], "javascript"),
    (["react","nextjs","svelte","vue","angular","frontend","ui-","ux-","css","tailwind","shadcn"], "frontend"),
    (["backend","fastapi","django","laravel","rails","nestjs","express"], "backend"),
    (["database","postgres","sql","mongo","redis","prisma","drizzle"], "database"),
    (["security","pentest","audit","vulnerability","xss","injection","csrf","oauth"], "security"),
    (["test","tdd","e2e","playwright","jest","vitest"],    "testing"),
    (["devops","docker","kubernetes","k8s","terraform","cicd","github-action","gitlab-ci"], "devops"),
    (["aws","azure","gcp","cloud"],        "cloud"),
    (["ai","llm","ml","rag","langchain","agent","openai","anthropic","claude"], "ai"),
    (["seo","content","marketing","copywriting","blog"], "marketing"),
    (["mobile","ios","android","swift","flutter","expo","react-native"], "mobile"),
    (["git","github","gitlab","bitbucket","pr-","commit"], "git"),
    (["api","graphql","rest","grpc","openapi","webhook"],  "api"),
    (["slack","notion","linear","jira","trello","asana","clickup","monday","zapier","make","n8n","automation"], "automation"),
    (["docs","documentation","readme","wiki"],             "docs"),
    (["design","figma","canva","sketch","miro","ux"],      "design"),
    (["data","analytics","etl","pipeline","spark","dbt","kafka","airflow"], "data"),
]

def infer_category(name: str, desc: str) -> str:
    combined = (name + " " + desc).lower()
    for keywords, cat in CATEGORY_RULES:
        if any(kw in combined for kw in keywords):
            return cat
    return "other"

def parse_frontmatter(text: str) -> dict:
    """Extract YAML frontmatter fields from a SKILL.md string."""
    m = re.match(r"^---\s*\n(.*?)\n---", text, re.DOTALL)
    if not m:
        return {}
    fm = {}
    for line in m.group(1).splitlines():
        kv = re.match(r'^(\w+)\s*:\s*"?(.*?)"?\s*$', line)
        if kv:
            fm[kv.group(1)] = kv.group(2).strip().strip('"')
    return fm

def collect_skills():
    skills = []
    for root, dirs, files in os.walk(SKILLS_DIR):
        dirs.sort()
        if "SKILL.md" not in files:
            continue
        skill_path = os.path.join(root, "SKILL.md")
        rel        = os.path.relpath(root, os.path.dirname(__file__)).replace("\\", "/")
        parts      = rel.split("/")   # e.g. ["skills","anthropics","frontend-design"]

        # source = second segment (anthropics / alirezarezvani / antigravity / composio)
        source = parts[1] if len(parts) > 1 else "unknown"
        if len(parts) > 2 and parts[1] == "community":
            source = parts[2]
            # subpath = everything after the source dir, e.g. "business-growth/contract-and-proposal-writer"
            subpath = "/".join(parts[3:]) if len(parts) > 3 else parts[-1]
        else:
            # non-community: parts = ["skills", source, ...leaf...]
            subpath = "/".join(parts[2:]) if len(parts) > 2 else parts[-1]

        folder_name = parts[-1]  # leaf directory name (for display)

        try:
            with open(skill_path, encoding="utf-8") as f:
                text = f.read()
        except Exception:
            continue

        fm   = parse_frontmatter(text)
        name = fm.get("name", folder_name)
        desc = fm.get("description", "")[:200]
        cat  = infer_category(name, desc)
        # uid uses source/subpath — guaranteed unique per physical path
        uid  = f"{source}/{subpath}"

        skills.append({
            "id":       uid,
            "name":     name,
            "desc":     desc,
            "category": cat,
            "source":   source,
            "subpath":  subpath,
            "folder":   rel,
            "file":     "SKILL.md",
        })

    return skills

if __name__ == "__main__":
    skills = collect_skills()
    skills.sort(key=lambda s: (s["category"], s["name"]))
    out = {"skills": skills}
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
    print(f"OK {len(skills)} skills -> skills-catalog.json")
