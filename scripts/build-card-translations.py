#!/usr/bin/env python3
"""
Generate i18n/cards-{lang}.json for all supported languages.

Usage:
    pip install anthropic
    export ANTHROPIC_API_KEY=sk-ant-...
    python build-card-translations.py

Output:
    i18n/cards-fr.json
    i18n/cards-de.json
    i18n/cards-es.json
    i18n/cards-pt.json
    i18n/cards-ja.json
    i18n/cards-zh.json
    i18n/cards-ko.json

Format of each output file:
    {
      "agents": { "<name>": { "name": "...", "desc": "..." }, ... },
      "skills":  { "<name>": { "name": "...", "desc": "..." }, ... }
    }

Card names are translated. Descriptions are adapted (not word-for-word) to be
natural in the target language while preserving technical terms.
"""

import json
import os
import time
import re
import sys
from pathlib import Path

try:
    import anthropic
except ImportError:
    print("ERROR: run `pip install anthropic` first")
    sys.exit(1)

# ── Config ────────────────────────────────────────────────────────────────────
ROOT       = Path(__file__).parent.parent
AGENTS_IN  = ROOT / "data" / "agents-catalog.json"
SKILLS_IN  = ROOT / "data" / "skills-catalog.json"
I18N_DIR   = ROOT / "i18n"
MODEL      = "claude-haiku-4-5-20251001"   # fast + cheap for translation
BATCH_SIZE = 30                             # items per API call
RPM_PAUSE  = 1.0                            # seconds between calls

LANGUAGES = {
    "fr": "French",
    "de": "German",
    "es": "Spanish",
    "pt": "Portuguese",
    "ja": "Japanese",
    "zh": "Simplified Chinese",
    "ko": "Korean",
}

SYSTEM_PROMPT = """You are a professional technical translator specialising in software development tools and AI assistant terminology.

Rules:
- Translate the "name" field: keep it concise, natural in the target language.
  Preserve technical terms (e.g. GraphQL, API, TDD, RAG, CI/CD) as-is.
  Hyphenated slug-style names should become a readable noun phrase.
- Translate the "desc" field: adapt for fluency in the target language.
  Keep the same meaning and technical accuracy. Do NOT transliterate technical
  acronyms — leave them in English (e.g. REST, LLM, ORM, JWT, SQL).
- Return ONLY valid JSON — no markdown fences, no commentary.
- Use the exact structure shown in the example."""

# ── Helpers ───────────────────────────────────────────────────────────────────

def load_catalog(path: Path, key: str) -> dict:
    """Return {name: desc} keeping the first desc seen for each unique name."""
    data = json.loads(path.read_text(encoding="utf-8"))
    out: dict[str, str] = {}
    for item in data.get(key, []):
        name = item.get("name", "").strip()
        desc = item.get("desc", "").strip()
        if name and name not in out:
            out[name] = desc
    return out


def chunk(items: list, size: int):
    for i in range(0, len(items), size):
        yield items[i:i + size]


def build_user_prompt(lang: str, lang_name: str, batch: list[tuple[str, str]]) -> str:
    items_json = json.dumps(
        [{"name": n, "desc": d} for n, d in batch],
        ensure_ascii=False, indent=2
    )
    example = json.dumps(
        {"code-reviewer": {"name": "<translated name>", "desc": "<translated desc>"}},
        ensure_ascii=False
    )
    return f"""Translate each item into {lang_name} ({lang}).

Input (list of items with English name + desc):
{items_json}

Return a single JSON object keyed by the original English name, where each value
has "name" (translated) and "desc" (translated). Example structure:
{example}

Return ONLY the JSON object, nothing else."""


def translate_batch(
    client: anthropic.Anthropic,
    lang: str,
    lang_name: str,
    batch: list[tuple[str, str]],
    retries: int = 3,
) -> dict:
    prompt = build_user_prompt(lang, lang_name, batch)
    for attempt in range(retries):
        try:
            msg = client.messages.create(
                model=MODEL,
                max_tokens=4096,
                system=SYSTEM_PROMPT,
                messages=[{"role": "user", "content": prompt}],
            )
            raw = msg.content[0].text.strip()
            # Strip accidental markdown fences
            raw = re.sub(r"^```[a-z]*\n?", "", raw)
            raw = re.sub(r"\n?```$", "", raw)
            return json.loads(raw)
        except (json.JSONDecodeError, Exception) as e:
            if attempt < retries - 1:
                print(f"    Retry {attempt+1}/{retries} for {lang} batch ({e})")
                time.sleep(2 ** attempt)
            else:
                print(f"    FAILED batch for {lang}: {e}")
                # Return empty entries so we don't block the whole run
                return {name: {"name": name, "desc": desc} for name, desc in batch}
    return {}


def translate_catalog(
    client: anthropic.Anthropic,
    catalog: dict[str, str],
    lang: str,
    lang_name: str,
    label: str,
) -> dict:
    items = list(catalog.items())
    result: dict = {}
    batches = list(chunk(items, BATCH_SIZE))
    for i, batch in enumerate(batches):
        print(f"  [{label}] {lang} — batch {i+1}/{len(batches)} ({len(batch)} items)…")
        result.update(translate_batch(client, lang, lang_name, batch))
        if i < len(batches) - 1:
            time.sleep(RPM_PAUSE)
    return result


def load_existing(path: Path) -> dict:
    if path.exists():
        try:
            return json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {"agents": {}, "skills": {}}


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("ERROR: set ANTHROPIC_API_KEY environment variable")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    print("Loading catalogs…")
    agents_catalog = load_catalog(AGENTS_IN, "agents")
    skills_catalog = load_catalog(SKILLS_IN, "skills")
    print(f"  {len(agents_catalog)} unique agent names")
    print(f"  {len(skills_catalog)} unique skill names")

    I18N_DIR.mkdir(exist_ok=True)

    for lang, lang_name in LANGUAGES.items():
        out_path = I18N_DIR / f"cards-{lang}.json"
        existing = load_existing(out_path)

        # Skip names already translated (allows resuming interrupted runs)
        agents_todo = {n: d for n, d in agents_catalog.items() if n not in existing["agents"]}
        skills_todo = {n: d for n, d in skills_catalog.items() if n not in existing["skills"]}

        if not agents_todo and not skills_todo:
            print(f"[{lang}] already complete — skipping")
            continue

        print(f"\n[{lang}] {lang_name}: {len(agents_todo)} agents, {len(skills_todo)} skills to translate")

        if agents_todo:
            new_agents = translate_catalog(client, agents_todo, lang, lang_name, "agents")
            existing["agents"].update(new_agents)

        if skills_todo:
            new_skills = translate_catalog(client, skills_todo, lang, lang_name, "skills")
            existing["skills"].update(new_skills)

        out_path.write_text(
            json.dumps(existing, ensure_ascii=False, indent=2),
            encoding="utf-8"
        )
        print(f"  → wrote {out_path.name}")

    print("\nDone.")


if __name__ == "__main__":
    main()
