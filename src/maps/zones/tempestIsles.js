import { makeZone } from "./zoneBuilder.js";

/**
 * Zone 9 — Tempest Isles (Levels 85–94).
 * Storm-wracked floating islands crackling with lightning. Storm elementals
 * and sky drakes guard the path to the final bastion.
 */
export const tempestIsles = makeZone({
  id: "tempest_isles",
  name: "Tempest Isles",
  levelRange: [85, 94],
  biome: "storm-isles",
  groundTile: 3,
  ambient: "#1a1c34",
  music: "tempest",
  width: 58,
  height: 50,
  spawns: [
    { kind: "npc", name: "Stormcaller Aedan", x: 320, y: 300 },
    { kind: "enemy", type: "storm_elemental", x: 720, y: 440 },
    { kind: "enemy", type: "sky_drake", x: 980, y: 360 },
    { kind: "enemy", type: "thunderbird", x: 1200, y: 520 },
    { kind: "boss", type: "tempest_titan", x: 1460, y: 700 },
  ],
  portals: [
    { to: "bloodstone_coast", x: 60, y: 700, radius: 48 },
    { to: "eternal_bastion", x: 1660, y: 700, radius: 48 },
  ],
});
