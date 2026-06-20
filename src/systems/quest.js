/**
 * Lightweight quest tracker. Quests have objectives that complete when their
 * target count is reached.
 */
export class QuestLog {
  constructor() {
    this.active = [];
    this.completed = [];
  }

  accept(quest) {
    this.active.push({ ...quest, progress: 0 });
  }

  advance(objectiveId, amount = 1) {
    for (const q of this.active) {
      if (q.objectiveId === objectiveId) {
        q.progress += amount;
        if (q.progress >= q.target) this.complete(q);
      }
    }
  }

  complete(quest) {
    this.active = this.active.filter((q) => q !== quest);
    this.completed.push(quest);
    return quest.reward;
  }
}
