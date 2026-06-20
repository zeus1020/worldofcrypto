import { makeZone } from "./zoneBuilder.js";

/**
 * Zone 1 — Valy (Levels 1–10).
 * The verdant starting valley where every hero begins. Gentle slopes, a
 * starter town and roaming wildlife. Portal east to the Desert Colosseum.
 */
export const valy = makeZone({
  id: "valy",
  name: "Valy",
  levelRange: [1, 10],
  biome: "verdant-valley",
  groundTile: 1,
  ambient: "#1a2a16",
  music: "meadow",
  width: 48,
  height: 40,
  spawns: [
    { kind: "npc", name: "Elder Mira", x: 240, y: 200 },
    { kind: "npc", name: "Quartermaster Bran", x: 360, y: 220 },
    { kind: "enemy", type: "wolf", x: 700, y: 400 },
    { kind: "enemy", type: "boar", x: 820, y: 320 },
    { kind: "enemy", type: "bandit", x: 980, y: 480 },
  ],
  portals: [{ to: "desert_colosseum", x: 1500, y: 640, radius: 48 }],
});
