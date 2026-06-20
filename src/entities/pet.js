import { Entity } from "./entity.js";

/**
 * A companion pet that follows its owner and assists in combat.
 */
export class Pet extends Entity {
  constructor(owner, config = {}) {
    super(owner.x, owner.y, { size: 16, speed: 200, hp: 50, ...config });
    this.owner = owner;
    this.name = config.name ?? "Companion";
    this.followDistance = 50;
    this.attackTimer = 0;
  }

  update(dt, game) {
    const dx = this.owner.x - this.x;
    const dy = this.owner.y - this.y;
    const dist = Math.hypot(dx, dy) || 1;
    if (dist > this.followDistance) {
      this.moveBy((dx / dist) * this.speed * dt, (dy / dist) * this.speed * dt, game?.world);
    }

    this.attackTimer -= dt;
    const target = this.nearestEnemy(game);
    if (target && this.attackTimer <= 0) {
      target.takeDamage(8);
      this.attackTimer = 1;
    }
  }

  nearestEnemy(game) {
    if (!game) return null;
    let best = null;
    let bestDist = 160;
    for (const e of game.entities) {
      if (e.goldReward === undefined) continue;
      const d = Math.hypot(e.x - this.x, e.y - this.y);
      if (d < bestDist) {
        best = e;
        bestDist = d;
      }
    }
    return best;
  }

  render(renderer) {
    renderer.circle(this.x, this.y, this.size / 2, "#e0a060");
  }
}
