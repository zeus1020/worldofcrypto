import { Entity } from "./entity.js";

/**
 * Hostile creature that chases and attacks the nearest hero.
 */
export class Enemy extends Entity {
  constructor(x, y, config = {}) {
    super(x, y, {
      size: 24,
      speed: 70,
      hp: 40,
      ...config,
    });
    this.aggroRange = config.aggroRange ?? 220;
    this.damage = config.damage ?? 10;
    this.goldReward = config.goldReward ?? 5;
    this.xpReward = config.xpReward ?? 20;
  }

  update(dt, game) {
    const hero = game?.hero;
    if (!hero) return;

    const dx = hero.x - this.x;
    const dy = hero.y - this.y;
    const dist = Math.hypot(dx, dy) || 1;

    if (dist < this.aggroRange) {
      this.moveBy((dx / dist) * this.speed * dt, (dy / dist) * this.speed * dt, game.world);
      this.state = "walk";
    } else {
      this.state = "idle";
    }

    if (hero.attacking && dist < hero.size + this.size) {
      this.takeDamage(60 * dt);
      if (!this.alive) {
        hero.gold += this.goldReward;
        hero.gainXp(this.xpReward);
        this.respawn(game);
      }
    }
  }

  respawn(game) {
    this.x = 60 + Math.random() * (game.world.width - 120);
    this.y = 60 + Math.random() * (game.world.height - 120);
    this.hp = this.maxHp;
    this.alive = true;
  }

  render(renderer) {
    const ctx = renderer.ctx;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = "#b23a3a";
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.fillStyle = "#000";
    ctx.fillRect(-this.size / 2, -this.size / 2 - 7, this.size, 4);
    ctx.fillStyle = "#5fd35f";
    ctx.fillRect(-this.size / 2, -this.size / 2 - 7, this.size * (this.hp / this.maxHp), 4);
    ctx.restore();
  }
}
