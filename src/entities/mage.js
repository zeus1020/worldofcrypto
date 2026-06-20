import { Hero } from "./hero.js";

/**
 * Mage — a ranged spellcaster.
 * Fragile but deals heavy elemental damage from afar. Signature ability: Fireball.
 */
export class Mage extends Hero {
  constructor(x, y, overrides = {}) {
    super(x, y, {
      kind: "mage",
      size: 26,
      speed: 150,
      hp: 75,
      mana: 160,
      color: "#7a3fb8",
      attackCooldown: 0.6,
      ...overrides,
    });
    this.projectiles = [];
  }

  attack() {
    super.attack();
    this.castFireball();
  }

  castFireball() {
    const dir = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[this.facing];
    this.projectiles.push({
      x: this.x,
      y: this.y,
      vx: dir[0] * 260,
      vy: dir[1] * 260,
      life: 1.2,
      damage: 25,
    });
  }

  useAbility() {
    if (this.mana < 40) return;
    this.mana -= 40;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
      this.projectiles.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(a) * 200,
        vy: Math.sin(a) * 200,
        life: 1,
        damage: 18,
      });
    }
  }

  update(dt) {
    super.update(dt);
    for (const p of this.projectiles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
    }
    this.projectiles = this.projectiles.filter((p) => p.life > 0);
  }

  render(renderer) {
    for (const p of this.projectiles) {
      renderer.circle(p.x, p.y, 5, "rgba(200, 120, 255, 0.85)");
    }
    super.render(renderer);
  }
}
