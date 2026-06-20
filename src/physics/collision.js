/**
 * Axis-aligned collision helpers and a simple spatial hash for broad-phase
 * neighbor queries.
 */
export function aabb(a, b) {
  return (
    a.x - a.size / 2 < b.x + b.size / 2 &&
    a.x + a.size / 2 > b.x - b.size / 2 &&
    a.y - a.size / 2 < b.y + b.size / 2 &&
    a.y + a.size / 2 > b.y - b.size / 2
  );
}

export function circleHit(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y) < (a.size + b.size) / 2;
}

export class SpatialHash {
  constructor(cellSize = 64) {
    this.cellSize = cellSize;
    this.cells = new Map();
  }

  key(x, y) {
    return `${Math.floor(x / this.cellSize)},${Math.floor(y / this.cellSize)}`;
  }

  clear() {
    this.cells.clear();
  }

  insert(entity) {
    const k = this.key(entity.x, entity.y);
    if (!this.cells.has(k)) this.cells.set(k, []);
    this.cells.get(k).push(entity);
  }

  nearby(x, y) {
    const results = [];
    const cx = Math.floor(x / this.cellSize);
    const cy = Math.floor(y / this.cellSize);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const cell = this.cells.get(`${cx + dx},${cy + dy}`);
        if (cell) results.push(...cell);
      }
    }
    return results;
  }
}
