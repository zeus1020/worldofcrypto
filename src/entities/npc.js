import { Entity } from "./entity.js";

/**
 * Friendly non-player character — quest givers, merchants and townsfolk.
 */
export class NPC extends Entity {
  constructor(x, y, config = {}) {
    super(x, y, { size: 28, speed: 0, hp: 1, ...config });
    this.name = config.name ?? "Villager";
    this.role = config.role ?? "townsfolk";
    this.dialogue = config.dialogue ?? ["Welcome, traveler."];
    this.color = config.color ?? "#caa86a";
  }

  interact(hero) {
    return {
      name: this.name,
      line: this.dialogue[Math.floor(Math.random() * this.dialogue.length)],
    };
  }

  render(renderer) {
    const ctx = renderer.ctx;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.fillStyle = "#ffe066";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("!", 0, -this.size / 2 - 6);
    ctx.restore();
  }
}
