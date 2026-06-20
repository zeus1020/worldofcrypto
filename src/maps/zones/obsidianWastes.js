import { makeZone } from "./zoneBuilder.js";

/**
 * Zone 5 — Obsidian Wastes (Levels 45–55).
 * A volcanic blasted land of black glass and lava rivers. Fire demons abound.
 */
export const obsidianWastes = makeZone({
  id: "obsidian_wastes",
  name: "Obsidian Wastes",
  levelRange: [45, 55],
  biome: "volcanic",
  groundTile: 7,
  ambient: "#3a1410",
  music: "inferno",
  width: 54,
  height: 46,
  spawns: [
    { kind: "npc", name: "Emberseer Kresh", x: 320, y: 280 },
    { kind: "enemy", type: "lava_hound", x: 700, y: 420 },
    { kind: "enemy", type: "fire_imp", x: 920, y: 360 },
    { kind: "enemy", type: "magma_golem", x: 1140, y: 520 },
    { kind: "boss", type: "infernal_lord", x: 1360, y: 660 },
  ],
  portals: [
    { to: "frostspire_mountains", x: 60, y: 700, radius: 48 },
    { to: "shadowfen_moor", x: 1580, y: 700, radius: 48 },
  ],
});
