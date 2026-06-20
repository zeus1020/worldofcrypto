import { Hero } from "./hero.js";

/**
 * Demon Hunter — an agile hybrid with ranged glaives and demonic mobility.
 * Balanced health, strong sustained damage. Signature ability: Fel Rush.
 */
export class DemonHunter extends Hero {
  constructor(x, y, overrides = {}) {
    super(x, y, {
      kind: "demohunter",
      size: 27,
      speed: 195,
      hp: 110,
      mana: 100,
      color: "#b1543f",
      attackCooldown: 0.35,
      ...overrides,
    });
    this.glaives = [];
    this.fury = 0;
  }

  attack() {
    super.attack();
    const dir = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[this.facing];
    this.glaives.push({
      x: this.x,
      y: this.y,
      vx: dir[0] * 300,
      vy: dir[1] * 300,
      life: 0.8,
      damage: 20,
      spin: 0,
    });
    this.fury = Math.min(100, this.fury + 10);
  }

  useAbility() {
    if (this.fury < 50) return;
    this.fury -= 50;
    const dir = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[this.facing];
    this.moveBy(dir[0] * 160, dir[1] * 160, this.world);
  }

  update(dt) {
    super.update(dt);
    for (const g of this.glaives) {
      g.x += g.vx * dt;
      g.y += g.vy * dt;
      g.life -= dt;
      g.spin += dt * 20;
    }
    this.glaives = this.glaives.filter((g) => g.life > 0);
  }

  render(renderer) {
    const ctx = renderer.ctx;
    for (const g of this.glaives) {
      ctx.save();
      ctx.translate(g.x, g.y);
      ctx.rotate(g.spin);
      ctx.strokeStyle = "#2fd0c0";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 1.4);
      ctx.stroke();
      ctx.restore();
    }
    super.render(renderer);
  }
}
