/**
 * Weighted loot tables and rarity rolls.
 */
export const RARITIES = ["common", "uncommon", "rare", "epic", "legendary"];

const RARITY_WEIGHTS = {
  common: 60,
  uncommon: 25,
  rare: 10,
  epic: 4,
  legendary: 1,
};

export function rollRarity() {
  const total = Object.values(RARITY_WEIGHTS).reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  for (const r of RARITIES) {
    roll -= RARITY_WEIGHTS[r];
    if (roll <= 0) return r;
  }
  return "common";
}

export function rollLoot(table) {
  const drops = [];
  for (const entry of table) {
    if (Math.random() <= entry.chance) {
      drops.push({ id: entry.id, rarity: rollRarity(), qty: entry.qty ?? 1 });
    }
  }
  return drops;
}
