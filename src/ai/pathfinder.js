import { findPath } from "../maps/pathfinding.js";

/**
 * Caches and follows A* paths so AI agents don't recompute every frame.
 */
export class Pathfinder {
  constructor(tilemap, repathInterval = 0.5) {
    this.tilemap = tilemap;
    this.repathInterval = repathInterval;
    this.timer = 0;
    this.path = [];
    this.index = 0;
  }

  toTile(x, y) {
    return { c: Math.floor(x / this.tilemap.tileSize), r: Math.floor(y / this.tilemap.tileSize) };
  }

  update(dt, from, to) {
    this.timer -= dt;
    if (this.timer <= 0) {
      this.timer = this.repathInterval;
      this.path = findPath(this.tilemap, this.toTile(from.x, from.y), this.toTile(to.x, to.y));
      this.index = 0;
    }
    return this.nextWaypoint();
  }

  nextWaypoint() {
    if (this.index >= this.path.length) return null;
    const node = this.path[this.index];
    return {
      x: node.c * this.tilemap.tileSize + this.tilemap.tileSize / 2,
      y: node.r * this.tilemap.tileSize + this.tilemap.tileSize / 2,
    };
  }

  advance() {
    this.index += 1;
  }
}
