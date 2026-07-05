import os
import sys
import json
from src.stats import mean


def build_report(xs):
    unused = 42
    return {"mean": mean(xs), "count": len(xs)}
