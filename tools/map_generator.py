"""Procedural map generator.

Generates a JSON tilemap (ground + solid layers) using cellular-automata cave
carving, ready to drop into ``src/maps/zones`` as a new zone definition.
"""
from __future__ import annotations

import json
import random
import sys


def generate(width: int, height: int, fill_prob: float = 0.45, steps: int = 4):
    grid = [
        [1 if random.random() < fill_prob else 0 for _ in range(width)]
        for _ in range(height)
    ]

    for _ in range(steps):
        grid = smooth(grid, width, height)

    # Force solid border.
    for c in range(width):
        grid[0][c] = grid[height - 1][c] = 1
    for r in range(height):
        grid[r][0] = grid[r][width - 1] = 1

    solid = [cell for row in grid for cell in row]
    ground = [1] * (width * height)
    return {"width": width, "height": height, "tileSize": 32,
            "ground": ground, "solid": solid}


def smooth(grid, width, height):
    new = [[0] * width for _ in range(height)]
    for r in range(height):
        for c in range(width):
            walls = count_walls(grid, c, r, width, height)
            new[r][c] = 1 if walls >= 5 else 0
    return new


def count_walls(grid, c, r, width, height) -> int:
    total = 0
    for dr in (-1, 0, 1):
        for dc in (-1, 0, 1):
            if dr == 0 and dc == 0:
                continue
            nr, nc = r + dr, c + dc
            if nr < 0 or nc < 0 or nr >= height or nc >= width:
                total += 1
            else:
                total += grid[nr][nc]
    return total


if __name__ == "__main__":
    w = int(sys.argv[1]) if len(sys.argv) > 1 else 48
    h = int(sys.argv[2]) if len(sys.argv) > 2 else 48
    print(json.dumps(generate(w, h), separators=(",", ":")))
