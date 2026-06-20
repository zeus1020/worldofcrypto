/**
 * A tile-based map layer. Tiles reference indices into a tileset; collision
 * is derived from a parallel solid layer.
 */
export class Tilemap {
  constructor(def) {
    this.name = def.name;
    this.width = def.width;
    this.height = def.height;
    this.tileSize = def.tileSize ?? 32;
    this.ground = def.ground;
    this.solid = def.solid;
    this.spawns = def.spawns ?? [];
    this.portals = def.portals ?? [];
  }

  tileAt(col, row) {
    if (row < 0 || col < 0 || row >= this.height || col >= this.width) return -1;
    return this.ground[row * this.width + col];
  }

  isSolidPx(x, y) {
    const col = Math.floor(x / this.tileSize);
    const row = Math.floor(y / this.tileSize);
    if (row < 0 || col < 0 || row >= this.height || col >= this.width) return true;
    return this.solid[row * this.width + col] === 1;
  }

  portalAt(x, y) {
    return this.portals.find(
      (p) => Math.hypot(p.x - x, p.y - y) < (p.radius ?? 40)
    );
  }
}
