/**
 * Party system — up to five players share experience and can see each other
 * on the minimap across the same realm.
 */
export class Party {
  constructor(leader) {
    this.leader = leader;
    this.members = [leader];
    this.maxSize = 5;
    this.lootRule = "round-robin";
    this.lootIndex = 0;
  }

  invite(player) {
    if (this.members.length >= this.maxSize) return false;
    if (this.members.includes(player)) return false;
    this.members.push(player);
    return true;
  }

  leave(player) {
    this.members = this.members.filter((m) => m !== player);
    if (player === this.leader && this.members.length) {
      this.leader = this.members[0];
    }
  }

  shareXp(amount) {
    const split = Math.ceil(amount / this.members.length);
    for (const m of this.members) if (m.gainXp) m.gainXp(split);
  }

  rollLoot() {
    if (this.lootRule === "round-robin") {
      const m = this.members[this.lootIndex % this.members.length];
      this.lootIndex += 1;
      return m;
    }
    return this.members[Math.floor(Math.random() * this.members.length)];
  }
}
