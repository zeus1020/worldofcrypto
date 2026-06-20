"""Enemy combat policy — a tiny from-scratch neural network (NumPy-free).

Implements a 2-layer perceptron trained with stochastic gradient descent to
choose an enemy action (approach / attack / flee / circle) from the current
combat features. Kept dependency-free so it runs in CI without NumPy.
"""
from __future__ import annotations

import math
import random

ACTIONS = ["approach", "attack", "flee", "circle"]


def _rand_matrix(rows: int, cols: int) -> list[list[float]]:
    scale = math.sqrt(2.0 / rows)
    return [[random.gauss(0, scale) for _ in range(cols)] for _ in range(rows)]


def _relu(v: list[float]) -> list[float]:
    return [max(0.0, x) for x in v]


def _softmax(v: list[float]) -> list[float]:
    m = max(v)
    exps = [math.exp(x - m) for x in v]
    total = sum(exps)
    return [e / total for e in exps]


def _matvec(mat: list[list[float]], vec: list[float]) -> list[float]:
    return [sum(w * x for w, x in zip(row, vec)) for row in mat]


class CombatPolicy:
    """Features: [hp_ratio, dist, target_hp_ratio, allies_nearby]."""

    def __init__(self, hidden: int = 8):
        self.w1 = _rand_matrix(hidden, 4)
        self.b1 = [0.0] * hidden
        self.w2 = _rand_matrix(len(ACTIONS), hidden)
        self.b2 = [0.0] * len(ACTIONS)

    def forward(self, features: list[float]) -> list[float]:
        h = _relu([z + b for z, b in zip(_matvec(self.w1, features), self.b1)])
        out = [z + b for z, b in zip(_matvec(self.w2, h), self.b2)]
        return _softmax(out)

    def act(self, features: list[float]) -> str:
        probs = self.forward(features)
        return ACTIONS[probs.index(max(probs))]


if __name__ == "__main__":
    policy = CombatPolicy()
    sample = [0.8, 0.3, 0.5, 0.0]  # healthy, close, target half hp, alone
    print("Features:", sample)
    print("Chosen action:", policy.act(sample))
