/**
 * Common math helpers.
 */
export const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

export const lerp = (a, b, t) => a + (b - a) * t;

export const dist = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by);

export const angleBetween = (ax, ay, bx, by) => Math.atan2(by - ay, bx - ax);

export const normalize = (x, y) => {
  const len = Math.hypot(x, y) || 1;
  return { x: x / len, y: y / len };
};

export const deg2rad = (d) => (d * Math.PI) / 180;
export const rad2deg = (r) => (r * 180) / Math.PI;
