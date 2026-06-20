#include "entity.hpp"
#include <vector>
#include <cstdio>

namespace woc {
void stepPhysics(std::vector<Entity>&, float);
float computeDamage(const Hero&, float, float);
uint32_t grantExperience(Hero&, uint64_t);
}

/// Standalone headless simulation harness. Useful for load testing the
/// native core without a graphics client.
int main() {
    using namespace woc;

    std::vector<Hero> heroes;
    for (uint32_t i = 0; i < 8; ++i) {
        Hero h;
        h.id = i;
        h.heroClass = static_cast<HeroClass>(i);
        h.position = Vec2(static_cast<float>(i * 32), 0.0f);
        h.velocity = Vec2(10.0f, 5.0f);
        heroes.push_back(h);
    }

    const float dt = 1.0f / 60.0f;
    for (int frame = 0; frame < 600; ++frame) {
        std::vector<Entity> ents(heroes.begin(), heroes.end());
        stepPhysics(ents, dt);
        for (size_t i = 0; i < heroes.size(); ++i) {
            heroes[i].position = ents[i].position;
        }
    }

    for (auto& h : heroes) {
        grantExperience(h, 5000);
        std::printf("Hero %u  class=%d  level=%u  pos=(%.1f, %.1f)\n",
                    h.id, static_cast<int>(h.heroClass), h.level,
                    h.position.x, h.position.y);
    }
    return 0;
}
