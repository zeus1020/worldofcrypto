import { makeZone } from "./zoneBuilder.js";

/**
 * Zone 3 — Emerald Highlands (Levels 25–35).
 * Rolling green highlands crowned by an ancient spire. Druids and forest beasts.
 */
export const emeraldHighlands = makeZone({
  id: "emerald_highlands",
  name: "Emerald Highlands",
  levelRange: [25, 35],
  biome: "highlands",
  groundTile: 1,
  ambient: "#16321f",
  music: "highlands",
  width: 52,
  height: 44,
  spawns: [
    { kind: "npc", name: "Archdruid Faelan", x: 320, y: 280 },
    { kind: "enemy", type: "treant", x: 700, y: 420 },
    { kind: "enemy", type: "dire_bear", x: 900, y: 360 },
    { kind: "enemy", type: "harpy", x: 1100, y: 500 },
    { kind: "boss", type: "ancient_treant", x: 1300, y: 640 },
  ],
  portals: [
    { to: "desert_colosseum", x: 60, y: 700, radius: 48 },
    { to: "frostspire_mountains", x: 1560, y: 200, radius: 48 },
    { to: "shadowfen_moor", x: 1560, y: 900, radius: 48 },
  ],
});
