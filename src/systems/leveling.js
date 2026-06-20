/**
 * Experience curve and stat growth per hero level.
 */
export function xpForLevel(level) {
  return Math.floor(100 * Math.pow(level, 1.5));
}

export function statsForLevel(kind, level) {
  const base = {
    knight: { hp: 160, mana: 60, damage: 14 },
    rogue: { hp: 90, mana: 80, damage: 18 },
    mage: { hp: 75, mana: 160, damage: 22 },
    demohunter: { hp: 110, mana: 100, damage: 16 },
  }[kind] || { hp: 100, mana: 100, damage: 12 };

  return {
    hp: base.hp + (level - 1) * 10,
    mana: base.mana + (level - 1) * 5,
    damage: base.damage + (level - 1) * 2,
  };
}
