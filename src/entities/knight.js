import { Hero } from "./hero.js";

/**
 * Knight — a heavily armored frontline fighter.
 * High health and defense, slower movement. Signature ability: Shield Bash.
 */
export class Knight extends Hero {
  constructor(x, y, overrides = {}) {
    super(x, y, {
      kind: "knight",
      size: 30,
      speed: 150,
      hp: 160,
      mana: 60,
      color: "#4a78c4",
      attackCooldown: 0.5,
      ...overrides,
    });
    this.armor = 12;
  }

  takeDamage(amount) {
    super.takeDamage(Math.max(1, amount - this.armor));
  }

  useAbility() {
    if (this.mana < 30) return;
    this.mana -= 30;
    this.shieldActive = true;
    this.shieldTimer = 3;
  }

  update(dt) {
    super.update(dt);
    if (this.shieldTimer > 0) {
      this.shieldTimer -= dt;
      if (this.shieldTimer <= 0) this.shieldActive = false;
    }
  }
}
