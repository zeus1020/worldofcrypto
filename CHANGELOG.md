# Changelog

All notable changes to World of Crypto are documented here.

## [1.4.0] - 2026-06-20

### Added
- **$WOC token economy**: the in-game marketplace now settles in the $WOC SPL
  token on Solana (`config/token.config.js`, `src/systems/marketplace.js`).
- **Marketplace service & REST API** (`server/market.js`, `server/routes/market.js`):
  order book with item escrow, $WOC settlement intents and price stats.
- `CURRENCY` map in the economy system distinguishing gold from on-chain $WOC.

### Changed
- The game is now described as a **2D / 3D** adventure (Canvas 2D + WebGL 3D).
- Roster reduced to the **four core classes** — Knight, Rogue, Mage and Demon
  Hunter — across the client, native C++ core, Python tooling, localization and
  the group finder.

### Removed
- The Necromancer, Paladin, Ranger and Berserker classes and their assets.
- The README "Getting Started" and "Controls" sections.

## [1.3.0] - 2026-06-20

### Added
- **Painted hero splash portraits** for all eight classes (Knight, Rogue, Mage,
  Demon Hunter, Necromancer, Paladin, Ranger, Berserker) under
  `assets/images/heroes/`, shown on the class-selection cards and the README
  hero gallery.
- **Global realm registry** (`config/realms.js`): 124 sharded realms across 13
  geographic regions (Americas, Europe, Middle East, Asia Pacific, Oceania,
  Africa).
- **Realm directory service** (`server/realmDirectory.js`) with live population
  heartbeats and latency-based realm recommendation.
- Realm directory REST API (`server/routes/realms.js`): list, summary,
  per-region and recommend endpoints.

### Changed
- Class-selection menu now renders portrait art, class role and blurb per card.

## [1.2.0] - 2026-06-20

### Added
- The **Zarathor continent**: ten level-gated zones (Valy, Desert Colosseum,
  Emerald Highlands, Frostspire Mountains, Obsidian Wastes, Shadowfen Moor,
  Abyssal Ruins, Bloodstone Coast, Tempest Isles, Eternal Bastion), each with
  its own biome, enemy roster and boss, wired together by portals.
- World-map progression layer (`continent.js`) with per-zone level gating.
- **C++17 native simulation core** (`native/`): vector math, entity model,
  spatial-hash physics, A* pathfinding, combat/XP formulas, binary netcode and
  a headless simulation harness, built with CMake.
- **Python tooling & AI** (`tools/`, `bots/`, `ml/`): class-balance simulator,
  loot simulator, procedural map generator, telemetry analysis, autonomous AI
  bots and a from-scratch combat-AI neural network.

## [1.1.0] - 2026-06-20

### Added
- Four more hero classes: Necromancer, Paladin, Ranger and Berserker (8 total).
- Optional WebGL 3D world: scene graph, glTF model loader, animation mixer,
  procedural meshes, lighting rig, and custom water + terrain shaders.
- Streamed map system with four maps (Meadow, Graveyard, Castle, Dungeon),
  tilemaps, portals and A* pathfinding.
- AI layer: finite state machine and path-following agents; multi-phase bosses.
- New entities: bosses, companion pets and rideable mounts.
- Social & economy systems: party, guild, trading, chat, achievements, skills,
  talents, crafting, vendors and an auction house.
- Engine support systems: particle system, physics (collision + spatial hash),
  Web Audio manager, seedable RNG, event bus and localization.
- Server gateway with regional routing, matchmaking group finder, rate limiter
  and session store; new item/achievement/session models and guild/trade/party
  routes; SQL migrations for profiles, guilds, achievements and inventory.

## [1.0.0] - 2026-06-20

### Added
- Four playable hero classes: Knight, Rogue, Mage and Demon Hunter.
- Core engine: fixed-timestep loop, camera-aware renderer, asset loader.
- Animation system with per-class state machines (idle / walk / attack).
- Combat, inventory, quest, leveling and loot systems.
- Regional realm servers for the Americas (US-East) and Europe (EU-Central).
- PostgreSQL-backed player profiles, guilds and global leaderboard.
- Circular proximity minimap and HUD.
- Class-selection launcher menu.

### Notes
- First public release.
