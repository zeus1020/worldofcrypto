"""Autonomous AI player bot.

Drives a headless client through the public REST/WebSocket API to stress-test
the realm servers and to populate low-traffic zones with believable activity.
"""
from __future__ import annotations

import math
import random
from dataclasses import dataclass, field

from .pathfinding import astar


@dataclass
class BotState:
    x: float = 480.0
    y: float = 270.0
    hp: float = 100.0
    target: tuple[float, float] | None = None
    path: list[tuple[int, int]] = field(default_factory=list)


class AIBot:
    """A simple behavior-tree bot: wander, engage, retreat."""

    def __init__(self, hero_class: str = "knight", tile_size: int = 32):
        self.hero_class = hero_class
        self.tile_size = tile_size
        self.state = BotState()

    def decide(self, world) -> str:
        if self.state.hp < 30:
            return "retreat"
        enemy = self.nearest_enemy(world)
        if enemy and self.distance_to(enemy) < 120:
            return "attack"
        return "wander"

    def step(self, world, grid, width, height) -> str:
        action = self.decide(world)
        if action == "wander" and not self.state.path:
            goal = (random.randint(1, width - 2), random.randint(1, height - 2))
            start = (int(self.state.x // self.tile_size), int(self.state.y // self.tile_size))
            self.state.path = astar(grid, width, height, start, goal)
        self.follow_path()
        return action

    def follow_path(self) -> None:
        if not self.state.path:
            return
        c, r = self.state.path[0]
        tx, ty = c * self.tile_size + 16, r * self.tile_size + 16
        dx, dy = tx - self.state.x, ty - self.state.y
        if math.hypot(dx, dy) < 4:
            self.state.path.pop(0)
        else:
            self.state.x += dx * 0.1
            self.state.y += dy * 0.1

    def nearest_enemy(self, world):
        enemies = getattr(world, "enemies", [])
        return min(enemies, key=self.distance_to, default=None)

    def distance_to(self, e) -> float:
        return math.hypot(e["x"] - self.state.x, e["y"] - self.state.y)


if __name__ == "__main__":
    bot = AIBot("demohunter")
    print(f"Spawned {bot.hero_class} bot at ({bot.state.x}, {bot.state.y})")
