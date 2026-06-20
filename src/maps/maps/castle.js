/**
 * Ironhold Castle — the contested keep where the world boss resides.
 * Stone corridors and a great hall.
 */
function fill(width, height, value) {
  return new Array(width * height).fill(value);
}

const W = 36;
const H = 36;

const solid = fill(W, H, 0);
for (let c = 0; c < W; c++) {
  solid[c] = 1;
  solid[(H - 1) * W + c] = 1;
}
for (let r = 0; r < H; r++) {
  solid[r * W] = 1;
  solid[r * W + (W - 1)] = 1;
}
for (let r = 8; r < 28; r++) {
  if (r !== 18) solid[r * W + 18] = 1;
}

export const castle = {
  name: "Ironhold Castle",
  width: W,
  height: H,
  tileSize: 32,
  ground: fill(W, H, 3),
  solid,
  spawns: [
    { kind: "enemy", type: "guard", x: 300, y: 300 },
    { kind: "enemy", type: "guard", x: 500, y: 300 },
    { kind: "boss", type: "warlord", x: 560, y: 900 },
  ],
  portals: [{ to: "meadow", x: 560, y: 60, radius: 40 }],
};
