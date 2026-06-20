import { makeZone } from "./zoneBuilder.js";

/**
 * Zone 8 — Bloodstone Coast (Levels 75–85).
 * A crimson shoreline of pirate coves and drowned wrecks. Corsairs and krakens.
 */
export const bloodstoneCoast = makeZone({
  id: "bloodstone_coast",
  name: "Bloodstone Coast",
  levelRange: [75, 85],
  biome: "coast",
  groundTile: 5,
  ambient: "#2a1418",
  music: "coast",
  width: 56,
  height: 50,
  spawns: [
    { kind: "npc", name: "Captain Reyna", x: 320, y: 300 },
    { kind: "enemy", type: "corsair", x: 720, y: 440 },
    { kind: "enemy", type: "drowned", x: 940, y: 360 },
    { kind: "enemy", type: "reef_serpent", x: 1180, y: 520 },
    { kind: "boss", type: "kraken", x: 1420, y: 700 },
  ],
  portals: [
    { to: "abyssal_ruins", x: 60, y: 700, radius: 48 },
    { to: "tempest_isles", x: 1640, y: 700, radius: 48 },
  ],
});
