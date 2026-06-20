/**
 * Pooled 2D particle system for hit sparks, spell trails and ambient motes.
 */
export class ParticleSystem {
  constructor(max = 500) {
    this.pool = [];
    this.max = max;
  }

  emit(x, y, config = {}) {
    const count = config.count ?? 12;
    for (let i = 0; i < count && this.pool.length < this.max; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (config.speed ?? 80) * (0.4 + Math.random() * 0.6);
      this.pool.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: config.life ?? 0.6,
        maxLife: config.life ?? 0.6,
        size: config.size ?? 3,
        color: config.color ?? "#ffcc66",
      });
    }
  }

  update(dt) {
    for (const p of this.pool) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 60 * dt;
      p.life -= dt;
    }
    this.pool = this.pool.filter((p) => p.life > 0);
  }

  render(ctx) {
    for (const p of this.pool) {
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
    ctx.globalAlpha = 1;
  }
}
