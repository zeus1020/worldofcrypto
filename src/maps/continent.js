import { ZARATHOR_ZONES, ZONE_ORDER } from "./zones/index.js";

/**
 * The Zarathor continent — the world overview that ties the ten zones into a
 * single level-gated progression. Drives the world map screen and validates
 * that a player meets the level requirement before zoning in.
 */
export const CONTINENT = {
  name: "Zarathor",
  zones: ZONE_ORDER.map((id, i) => ({
    index: i + 1,
    id,
    name: ZARATHOR_ZONES[id].name,
    levelRange: ZARATHOR_ZONES[id].levelRange,
    biome: ZARATHOR_ZONES[id].biome,
  })),
};

/** Returns the zone descriptor a player of the given level belongs to. */
export function zoneForLevel(level) {
  return CONTINENT.zones.find(
    (z) => level >= z.levelRange[0] && level <= z.levelRange[1]
  ) ?? CONTINENT.zones[0];
}

/** True if the player meets the minimum level to enter a zone. */
export function canEnter(zoneId, level) {
  const zone = CONTINENT.zones.find((z) => z.id === zoneId);
  if (!zone) return false;
  return level >= zone.levelRange[0];
}
