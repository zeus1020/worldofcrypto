import { makeZone } from "./zoneBuilder.js";

/**
 * Zone 2 — Desert Colosseum (Levels 10–25).
 * A sun-scorched arena city. Gladiator pits, wave events and a champion boss.
 */
export const desertColosseum = makeZone({
  id: "desert_colosseum",
  name: "Desert Colosseum",
  levelRange: [10, 25],
  biome: "desert-arena",
  groundTile: 5,
  ambient: "#3a2a12",
  music: "arena",
  width: 50,
  height: 42,
  spawns: [
    { kind: "npc", name: "Arena Master Sol", x: 300, y: 260 },
    { kind: "enemy", type: "scarab", x: 640, y: 360 },
    { kind: "enemy", type: "gladiator", x: 820, y: 440 },
    { kind: "enemy", type: "sand_wraith", x: 1000, y: 360 },
    { kind: "boss", type: "arena_champion", x: 1200, y: 600 },
  ],
  portals: [
    { to: "valy", x: 60, y: 640, radius: 48 },
    { to: "emerald_highlands", x: 1520, y: 700, radius: 48 },
  ],
});
