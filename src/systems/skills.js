/**
 * Per-class active skills with cooldowns and resource costs.
 */
export const SKILLS = {
  knight: [
    { id: "shield_bash", name: "Shield Bash", cost: 30, cooldown: 6, damage: 30 },
    { id: "taunt", name: "Taunt", cost: 15, cooldown: 10, damage: 0 },
  ],
  mage: [
    { id: "fireball", name: "Fireball", cost: 20, cooldown: 1.5, damage: 40 },
    { id: "frost_nova", name: "Frost Nova", cost: 40, cooldown: 8, damage: 25 },
  ],
  rogue: [
    { id: "dash_strike", name: "Dash Strike", cost: 25, cooldown: 5, damage: 45 },
    { id: "smoke_bomb", name: "Smoke Bomb", cost: 30, cooldown: 14, damage: 0 },
  ],
  demohunter: [
    { id: "fel_rush", name: "Fel Rush", cost: 0, cooldown: 4, damage: 20 },
    { id: "eye_beam", name: "Eye Beam", cost: 50, cooldown: 12, damage: 80 },
  ],
};

export class SkillBar {
  constructor(kind) {
    this.skills = (SKILLS[kind] || []).map((s) => ({ ...s, ready: 0 }));
  }

  update(dt) {
    for (const s of this.skills) if (s.ready > 0) s.ready -= dt;
  }

  cast(id, hero) {
    const s = this.skills.find((x) => x.id === id);
    if (!s || s.ready > 0 || hero.mana < s.cost) return false;
    hero.mana -= s.cost;
    s.ready = s.cooldown;
    return true;
  }
}
