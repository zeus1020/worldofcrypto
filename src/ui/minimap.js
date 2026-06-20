/**
 * Circular proximity minimap rendered to a small overlay canvas.
 */
export class Minimap {
  constructor(radius = 70, range = 600) {
    this.radius = radius;
    this.range = range;
  }

  render(ctx, hero, entities) {
    const cx = this.radius + 12;
    const cy = this.radius + 12;

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(10, 8, 16, 0.7)";
    ctx.fill();
    ctx.strokeStyle = "#c9a227";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.clip();

    for (const e of entities) {
      const dx = (e.x - hero.x) / this.range * this.radius;
      const dy = (e.y - hero.y) / this.range * this.radius;
      if (Math.hypot(dx, dy) > this.radius) continue;
      ctx.fillStyle = e.kind ? "#5fd35f" : "#b23a3a";
      ctx.fillRect(cx + dx - 2, cy + dy - 2, 4, 4);
    }

    ctx.fillStyle = "#ffe066";
    ctx.fillRect(cx - 2, cy - 2, 4, 4);
    ctx.restore();
  }
}
