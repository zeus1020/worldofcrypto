/**
 * Seedable pseudo-random number generator (Mulberry32) for reproducible
 * world generation and loot rolls.
 */
export class RNG {
  constructor(seed = Date.now()) {
    this.state = seed >>> 0;
  }

  next() {
    this.state |= 0;
    this.state = (this.state + 0x6d2b79f5) | 0;
    let t = Math.imul(this.state ^ (this.state >>> 15), 1 | this.state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  range(min, max) {
    return min + this.next() * (max - min);
  }

  int(min, max) {
    return Math.floor(this.range(min, max + 1));
  }

  pick(arr) {
    return arr[Math.floor(this.next() * arr.length)];
  }
}
