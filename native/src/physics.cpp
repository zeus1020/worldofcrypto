#include "entity.hpp"
#include <vector>
#include <unordered_map>

namespace woc {

/// Broad-phase spatial hash for fast neighbor queries in the native core.
class SpatialHash {
public:
    explicit SpatialHash(float cellSize) : cellSize_(cellSize) {}

    void clear() { cells_.clear(); }

    void insert(Entity* e) {
        cells_[key(e->position)].push_back(e);
    }

    std::vector<Entity*> nearby(const Vec2& p) const {
        std::vector<Entity*> result;
        int cx = static_cast<int>(p.x / cellSize_);
        int cy = static_cast<int>(p.y / cellSize_);
        for (int dx = -1; dx <= 1; ++dx) {
            for (int dy = -1; dy <= 1; ++dy) {
                auto it = cells_.find(hash(cx + dx, cy + dy));
                if (it != cells_.end()) {
                    result.insert(result.end(), it->second.begin(), it->second.end());
                }
            }
        }
        return result;
    }

private:
    float cellSize_;
    std::unordered_map<int64_t, std::vector<Entity*>> cells_;

    int64_t hash(int cx, int cy) const {
        return (static_cast<int64_t>(cx) << 32) ^ static_cast<uint32_t>(cy);
    }
    int64_t key(const Vec2& p) const {
        return hash(static_cast<int>(p.x / cellSize_),
                    static_cast<int>(p.y / cellSize_));
    }
};

/// Integrates positions and resolves circle-circle overlaps.
void stepPhysics(std::vector<Entity>& entities, float dt) {
    for (auto& e : entities) {
        if (!e.alive) continue;
        e.position = e.position + e.velocity * dt;
    }
    for (size_t i = 0; i < entities.size(); ++i) {
        for (size_t j = i + 1; j < entities.size(); ++j) {
            if (entities[i].collidesWith(entities[j])) {
                Vec2 push = (entities[i].position - entities[j].position).normalized();
                entities[i].position = entities[i].position + push * 0.5f;
                entities[j].position = entities[j].position - push * 0.5f;
            }
        }
    }
}

} // namespace woc
