"""Player telemetry analysis.

Reads exported match records and computes aggregate metrics: retention proxy,
average session length, gold-per-hour and class popularity. Pure standard
library so it runs anywhere.
"""
from __future__ import annotations

import csv
import statistics
from collections import Counter, defaultdict


def load(path: str) -> list[dict]:
    with open(path, newline="", encoding="utf-8") as fh:
        return list(csv.DictReader(fh))


def class_popularity(rows: list[dict]) -> Counter:
    return Counter(r["class"] for r in rows)


def average_session_minutes(rows: list[dict]) -> float:
    durations = [float(r["session_minutes"]) for r in rows if r.get("session_minutes")]
    return round(statistics.mean(durations), 1) if durations else 0.0


def gold_per_hour(rows: list[dict]) -> dict[str, float]:
    totals: dict[str, list[float]] = defaultdict(list)
    for r in rows:
        minutes = float(r.get("session_minutes", 0) or 0)
        gold = float(r.get("gold_earned", 0) or 0)
        if minutes > 0:
            totals[r["class"]].append(gold / (minutes / 60.0))
    return {c: round(statistics.mean(v), 1) for c, v in totals.items()}


def report(path: str) -> None:
    rows = load(path)
    print(f"Records: {len(rows)}")
    print(f"Avg session: {average_session_minutes(rows)} min")
    print("Class popularity:")
    for cls, n in class_popularity(rows).most_common():
        print(f"  {cls:12s} {n}")
    print("Gold/hour by class:")
    for cls, gph in sorted(gold_per_hour(rows).items(), key=lambda kv: -kv[1]):
        print(f"  {cls:12s} {gph}")


if __name__ == "__main__":
    import sys
    report(sys.argv[1] if len(sys.argv) > 1 else "telemetry.csv")
