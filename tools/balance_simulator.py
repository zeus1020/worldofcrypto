"""Class balance simulator.

Runs thousands of simulated duels between every pair of hero classes and
reports win rates, so designers can spot over- or under-powered classes.
"""
from __future__ import annotations

import itertools
import random
from dataclasses import dataclass

HERO_CLASSES = [
    "knight", "rogue", "mage", "demohunter",
]

BASE_STATS = {
    "knight":      {"hp": 150, "dmg": 10, "speed": 1.0, "armor": 30},
    "rogue":       {"hp": 100, "dmg": 14, "speed": 1.6, "armor": 10},
    "mage":        {"hp": 80,  "dmg": 18, "speed": 1.0, "armor": 5},
    "demohunter":  {"hp": 110, "dmg": 13, "speed": 1.5, "armor": 12},
}


@dataclass
class Combatant:
    name: str
    hp: float
    dmg: float
    speed: float
    armor: float

    @classmethod
    def of(cls, name: str) -> "Combatant":
        s = BASE_STATS[name]
        return cls(name, s["hp"], s["dmg"], s["speed"], s["armor"])

    def hit(self, target: "Combatant") -> None:
        crit = 2.0 if random.random() > 0.85 else 1.0
        mitigation = 100.0 / (100.0 + target.armor)
        target.hp -= self.dmg * crit * mitigation


def duel(a: str, b: str) -> str:
    ca, cb = Combatant.of(a), Combatant.of(b)
    timeline = sorted([ca, cb], key=lambda c: -c.speed)
    for _ in range(500):
        attacker, defender = timeline[0], timeline[1]
        attacker.hit(defender)
        if defender.hp <= 0:
            return attacker.name
        timeline.reverse()
    return ca.name if ca.hp >= cb.hp else cb.name


def run(trials: int = 2000) -> dict[str, float]:
    wins = {c: 0 for c in HERO_CLASSES}
    matches = {c: 0 for c in HERO_CLASSES}
    for a, b in itertools.combinations(HERO_CLASSES, 2):
        for _ in range(trials):
            winner = duel(a, b)
            wins[winner] += 1
            matches[a] += 1
            matches[b] += 1
    return {c: round(100 * wins[c] / matches[c], 1) for c in HERO_CLASSES}


if __name__ == "__main__":
    rates = run()
    print("Class win rates (%):")
    for name, rate in sorted(rates.items(), key=lambda kv: -kv[1]):
        print(f"  {name:12s} {rate:5.1f}%")
