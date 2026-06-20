/**
 * Loads and caches images (and other assets) declared in a manifest so the
 * rest of the engine can fetch them synchronously by key.
 */
export class AssetLoader {
  constructor() {
    this.images = new Map();
    this.progress = 0;
  }

  loadImage(key, url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.images.set(key, img);
        resolve(img);
      };
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  }

  async loadManifest(manifest) {
    const entries = Object.entries(manifest.images || {});
    let done = 0;
    for (const [key, url] of entries) {
      await this.loadImage(key, url);
      done += 1;
      this.progress = done / entries.length;
    }
    return this;
  }

  image(key) {
    return this.images.get(key) || null;
  }
}
