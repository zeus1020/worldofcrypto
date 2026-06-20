import { Entity } from "./entity.js";
import { Animator } from "../animation/animator.js";
import { HERO_ANIMATIONS } from "../animation/animations.js";

/**
 * Shared base for all four playable hero classes:
 * Knight, Rogue, Mage and Demon Hunter.
 *
 * Subclasses set their own stats, color palette and special ability.
 */
export class Hero extends Entity {
  constructor(x, y, config = {}) {
    super(x, y, config);
    this.kind = config.kind ?? "knight";
    this.level = config.level ?? 1;
    this.xp = 0;
    this.gold = config.gold ?? 0;
    this.mana = config.mana ?? 100;
    this.maxMana = config.mana ?? 100;
    this.color = config.color ?? "#3b6fc9";
    this.attacking = false;
    this.attackTimer = 0;
    this.attackCooldown = config.attackCooldown ?? 0.4;
    this.animator = new Animator(HERO_ANIMATIONS[this.kind] ?? HERO_ANIMATIONS.knight);
  }

  handleInput(input, world) {
    let dx = 0;
    let dy = 0;
    if (input.up) dy = -1;
    if (input.down) dy = 1;
    if (input.left) dx = -1;
    if (input.right) dx = 1;

    if (dx !== 0 && dy !== 0) {
      dx *= 0.707;
      dy *= 0.707;
    }

    if (dy < 0) this.facing = "up";
    else if (dy > 0) this.facing = "down";
    else if (dx < 0) this.facing = "left";
    else if (dx > 0) this.facing = "right";

    this.state = dx !== 0 || dy !== 0 ? "walk" : "idle";
    this.pendingMove = { dx, dy };
    this.world = world;

    if (input.attack && this.attackTimer <= 0) this.attack();
  }

  attack() {
    this.attacking = true;
    this.attackTimer = this.attackCooldown;
    this.state = "attack";
  }

  /** Overridden by each subclass — the class signature ability. */
  useAbility() {}

  gainXp(amount) {
    this.xp += amount;
    const needed = this.level * 100;
    if (this.xp >= needed) {
      this.xp -= needed;
      this.level += 1;
      this.maxHp += 10;
      this.hp = this.maxHp;
    }
  }

  update(dt) {
    const m = this.pendingMove;
    if (m) this.moveBy(m.dx * this.speed * dt, m.dy * this.speed * dt, this.world);

    if (this.attackTimer > 0) {
      this.attackTimer -= dt;
      if (this.attackTimer <= 0) this.attacking = false;
    }

    this.animator.setState(this.state, this.facing);
    this.animator.update(dt);
  }

  render(renderer) {
    const ctx = renderer.ctx;
    ctx.save();
    ctx.translate(this.x, this.y);

    this.animator.drawPlaceholder(ctx, this.size, this.color);

    if (this.attacking) {
      ctx.strokeStyle = "#ffe066";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }
}
