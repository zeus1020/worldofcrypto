import { makeZone } from "./zoneBuilder.js";

/**
 * Zone 10 — Eternal Bastion (Levels 94–99).
 * The final endgame citadel at the edge of the world. Home to the world-ending
 * raid boss and the highest-tier loot in Zarathor.
 */
export const eternalBastion = makeZone({
  id: "eternal_bastion",
  name: "Eternal Bastion",
  levelRange: [94, 99],
  biome: "citadel",
  groundTile: 3,
  ambient: "#26102e",
  music: "finale",
  width: 60,
  height: 52,
  spawns: [
    { kind: "npc", name: "Warden of the End", x: 320, y: 300 },
    { kind: "enemy", type: "void_knight", x: 760, y: 440 },
    { kind: "enemy", type: "doom_herald", x: 1000, y: 360 },
    { kind: "enemy", type: "abyssal_guard", x: 1240, y: 520 },
    { kind: "boss", type: "zarathor_the_eternal", x: 1500, y: 740 },
  ],
  portals: [{ to: "tempest_isles", x: 60, y: 700, radius: 48 }],
});
