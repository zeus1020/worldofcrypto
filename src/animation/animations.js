/**
 * Animation definitions for every hero class.
 *
 * Each entry describes the frame indices and per-frame timing for a given
 * state and facing direction. Frame indices map into that class's sprite
 * sheet (see assets/sprites/<class>.png once art is added).
 */

const dirs = (frames, frameTime, base = 0, stride = 4) => ({
  down: { frames: frames.map((f) => base + f), frameTime },
  left: { frames: frames.map((f) => base + stride + f), frameTime },
  right: { frames: frames.map((f) => base + stride * 2 + f), frameTime },
  up: { frames: frames.map((f) => base + stride * 3 + f), frameTime },
});

function buildSet() {
  return {
    idle: dirs([0], 0.4, 0),
    walk: dirs([0, 1, 2, 3], 0.12, 16),
    attack: dirs([0, 1, 2], 0.08, 32),
  };
}

export const HERO_ANIMATIONS = {
  knight: buildSet(),
  rogue: buildSet(),
  mage: buildSet(),
  demohunter: buildSet(),
};

export const ENEMY_ANIMATIONS = {
  default: buildSet(),
};
