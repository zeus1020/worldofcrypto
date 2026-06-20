/**
 * Shared helpers for building Zarathor continent zones. Each zone is a
 * tilemap with a bordered solid layer, a themed ground tile, level range,
 * spawns and portals linking it to neighboring zones.
 */
export function fill(width, height, value) {
  return new Array(width * height).fill(value);
}

export function borderedSolid(width, height) {
  const solid = fill(width, height, 0);
  for (let c = 0; c < width; c++) {
    solid[c] = 1;
    solid[(height - 1) * width + c] = 1;
  }
  for (let r = 0; r < height; r++) {
    solid[r * width] = 1;
    solid[r * width + (width - 1)] = 1;
  }
  return solid;
}

/**
 * Builds a zone definition from a compact descriptor.
 * @param {object} cfg
 */
export function makeZone(cfg) {
  const width = cfg.width ?? 48;
  const height = cfg.height ?? 40;
  return {
    name: cfg.name,
    id: cfg.id,
    levelRange: cfg.levelRange,
    biome: cfg.biome,
    width,
    height,
    tileSize: 32,
    ground: fill(width, height, cfg.groundTile ?? 1),
    solid: borderedSolid(width, height),
    spawns: cfg.spawns ?? [],
    portals: cfg.portals ?? [],
    ambient: cfg.ambient ?? "#0e0b14",
    music: cfg.music ?? "explore",
  };
}
