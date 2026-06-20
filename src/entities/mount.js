import { Entity } from "./entity.js";

/**
 * A rideable mount. While mounted, the hero inherits the mount's speed bonus.
 */
export class Mount extends Entity {
  constructor(x, y, config = {}) {
    super(x, y, { size: 36, speed: 0, hp: 1, ...config });
    this.name = config.name ?? "Dread Wolf";
    this.speedBonus = config.speedBonus ?? 1.6;
    this.rider = null;
    this.color = config.color ?? "#5a5060";
  }

  mount(hero) {
    this.rider = hero;
    hero.baseSpeed = hero.speed;
    hero.speed *= this.speedBonus;
    hero.mounted = true;
  }

  dismount() {
    if (this.rider) {
      this.rider.speed = this.rider.baseSpeed ?? this.rider.speed;
      this.rider.mounted = false;
      this.rider = null;
    }
  }

  update() {
    if (this.rider) {
      this.x = this.rider.x;
      this.y = this.rider.y;
    }
  }

  render(renderer) {
    if (this.rider) return;
    renderer.ctx.fillStyle = this.color;
    renderer.ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size * 0.7);
  }
}
