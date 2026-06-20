/**
 * Sliding-window rate limiter used per WebSocket client and per REST IP.
 */
class RateLimiter {
  constructor(maxEvents, windowMs) {
    this.maxEvents = maxEvents;
    this.windowMs = windowMs;
    this.events = [];
  }

  allow() {
    const now = Date.now();
    this.events = this.events.filter((t) => now - t < this.windowMs);
    if (this.events.length >= this.maxEvents) return false;
    this.events.push(now);
    return true;
  }
}

module.exports = { RateLimiter };
