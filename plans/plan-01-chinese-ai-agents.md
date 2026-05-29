# Plan 01 — Chinese AI Coding Agents

**Scope:** Q1 "Which AI assistant do you use for coding?" — add Chinese coding assistants for more diversity.

---

## Agents to add

| Key | Label | Icon | Maker |
|-----|-------|------|-------|
| `deepseek` | DeepSeek | 🔍 | DeepSeek AI |
| `tongyi_lingma` | Tongyi Lingma | ☁️ | Alibaba Cloud |
| `baidu_comate` | Baidu Comate | 🔵 | Baidu |
| `codegeex` | CodeGeeX | 🤖 | Zhipu AI · VSCode/JetBrains |
| `kimi` | Kimi | 🌙 | Moonshot AI |
| `marscode` | MarsCode | 🎯 | ByteDance |

---

## Files to modify

### 1. `data/questions.json` — `ai_tools` opts array

Add after the `devin` entry:

```json
{ "v": "deepseek",      "l": "DeepSeek",         "i": "🔍", "d": "DeepSeek AI" },
{ "v": "tongyi_lingma", "l": "Tongyi Lingma",     "i": "☁️", "d": "Alibaba Cloud" },
{ "v": "baidu_comate",  "l": "Baidu Comate",      "i": "🔵", "d": "Baidu" },
{ "v": "codegeex",      "l": "CodeGeeX",          "i": "🤖", "d": "Zhipu AI · VSCode" },
{ "v": "kimi",          "l": "Kimi",              "i": "🌙", "d": "Moonshot AI" },
{ "v": "marscode",      "l": "MarsCode",          "i": "🎯", "d": "ByteDance" }
```

### 2. `data/arbo.json` — four mapping objects

Add to each of `aiMainFile`, `aiLocalFile`, `aiToolFolder`, `aiTools`:

```json
// aiMainFile
"deepseek":      "DEEPSEEK.md",
"tongyi_lingma": "LINGMA.md",
"baidu_comate":  "COMATE.md",
"codegeex":      "CODEGEEX.md",
"kimi":          "KIMI.md",
"marscode":      "MARSCODE.md"

// aiLocalFile
"deepseek":      "DEEPSEEK.local.md",
"tongyi_lingma": "LINGMA.local.md",
"baidu_comate":  "COMATE.local.md",
"codegeex":      "CODEGEEX.local.md",
"kimi":          "KIMI.local.md",
"marscode":      "MARSCODE.local.md"

// aiToolFolder
"deepseek":      ".deepseek",
"tongyi_lingma": ".lingma",
"baidu_comate":  ".comate",
"codegeex":      ".codegeex",
"kimi":          ".kimi",
"marscode":      ".marscode"

// aiTools (display labels)
"deepseek":      "DeepSeek",
"tongyi_lingma": "Tongyi Lingma",
"baidu_comate":  "Baidu Comate",
"codegeex":      "CodeGeeX",
"kimi":          "Kimi",
"marscode":      "MarsCode"
```

### 3. `js/wizard.js` — `subToolFiles()` (line ~2756)

The function already handles mapping via `ARBO.mappings`, so no change needed as long as arbo.json is updated correctly. Verify the regex replacements cover new folder names.

---

## Verification checklist

- [ ] Each new tool appears in Q1 multi-select
- [ ] Selecting a Chinese tool generates the correct config folder (`cfg`) and main file (`mainFile`)
- [ ] No regression on existing tools
- [ ] `subToolFiles()` correctly rewrites placeholder paths

---

## Complexity: Low
One JSON-only change + arbo.json entries. No JS logic change required.
