/**
 * Loads rigged 3D character models (glTF/GLB) and caches them by key.
 * Clones are returned so multiple entities can share one downloaded asset.
 */
export class ModelLoader {
  constructor(gltfLoader) {
    this.loader = gltfLoader;
    this.cache = new Map();
  }

  async load(key, url) {
    if (this.cache.has(key)) return this.cache.get(key);
    const gltf = await this.loader.loadAsync(url);
    const entry = { scene: gltf.scene, animations: gltf.animations };
    this.cache.set(key, entry);
    return entry;
  }

  /** Returns a fresh clone of a cached model plus its animation clips. */
  instance(key) {
    const entry = this.cache.get(key);
    if (!entry) throw new Error(`Model not loaded: ${key}`);
    return {
      object: entry.scene.clone(true),
      animations: entry.animations,
    };
  }
}

export const HERO_MODELS = {
  knight: "assets/models/knight.glb",
  rogue: "assets/models/rogue.glb",
  mage: "assets/models/mage.glb",
  demohunter: "assets/models/demohunter.glb",
};
