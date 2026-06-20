import { makeZone } from "./zoneBuilder.js";

/**
 * Zone 6 — Shadowfen Moor (Levels 55–65).
 * A cursed, fog-drowned swamp. Witches, bog horrors and a hag coven.
 */
export const shadowfenMoor = makeZone({
  id: "shadowfen_moor",
  name: "Shadowfen Moor",
  levelRange: [55, 65],
  biome: "swamp",
  groundTile: 2,
  ambient: "#16221a",
  music: "shadowfen",
  width: 54,
  height: 48,
  spawns: [
    { kind: "npc", name: "Hexbane Mordra", x: 300, y: 300 },
    { kind: "enemy", type: "bog_horror", x: 720, y: 440 },
    { kind: "enemy", type: "will_o_wisp", x: 940, y: 360 },
    { kind: "enemy", type: "swamp_troll", x: 1160, y: 520 },
    { kind: "boss", type: "hag_matron", x: 1380, y: 680 },
  ],
  portals: [
    { to: "emerald_highlands", x: 60, y: 900, radius: 48 },
    { to: "obsidian_wastes", x: 60, y: 700, radius: 48 },
    { to: "abyssal_ruins", x: 1600, y: 700, radius: 48 },
  ],
});
