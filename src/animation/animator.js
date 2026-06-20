/**
 * Drives frame-by-frame animation for an entity.
 * Each animation set maps a state ("idle", "walk", "attack") and a facing
 * direction to a list of frames with a per-frame duration.
 */
export class Animator {
  constructor(animationSet) {
    this.animations = animationSet;
    this.state = "idle";
    this.facing = "down";
    this.frame = 0;
    this.timer = 0;
  }

  setState(state, facing) {
    if (state !== this.state || facing !== this.facing) {
      this.state = state;
      this.facing = facing;
      this.frame = 0;
      this.timer = 0;
    }
  }

  current() {
    const byState = this.animations[this.state] || this.animations.idle;
    return byState[this.facing] || byState.down;
  }

  update(dt) {
    const clip = this.current();
    if (!clip || clip.frames.length <= 1) return;
    this.timer += dt;
    if (this.timer >= clip.frameTime) {
      this.timer -= clip.frameTime;
      this.frame = (this.frame + 1) % clip.frames.length;
    }
  }

  /**
   * Placeholder renderer used until sprite sheets are wired in.
   * Draws a body that subtly bobs based on the active animation frame.
   */
  drawPlaceholder(ctx, size, color) {
    const bob = this.state === "walk" ? Math.sin(this.frame) * 2 : 0;
    ctx.fillStyle = color;
    ctx.fillRect(-size / 2, -size / 2 + bob, size, size);
    ctx.fillStyle = "#e8d9b5";
    ctx.fillRect(-size / 2, -size / 2 - 8 + bob, size, 8);
  }
}
