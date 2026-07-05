#!/usr/bin/env python3
"""Project convention gate: every function in src/stats.py must have a
return type annotation and a docstring. Exit 0 = conventions respected."""
import ast, sys

tree = ast.parse(open("src/stats.py", encoding="utf-8").read())
bad = []
for node in ast.walk(tree):
    if isinstance(node, ast.FunctionDef):
        if node.returns is None:
            bad.append(f"{node.name}: missing return type annotation")
        doc = None
        if (node.body and isinstance(node.body[0], ast.Expr)
                and isinstance(node.body[0].value, ast.Constant)
                and isinstance(node.body[0].value.value, str)):
            doc = node.body[0].value.value
        if doc is None:
            bad.append(f"{node.name}: missing docstring")
        elif not doc.lstrip().startswith("Contract:"):
            bad.append(f"{node.name}: docstring must start with 'Contract:' (project convention)")
if bad:
    print("CONVENTIONS: FAIL")
    for b in bad:
        print("  ✗", b)
    sys.exit(1)
print("CONVENTIONS: OK")
