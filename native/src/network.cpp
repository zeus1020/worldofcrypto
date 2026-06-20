#include "entity.hpp"
#include <vector>
#include <cstring>

namespace woc {

/// Binary wire format for state snapshots sent from the authoritative
/// native simulation to clients. Compact, fixed-layout per entity.
#pragma pack(push, 1)
struct WireEntity {
    uint32_t id;
    float x;
    float y;
    float health;
    uint8_t heroClass;
    uint8_t alive;
};
#pragma pack(pop)

/// Serializes a list of heroes into a byte buffer.
std::vector<uint8_t> serializeSnapshot(const std::vector<Hero>& heroes) {
    std::vector<uint8_t> buffer;
    uint32_t count = static_cast<uint32_t>(heroes.size());
    buffer.resize(sizeof(uint32_t) + count * sizeof(WireEntity));
    std::memcpy(buffer.data(), &count, sizeof(uint32_t));

    auto* dst = reinterpret_cast<WireEntity*>(buffer.data() + sizeof(uint32_t));
    for (size_t i = 0; i < heroes.size(); ++i) {
        const Hero& h = heroes[i];
        dst[i] = WireEntity{
            h.id, h.position.x, h.position.y, h.health,
            static_cast<uint8_t>(h.heroClass),
            static_cast<uint8_t>(h.alive ? 1 : 0)
        };
    }
    return buffer;
}

} // namespace woc
