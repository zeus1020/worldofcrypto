/**
 * Loads a sprite sheet image and slices it into a grid of frames so the
 * Animator can address frames by index.
 */
export class SpriteSheet {
  constructor(image, frameWidth, frameHeight) {
    this.image = image;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.columns = image ? Math.floor(image.width / frameWidth) : 0;
  }

  frameRect(index) {
    const col = index % this.columns;
    const row = Math.floor(index / this.columns);
    return {
      sx: col * this.frameWidth,
      sy: row * this.frameHeight,
      sw: this.frameWidth,
      sh: this.frameHeight,
    };
  }

  draw(ctx, index, dx, dy, scale = 1) {
    const r = this.frameRect(index);
    ctx.drawImage(
      this.image,
      r.sx,
      r.sy,
      r.sw,
      r.sh,
      dx,
      dy,
      r.sw * scale,
      r.sh * scale
    );
  }
}
