#include "entity.hpp"
#include <algorithm>

namespace woc {

/// Damage formula mirroring the JS combat system: base damage scaled by a
/// class multiplier and reduced by the target's armor.
float computeDamage(const Hero& attacker, float armor, float critRoll) {
    static const float classMult[] = {
        1.0f,  // Knight
        1.3f,  // Rogue
        1.5f,  // Mage
        1.2f,  // DemonHunter
    };
    float base = 10.0f + static_cast<float>(attacker.level) * 2.0f;
    float dmg = base * classMult[static_cast<int>(attacker.heroClass)];
    if (critRoll > 0.85f) dmg *= 2.0f;
    float mitigated = dmg * (100.0f / (100.0f + armor));
    return std::max(1.0f, mitigated);
}

/// Experience required to advance from the given level.
uint64_t xpForLevel(uint32_t level) {
    return static_cast<uint64_t>(100.0 * std::pow(level, 1.5));
}

/// Applies experience and returns the number of levels gained.
uint32_t grantExperience(Hero& hero, uint64_t amount) {
    hero.experience += amount;
    uint32_t gained = 0;
    while (hero.experience >= xpForLevel(hero.level)) {
        hero.experience -= xpForLevel(hero.level);
        hero.level++;
        gained++;
        hero.maxHealth += 10.0f;
        hero.health = hero.maxHealth;
    }
    return gained;
}

} // namespace woc
