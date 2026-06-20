const TILE = 60;

export class World {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cols = Math.ceil(width / TILE);
    this.rows = Math.ceil(height / TILE);
    this.map = this.generate();
  }

  generate() {
    const map = [];
    for (let r = 0; r < this.rows; r++) {
      const row = [];
      for (let c = 0; c < this.cols; c++) {
        const edge = r === 0 || c === 0 || r === this.rows - 1 || c === this.cols - 1;
        row.push(edge ? 1 : 0);
      }
      map.push(row);
    }
    return map;
  }

  isSolid(x, y) {
    const c = Math.floor(x / TILE);
    const r = Math.floor(y / TILE);
    if (r < 0 || c < 0 || r >= this.rows || c >= this.cols) return true;
    return this.map[r][c] === 1;
  }

  render(ctx) {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const solid = this.map[r][c] === 1;
        ctx.fillStyle = solid ? "#2a2233" : (r + c) % 2 === 0 ? "#181220" : "#1c1626";
        ctx.fillRect(c * TILE, r * TILE, TILE, TILE);
      }
    }
  }
}
