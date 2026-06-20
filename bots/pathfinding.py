"""A* pathfinding used by the Python bots (mirrors the JS and C++ versions)."""
from __future__ import annotations

import heapq


def astar(grid, width, height, start, goal):
    """grid is a flat list (row-major); 1 = blocked, 0 = walkable."""
    def idx(c, r):
        return r * width + c

    def neighbors(c, r):
        for dc, dr in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nc, nr = c + dc, r + dr
            if 0 <= nc < width and 0 <= nr < height and grid[idx(nc, nr)] == 0:
                yield nc, nr

    def heuristic(node):
        return abs(node[0] - goal[0]) + abs(node[1] - goal[1])

    open_set = [(0, start)]
    came_from = {}
    g_score = {start: 0}

    while open_set:
        _, current = heapq.heappop(open_set)
        if current == goal:
            return reconstruct(came_from, current)
        for nxt in neighbors(*current):
            tentative = g_score[current] + 1
            if tentative < g_score.get(nxt, float("inf")):
                came_from[nxt] = current
                g_score[nxt] = tentative
                heapq.heappush(open_set, (tentative + heuristic(nxt), nxt))
    return []


def reconstruct(came_from, current):
    path = [current]
    while current in came_from:
        current = came_from[current]
        path.append(current)
    path.reverse()
    return path
