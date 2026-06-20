/**
 * Talent trees. Each class has a tree of nodes; spending points in a node
 * grants a passive bonus and may unlock deeper nodes.
 */
export const TALENT_TREES = {
  knight: [
    { id: "iron_skin", name: "Iron Skin", maxRank: 5, bonus: { armor: 3 } },
    { id: "vigor", name: "Vigor", maxRank: 5, bonus: { maxHp: 20 }, requires: "iron_skin" },
    { id: "bulwark", name: "Bulwark", maxRank: 1, bonus: { blockChance: 0.15 }, requires: "vigor" },
  ],
  mage: [
    { id: "pyromancy", name: "Pyromancy", maxRank: 5, bonus: { fireDamage: 0.08 } },
    { id: "arcane_mind", name: "Arcane Mind", maxRank: 5, bonus: { maxMana: 20 } },
    { id: "meteor", name: "Meteor", maxRank: 1, bonus: { unlock: "meteor" }, requires: "pyromancy" },
  ],
};

export class TalentBuild {
  constructor(kind) {
    this.kind = kind;
    this.ranks = {};
    this.points = 0;
  }

  canSpend(nodeId) {
    const tree = TALENT_TREES[this.kind] || [];
    const node = tree.find((n) => n.id === nodeId);
    if (!node || this.points <= 0) return false;
    if ((this.ranks[nodeId] || 0) >= node.maxRank) return false;
    if (node.requires && !(this.ranks[node.requires] > 0)) return false;
    return true;
  }

  spend(nodeId) {
    if (!this.canSpend(nodeId)) return false;
    this.ranks[nodeId] = (this.ranks[nodeId] || 0) + 1;
    this.points -= 1;
    return true;
  }
}
