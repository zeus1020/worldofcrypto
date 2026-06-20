/**
 * Dungeon group finder. Queues players by role and forms balanced parties of
 * one tank, one healer and three damage dealers.
 */
const ROLE_OF_CLASS = {
  knight: "tank",
  mage: "dps",
  rogue: "dps",
  demohunter: "dps",
};

class Matchmaker {
  constructor() {
    this.queues = { tank: [], dps: [] };
  }

  enqueue(player) {
    const role = ROLE_OF_CLASS[player.class] || "dps";
    this.queues[role].push(player);
    return this.tryForm();
  }

  tryForm() {
    if (this.queues.tank.length && this.queues.dps.length >= 4) {
      return {
        tank: this.queues.tank.shift(),
        dps: this.queues.dps.splice(0, 4),
      };
    }
    return null;
  }

  size() {
    return this.queues.tank.length + this.queues.dps.length;
  }
}

module.exports = { Matchmaker };
