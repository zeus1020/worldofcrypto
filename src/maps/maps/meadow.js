/**
 * The Meadow — the starting hub map. Open grassland with the town to the east
 * and a portal west to the Graveyard.
 */
function fill(width, height, value) {
  return new Array(width * height).fill(value);
}

const W = 40;
const H = 30;

const solid = fill(W, H, 0);
for (let c = 0; c < W; c++) {
  solid[c] = 1;
  solid[(H - 1) * W + c] = 1;
}
for (let r = 0; r < H; r++) {
  solid[r * W] = 1;
  solid[r * W + (W - 1)] = 1;
}

export const meadow = {
  name: "The Meadow",
  width: W,
  height: H,
  tileSize: 32,
  ground: fill(W, H, 1),
  solid,
  spawns: [
    { kind: "npc", name: "Elder Mira", x: 200, y: 160 },
    { kind: "enemy", type: "wolf", x: 700, y: 400 },
    { kind: "enemy", type: "wolf", x: 820, y: 300 },
  ],
  portals: [{ to: "graveyard", x: 40, y: 480, radius: 40 }],
};
