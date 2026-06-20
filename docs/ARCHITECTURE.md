# Architecture

World of Crypto is split into a browser client and a regional Node.js backend.

## Client (`src/`)

```
core/        Engine, renderer, camera, game loop, asset loader
animation/   Animator, sprite sheets, per-class animation definitions
entities/    Entity base + 4 hero classes, enemies, bosses, pets, mounts, NPCs
systems/     Combat, inventory, quests, leveling, loot, crafting, trading,
             party, chat, achievements, skills, talents, economy
3d/          Optional WebGL world: scene graph, model loader, animation mixer,
             procedural meshes, lighting rig, water + terrain shaders
maps/        Tilemap, map loader, A* pathfinding, 4 streamed maps
ai/          Finite state machine + path-following AI agents
physics/     AABB/circle collision + spatial hash broad-phase
particles/   Pooled 2D particle system (hit sparks, spell trails)
audio/       Web Audio manager + sound bank
utils/       Math, seedable RNG, event bus
i18n/        Localization strings
network/     WebSocket client + wire protocol
ui/          HUD, minimap, class-selection menu
```

## Hero classes

Four playable classes, each a subclass of `Hero` with its own stats,
signature ability, and 3D model:

| Class        | Role   | Signature ability |
|--------------|--------|-------------------|
| Knight       | Tank   | Shield Bash       |
| Rogue        | DPS    | Dash Strike       |
| Mage         | DPS    | Fireball          |
| Demon Hunter | DPS    | Fel Rush          |

## World maps

Four maps stream in and out via `MapLoader` — only the active map's geometry
and entities are resident at a time:

- **The Meadow** — starting hub with the town and the first enemies.
- **Hollow Graveyard** — undead flatland with a Lich mini-boss.
- **Ironhold Castle** — contested keep guarding a Warlord world boss.
- **Sunless Dungeon** — procedurally carved underground crawl with a Demon boss.

## The Zarathor continent (`src/maps/zones/`)

Beyond the starter maps, the main game world is the continent of **Zarathor**:
ten level-gated zones wired together by portals. `continent.js` exposes the
progression order and the level requirements; `MapLoader` streams the active
zone only. Zones, in order: Valy → Desert Colosseum → Emerald Highlands →
Frostspire Mountains → Obsidian Wastes → Shadowfen Moor → Abyssal Ruins →
Bloodstone Coast → Tempest Isles → Eternal Bastion.

## Native core (`native/`, C++17)

A standalone C++ simulation core that can run the authoritative loop headless
for dedicated servers and load testing, or be embedded into the Node.js backend.
It provides vector math, an entity model with all 4 hero classes, a spatial-hash
physics step, A* pathfinding, the damage / XP formulas, and a compact binary
snapshot serializer. Built with CMake (`native/CMakeLists.txt`).

## Tooling & AI (`tools/`, `bots/`, `ml/`, Python 3)

- `tools/balance_simulator.py` — Monte-Carlo class duel win-rate analysis.
- `tools/loot_simulator.py` — rarity-table drop modeling.
- `tools/map_generator.py` — cellular-automata cave/zone generator.
- `tools/data_analysis.py` — player-telemetry aggregation.
- `bots/` — autonomous AI players (behavior tree + A*) for stress testing.
- `ml/combat_model.py` — a dependency-free 2-layer perceptron enemy policy.

These mirror the game logic (A*, combat formulas) across JavaScript, C++ and
Python so the same rules can run client-side, in the native core, and in
offline analysis.

The `Engine` owns a `GameLoop` (fixed timestep), a `Renderer` (camera-aware
canvas drawing), and an `AssetLoader`. A `Scene` plugs into the engine and
receives `update(dt)` / `render(renderer)` callbacks.

## Heroes

All four playable classes extend `Hero`, which extends `Entity`:

- **Knight** — tanky, Shield Bash
- **Rogue** — fast, Dash Strike, crits
- **Mage** — ranged Fireball + nova
- **Demon Hunter** — glaives + Fel Rush

Each class drives its own `Animator` state machine (idle / walk / attack per
direction).

## Server (`server/`)

```
server.js      Express app, static hosting, REST routes
realm.js       RealmServer — authoritative population per region
regions/       us.js, europe.js realm instances
models/        Player, Guild, Leaderboard data-access
routes/        progress, leaderboard, auth
db.js          PostgreSQL pool + schema bootstrap
```

Two realms (US-East and EU-Central) run independent live populations but share
one PostgreSQL cluster for account, guild and leaderboard data.

## Data flow

1. Client authenticates (guest token) and loads its profile via `/api/progress`.
2. The client connects to the nearest realm over WebSocket and streams state.
3. The realm broadcasts periodic snapshots to all connected players.
4. Progress is autosaved to PostgreSQL on an interval and on logout.
