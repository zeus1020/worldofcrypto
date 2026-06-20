/**
 * Thin wrapper around the 2D canvas context with camera-aware drawing.
 */
export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
  }

  clear() {
    this.ctx.fillStyle = "#15101d";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  withCamera(camera, draw) {
    this.ctx.save();
    this.ctx.translate(-camera.x, -camera.y);
    draw();
    this.ctx.restore();
  }

  sprite(image, sx, sy, sw, sh, dx, dy, dw, dh) {
    this.ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  rect(x, y, w, h, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }

  circle(x, y, r, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.fill();
  }

  text(str, x, y, color = "#fff", font = "14px sans-serif") {
    this.ctx.fillStyle = color;
    this.ctx.font = font;
    this.ctx.fillText(str, x, y);
  }
}
