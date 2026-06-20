/**
 * A RealmServer manages the live player population for a single region.
 * It keeps an authoritative snapshot and broadcasts it on a fixed tick.
 */
class RealmServer {
  constructor(config) {
    this.id = config.id;
    this.label = config.label;
    this.tickRate = config.tickRate ?? 20;
    this.maxPlayers = config.maxPlayers ?? 200;
    this.players = new Map();
  }

  join(playerId, initial) {
    if (this.players.size >= this.maxPlayers) {
      return { ok: false, reason: "region_full" };
    }
    this.players.set(playerId, { id: playerId, ...initial });
    return { ok: true };
  }

  leave(playerId) {
    this.players.delete(playerId);
  }

  setState(playerId, state) {
    const p = this.players.get(playerId);
    if (p) Object.assign(p, state);
  }

  snapshot() {
    return { type: "snapshot", players: [...this.players.values()] };
  }

  get population() {
    return this.players.size;
  }
}

module.exports = { RealmServer };
