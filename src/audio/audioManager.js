/**
 * Web Audio manager handling music, ambient loops and one-shot SFX with
 * independent volume buses.
 */
export class AudioManager {
  constructor() {
    this.ctx = null;
    this.buffers = new Map();
    this.volumes = { master: 1, music: 0.6, sfx: 0.8 };
    this.music = null;
  }

  init() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  async load(key, url) {
    this.init();
    const res = await fetch(url);
    const data = await res.arrayBuffer();
    this.buffers.set(key, await this.ctx.decodeAudioData(data));
  }

  play(key, { loop = false, bus = "sfx" } = {}) {
    const buffer = this.buffers.get(key);
    if (!buffer) return null;
    const src = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    src.buffer = buffer;
    src.loop = loop;
    gain.gain.value = this.volumes.master * (this.volumes[bus] ?? 1);
    src.connect(gain).connect(this.ctx.destination);
    src.start();
    return src;
  }

  setVolume(bus, value) {
    this.volumes[bus] = Math.max(0, Math.min(1, value));
  }
}
