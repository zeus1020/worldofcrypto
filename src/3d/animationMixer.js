/**
 * Per-character 3D animation controller. Cross-fades between named clips
 * (idle, walk, run, attack, cast, death) driven by the entity's state.
 */
export class AnimationMixer3D {
  constructor(mixer, clips) {
    this.mixer = mixer;
    this.actions = {};
    for (const clip of clips) {
      this.actions[clip.name.toLowerCase()] = mixer.clipAction(clip);
    }
    this.current = null;
    this.fade = 0.2;
  }

  play(name) {
    const next = this.actions[name];
    if (!next || next === this.current) return;
    next.reset().fadeIn(this.fade).play();
    if (this.current) this.current.fadeOut(this.fade);
    this.current = next;
  }

  update(dt) {
    this.mixer.update(dt);
  }
}

export const CLIP_FOR_STATE = {
  idle: "idle",
  walk: "walk",
  run: "run",
  attack: "attack",
  cast: "cast",
  dead: "death",
};
