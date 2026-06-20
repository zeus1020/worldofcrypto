/**
 * Base class for every living thing in the world.
 * Handles position, movement, health and the shared animation state machine.
 */
export class Entity {
  constructor(x, y, config = {}) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.size = config.size ?? 28;
    this.speed = config.speed ?? 160;
    this.hp = config.hp ?? 100;
    this.maxHp = config.hp ?? 100;
    this.facing = "down";
    this.state = "idle";
    this.alive = true;
  }

  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
    if (this.hp === 0) this.alive = false;
  }

  moveBy(dx, dy, world) {
    if (!world || !world.isSolid(this.x + dx, this.y)) this.x += dx;
    if (!world || !world.isSolid(this.x, this.y + dy)) this.y += dy;
  }

  update() {}
  render() {}
}
