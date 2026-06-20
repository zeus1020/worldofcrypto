import { Renderer } from "./renderer.js";
import { Camera } from "./camera.js";
import { GameLoop } from "./loop.js";
import { AssetLoader } from "./assetLoader.js";

/**
 * The core engine ties together rendering, camera, the main loop,
 * and asset loading. Game-specific logic is registered through scenes.
 */
export class Engine {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas);
    this.camera = new Camera(canvas.width, canvas.height);
    this.assets = new AssetLoader();
    this.loop = new GameLoop(
      (dt) => this.update(dt),
      () => this.render()
    );
    this.scene = null;
  }

  setScene(scene) {
    this.scene = scene;
    if (scene.onEnter) scene.onEnter(this);
  }

  async preload(manifest) {
    return this.assets.loadManifest(manifest);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }

  update(dt) {
    if (this.scene && this.scene.update) this.scene.update(dt, this);
    this.camera.update(dt);
  }

  render() {
    this.renderer.clear();
    this.renderer.withCamera(this.camera, () => {
      if (this.scene && this.scene.render) this.scene.render(this.renderer);
    });
  }
}
