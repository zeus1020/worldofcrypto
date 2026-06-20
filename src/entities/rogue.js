import { Hero } from "./hero.js";

/**
 * Rogue — a fast, agile melee striker.
 * Low health but high speed and burst damage. Signature ability: Dash Strike.
 */
export class Rogue extends Hero {
  constructor(x, y, overrides = {}) {
    super(x, y, {
      kind: "rogue",
      size: 26,
      speed: 220,
      hp: 90,
      mana: 80,
      color: "#3fae6a",
      attackCooldown: 0.25,
      ...overrides,
    });
    this.critChance = 0.25;
  }

  attack() {
    super.attack();
    this.lastCrit = Math.random() < this.critChance;
  }

  useAbility() {
    if (this.mana < 25) return;
    this.mana -= 25;
    const dir = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[this.facing];
    this.moveBy(dir[0] * 120, dir[1] * 120, this.world);
  }
}
