#pragma once
#include "vec2.hpp"
#include <string>
#include <cstdint>

namespace woc {

enum class HeroClass : uint8_t {
    Knight, Rogue, Mage, DemonHunter
};

/// Base entity record shared by the native simulation systems.
struct Entity {
    uint32_t id = 0;
    Vec2 position;
    Vec2 velocity;
    float radius = 16.0f;
    float health = 100.0f;
    float maxHealth = 100.0f;
    bool alive = true;

    bool collidesWith(const Entity& o) const {
        return Vec2::distance(position, o.position) < (radius + o.radius);
    }

    void applyDamage(float amount) {
        health -= amount;
        if (health <= 0.0f) { health = 0.0f; alive = false; }
    }
};

/// Player-controlled hero with class-specific stats.
struct Hero : Entity {
    HeroClass heroClass = HeroClass::Knight;
    float mana = 100.0f;
    uint32_t level = 1;
    uint64_t experience = 0;
};

} // namespace woc
