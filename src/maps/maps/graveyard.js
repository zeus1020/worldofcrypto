/**
 * The Graveyard — a haunted flatland west of the Meadow. Home to the undead
 * and a mini-boss. Portals back east to the Meadow and down to the Dungeon.
 */
function fill(width, height, value) {
  return new Array(width * height).fill(value);
}

const W = 44;
const H = 32;

const solid = fill(W, H, 0);
for (let c = 0; c < W; c++) {
  solid[c] = 1;
  solid[(H - 1) * W + c] = 1;
}
for (let r = 0; r < H; r++) {
  solid[r * W] = 1;
  solid[r * W + (W - 1)] = 1;
}

export const graveyard = {
  name: "Hollow Graveyard",
  width: W,
  height: H,
  tileSize: 32,
  ground: fill(W, H, 2),
  solid,
  spawns: [
    { kind: "enemy", type: "skeleton", x: 300, y: 300 },
    { kind: "enemy", type: "skeleton", x: 500, y: 420 },
    { kind: "enemy", type: "ghoul", x: 760, y: 360 },
    { kind: "boss", type: "lich", x: 1000, y: 500 },
  ],
  portals: [
    { to: "meadow", x: 40, y: 480, radius: 40 },
    { to: "dungeon", x: 1300, y: 900, radius: 40 },
  ],
};
