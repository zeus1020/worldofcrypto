/**
 * Player-to-player trading with a two-sided lock-and-confirm flow to prevent
 * scams: both parties must lock their offer, then both must confirm.
 */
export class Trade {
  constructor(a, b) {
    this.a = { player: a, items: [], gold: 0, locked: false, confirmed: false };
    this.b = { player: b, items: [], gold: 0, locked: false, confirmed: false };
    this.status = "open";
  }

  side(player) {
    return this.a.player === player ? this.a : this.b;
  }

  setOffer(player, items, gold) {
    if (this.status !== "open") return;
    const side = this.side(player);
    if (side.locked) return;
    side.items = items;
    side.gold = gold;
    this.a.confirmed = this.b.confirmed = false;
  }

  lock(player) {
    this.side(player).locked = true;
  }

  confirm(player) {
    const side = this.side(player);
    if (!side.locked) return;
    side.confirmed = true;
    if (this.a.confirmed && this.b.confirmed) this.status = "completed";
  }

  cancel() {
    this.status = "cancelled";
  }
}
