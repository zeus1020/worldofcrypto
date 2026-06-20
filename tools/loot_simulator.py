"""Loot drop simulator.

Models the weighted rarity table and estimates how many kills are needed on
average to obtain a legendary item.
"""
from __future__ import annotations

import random
from collections import Counter

RARITY_WEIGHTS = {
    "common": 60,
    "uncommon": 25,
    "rare": 10,
    "epic": 4,
    "legendary": 1,
}


def roll_rarity() -> str:
    population = list(RARITY_WEIGHTS.keys())
    weights = list(RARITY_WEIGHTS.values())
    return random.choices(population, weights=weights, k=1)[0]


def simulate(kills: int = 100_000) -> Counter:
    drops = Counter()
    for _ in range(kills):
        drops[roll_rarity()] += 1
    return drops


def average_kills_for_legendary(samples: int = 5000) -> float:
    total = 0
    for _ in range(samples):
        kills = 0
        while True:
            kills += 1
            if roll_rarity() == "legendary":
                break
        total += kills
    return total / samples


if __name__ == "__main__":
    distribution = simulate()
    print("Drop distribution over 100k kills:")
    for rarity, count in distribution.most_common():
        print(f"  {rarity:10s} {count:6d}  ({100 * count / 100_000:.2f}%)")
    print(f"\nAvg kills per legendary: {average_kills_for_legendary():.1f}")
