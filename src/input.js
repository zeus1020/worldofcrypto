export class InputHandler {
  constructor() {
    this.keys = new Set();
    window.addEventListener("keydown", (e) => this.keys.add(e.key.toLowerCase()));
    window.addEventListener("keyup", (e) => this.keys.delete(e.key.toLowerCase()));
  }

  isDown(...codes) {
    return codes.some((c) => this.keys.has(c));
  }

  get up() {
    return this.isDown("w", "arrowup");
  }
  get down() {
    return this.isDown("s", "arrowdown");
  }
  get left() {
    return this.isDown("a", "arrowleft");
  }
  get right() {
    return this.isDown("d", "arrowright");
  }
  get attack() {
    return this.isDown(" ");
  }
  get interact() {
    return this.isDown("e");
  }
}
