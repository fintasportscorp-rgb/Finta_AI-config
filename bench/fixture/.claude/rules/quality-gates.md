# Quality gates
All three gates must pass before any completion claim:
1. `python3 -m pytest -q` — full suite green
2. `ruff check src` — zero lint findings
3. `python3 checks/check_conventions.py` — type hints + docstrings on every src/stats.py function
