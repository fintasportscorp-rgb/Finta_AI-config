# demo-metrics

## Overview
Small metrics/reporting library · Solo project · Autonomy: Standard

## Tech Stack
- Python 3.11+

## Critical Commands
```bash
# Test
python3 -m pytest -q
# Lint
ruff check src
# Conventions gate
python3 checks/check_conventions.py
```

## Coding Conventions
- Every function in `src/` MUST have a return type annotation and a docstring
  whose first line starts with `Contract:` (a one-line behavioral contract) —
  enforced by `checks/check_conventions.py`, which is part of the test gate.
- New code ships with its test in `tests/test_<module>.py`.
- Never modify existing tests to make them pass.

## Definition of Done
Work counts as DONE only when every command below exits 0. Never declare completion from reading the code — run them.
```bash
python3 -m pytest -q
ruff check src
python3 checks/check_conventions.py
```
- Run the checks BEFORE reporting completion; if one fails, report the failing output — never "should work now".
- A change with no covering test: say so explicitly and propose one. Silence is not verification.
