#include "vec2.hpp"
#include <vector>
#include <queue>
#include <unordered_map>
#include <cmath>

namespace woc {

/// Grid node coordinate.
struct Node {
    int c, r;
    bool operator==(const Node& o) const { return c == o.c && r == o.r; }
};

struct NodeHash {
    size_t operator()(const Node& n) const {
        return std::hash<int>()(n.c) ^ (std::hash<int>()(n.r) << 1);
    }
};

/// A* pathfinding over a flat solid grid (1 = blocked, 0 = walkable).
std::vector<Node> findPath(const std::vector<uint8_t>& solid, int width, int height,
                           Node start, Node goal) {
    auto idx = [width](int c, int r) { return r * width + c; };
    auto heuristic = [&](Node n) {
        return std::abs(n.c - goal.c) + std::abs(n.r - goal.r);
    };

    using PQItem = std::pair<int, Node>;
    std::priority_queue<PQItem, std::vector<PQItem>, std::greater<>> open;
    std::unordered_map<Node, Node, NodeHash> came;
    std::unordered_map<Node, int, NodeHash> gScore;

    open.push({0, start});
    gScore[start] = 0;

    const int dc[] = {1, -1, 0, 0};
    const int dr[] = {0, 0, 1, -1};

    while (!open.empty()) {
        Node cur = open.top().second;
        open.pop();
        if (cur == goal) break;
        for (int k = 0; k < 4; ++k) {
            Node next{cur.c + dc[k], cur.r + dr[k]};
            if (next.c < 0 || next.r < 0 || next.c >= width || next.r >= height) continue;
            if (solid[idx(next.c, next.r)] == 1) continue;
            int tentative = gScore[cur] + 1;
            if (!gScore.count(next) || tentative < gScore[next]) {
                gScore[next] = tentative;
                came[next] = cur;
                open.push({tentative + heuristic(next), next});
            }
        }
    }

    std::vector<Node> path;
    if (!came.count(goal)) return path;
    for (Node n = goal; !(n == start); n = came[n]) path.push_back(n);
    path.push_back(start);
    return {path.rbegin(), path.rend()};
}

} // namespace woc
