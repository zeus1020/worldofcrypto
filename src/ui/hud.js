/**
 * Heads-up display — keeps the DOM stat bar in sync with the active hero.
 */
export class HUD {
  constructor() {
    this.name = document.getElementById("hero-name");
    this.level = document.getElementById("hero-level");
    this.gold = document.getElementById("hero-gold");
    this.hp = document.getElementById("hero-hp");
  }

  update(hero) {
    if (this.name) this.name.textContent = hero.kind.toUpperCase();
    if (this.level) this.level.textContent = `Lv. ${hero.level}`;
    if (this.gold) this.gold.textContent = `⛀ ${hero.gold}`;
    if (this.hp) this.hp.textContent = `❤ ${Math.round(hero.hp)}`;
  }
}
