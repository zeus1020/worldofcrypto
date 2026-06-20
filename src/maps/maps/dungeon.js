/**
 * The Sunless Dungeon — a procedurally-themed underground crawl beneath the
 * Graveyard. Tight corridors, traps and rich loot.
 */
function fill(width, height, value) {
  return new Array(width * height).fill(value);
}

const W = 48;
const H = 48;

const ground = fill(W, H, 4);
const solid = fill(W, H, 1);

// carve a simple set of rooms + corridors
function carveRoom(cx, cy, w, h) {
  for (let r = cy; r < cy + h; r++) {
    for (let c = cx; c < cx + w; c++) {
      if (r > 0 && c > 0 && r < H - 1 && c < W - 1) solid[r * W + c] = 0;
    }
  }
}
carveRoom(4, 4, 10, 8);
carveRoom(30, 6, 12, 10);
carveRoom(18, 28, 14, 12);
for (let c = 13; c < 31; c++) solid[8 * W + c] = 0;
for (let r = 11; r < 30; r++) solid[r * W + 24] = 0;

export const dungeon = {
  name: "Sunless Dungeon",
  width: W,
  height: H,
  tileSize: 32,
  ground,
  solid,
  spawns: [
    { kind: "enemy", type: "imp", x: 200, y: 200 },
    { kind: "enemy", type: "imp", x: 1000, y: 300 },
    { kind: "boss", type: "demon", x: 760, y: 980 },
  ],
  portals: [{ to: "graveyard", x: 160, y: 160, radius: 40 }],
};
