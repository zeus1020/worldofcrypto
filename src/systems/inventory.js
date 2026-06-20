/**
 * A simple slot-based inventory with stacking support.
 */
export class Inventory {
  constructor(capacity = 24) {
    this.capacity = capacity;
    this.slots = new Array(capacity).fill(null);
  }

  add(item, qty = 1) {
    for (const slot of this.slots) {
      if (slot && slot.id === item.id && item.stackable) {
        slot.qty += qty;
        return true;
      }
    }
    const free = this.slots.findIndex((s) => s === null);
    if (free === -1) return false;
    this.slots[free] = { ...item, qty };
    return true;
  }

  remove(itemId, qty = 1) {
    const idx = this.slots.findIndex((s) => s && s.id === itemId);
    if (idx === -1) return false;
    this.slots[idx].qty -= qty;
    if (this.slots[idx].qty <= 0) this.slots[idx] = null;
    return true;
  }

  count(itemId) {
    return this.slots.reduce((n, s) => (s && s.id === itemId ? n + s.qty : n), 0);
  }
}
