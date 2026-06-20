# World of Crypto — Native Core (C++)

A high-performance C++17 simulation core that can run the authoritative game
loop headless (for dedicated servers and load testing) or be embedded into the
Node.js backend via a binding layer.

## Modules

| File | Responsibility |
|------|----------------|
| `include/vec2.hpp` | 2D vector math |
| `include/entity.hpp` | Entity / Hero records, 4 hero classes |
| `src/physics.cpp` | Spatial hash + collision integration |
| `src/pathfinding.cpp` | A* over the solid grid |
| `src/combat.cpp` | Damage formula, XP / leveling curve |
| `src/network.cpp` | Compact binary snapshot serialization |
| `src/main.cpp` | Headless simulation harness |

## Build

```bash
cmake -S . -B build
cmake --build build
./build/woc_sim
```

Requires CMake ≥ 3.16 and a C++17 compiler (GCC, Clang or MSVC).
