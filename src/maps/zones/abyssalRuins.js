import { makeZone } from "./zoneBuilder.js";

/**
 * Zone 7 — Abyssal Ruins (Levels 65–75).
 * Sunken eldritch ruins humming with void energy. Tentacled horrors and cultists.
 */
export const abyssalRuins = makeZone({
  id: "abyssal_ruins",
  name: "Abyssal Ruins",
  levelRange: [65, 75],
  biome: "eldritch-ruins",
  groundTile: 4,
  ambient: "#161a2e",
  music: "abyss",
  width: 56,
  height: 48,
  spawns: [
    { kind: "npc", name: "Seer Vethis", x: 320, y: 300 },
    { kind: "enemy", type: "void_cultist", x: 720, y: 440 },
    { kind: "enemy", type: "deep_one", x: 940, y: 360 },
    { kind: "enemy", type: "eye_horror", x: 1160, y: 520 },
    { kind: "boss", type: "void_leviathan", x: 1400, y: 680 },
  ],
  portals: [
    { to: "shadowfen_moor", x: 60, y: 700, radius: 48 },
    { to: "bloodstone_coast", x: 1620, y: 700, radius: 48 },
  ],
});
