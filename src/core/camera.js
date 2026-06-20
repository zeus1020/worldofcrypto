/**
 * A smooth-follow camera that keeps a target centered within the viewport
 * while clamping to the world bounds.
 */
export class Camera {
  constructor(viewW, viewH) {
    this.x = 0;
    this.y = 0;
    this.viewW = viewW;
    this.viewH = viewH;
    this.target = null;
    this.lerp = 0.12;
    this.worldW = Infinity;
    this.worldH = Infinity;
  }

  follow(target) {
    this.target = target;
  }

  setBounds(worldW, worldH) {
    this.worldW = worldW;
    this.worldH = worldH;
  }

  update() {
    if (!this.target) return;
    const desiredX = this.target.x - this.viewW / 2;
    const desiredY = this.target.y - this.viewH / 2;
    this.x += (desiredX - this.x) * this.lerp;
    this.y += (desiredY - this.y) * this.lerp;
    this.x = Math.max(0, Math.min(this.x, this.worldW - this.viewW));
    this.y = Math.max(0, Math.min(this.y, this.worldH - this.viewH));
  }
}
