import { createLights } from "./lights.js";

/**
 * Wraps a Three.js-style scene graph for the optional 3D world view.
 * The renderer abstraction is engine-agnostic: pass any WebGL backend that
 * implements `add`, `remove` and `render(scene, camera)`.
 */
export class Scene3D {
  constructor(backend) {
    this.backend = backend;
    this.objects = new Map();
    this.lights = createLights();
    this.fog = { color: 0x0e0b14, near: 20, far: 220 };
    for (const light of this.lights) this.backend.add(light);
  }

  add(id, object3d) {
    this.objects.set(id, object3d);
    this.backend.add(object3d);
  }

  remove(id) {
    const obj = this.objects.get(id);
    if (obj) {
      this.backend.remove(obj);
      this.objects.delete(id);
    }
  }

  get(id) {
    return this.objects.get(id);
  }

  render(camera) {
    this.backend.render(this, camera);
  }
}
