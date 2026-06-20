/**
 * Fixed-timestep game loop with interpolation-friendly rendering.
 */
export class GameLoop {
  constructor(update, render, fps = 60) {
    this.update = update;
    this.render = render;
    this.step = 1 / fps;
    this.accumulator = 0;
    this.lastTime = 0;
    this.running = false;
  }

  start() {
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.tick(t));
  }

  stop() {
    this.running = false;
  }

  tick(time) {
    if (!this.running) return;
    const dt = Math.min((time - this.lastTime) / 1000, 0.25);
    this.lastTime = time;
    this.accumulator += dt;

    while (this.accumulator >= this.step) {
      this.update(this.step);
      this.accumulator -= this.step;
    }

    this.render();
    requestAnimationFrame((t) => this.tick(t));
  }
}
