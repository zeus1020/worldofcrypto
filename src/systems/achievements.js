/**
 * Achievement definitions and an unlock tracker.
 */
export const ACHIEVEMENTS = [
  { id: "first_blood", name: "First Blood", desc: "Defeat your first enemy.", points: 10 },
  { id: "level_10", name: "Seasoned", desc: "Reach level 10.", points: 25 },
  { id: "gold_hoarder", name: "Gold Hoarder", desc: "Hold 10,000 gold.", points: 30 },
  { id: "boss_slayer", name: "Boss Slayer", desc: "Defeat a world boss.", points: 50 },
  { id: "explorer", name: "Explorer", desc: "Visit every map.", points: 40 },
  { id: "guild_founder", name: "Guild Founder", desc: "Create a guild.", points: 20 },
];

export class AchievementTracker {
  constructor() {
    this.unlocked = new Set();
  }

  unlock(id) {
    if (this.unlocked.has(id)) return null;
    const def = ACHIEVEMENTS.find((a) => a.id === id);
    if (!def) return null;
    this.unlocked.add(id);
    return def;
  }

  totalPoints() {
    return [...this.unlocked].reduce((sum, id) => {
      const def = ACHIEVEMENTS.find((a) => a.id === id);
      return sum + (def ? def.points : 0);
    }, 0);
  }
}
