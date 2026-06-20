import { makeZone } from "./zoneBuilder.js";

/**
 * Zone 4 — Frostspire Mountains (Levels 35–45).
 * Snow-capped peaks and frozen citadels. Yetis, ice elementals and a frost wyrm.
 */
export const frostspireMountains = makeZone({
  id: "frostspire_mountains",
  name: "Frostspire Mountains",
  levelRange: [35, 45],
  biome: "snow-peaks",
  groundTile: 6,
  ambient: "#1c2a3a",
  music: "frost",
  width: 54,
  height: 46,
  spawns: [
    { kind: "npc", name: "Frostguard Ulla", x: 300, y: 300 },
    { kind: "enemy", type: "yeti", x: 720, y: 440 },
    { kind: "enemy", type: "ice_elemental", x: 940, y: 360 },
    { kind: "enemy", type: "frost_giant", x: 1120, y: 520 },
    { kind: "boss", type: "frost_wyrm", x: 1340, y: 660 },
  ],
  portals: [{ to: "emerald_highlands", x: 60, y: 200, radius: 48 }],
});
