import { Knight } from "./entities/knight.js";
import { Rogue } from "./entities/rogue.js";
import { Mage } from "./entities/mage.js";
import { DemonHunter } from "./entities/demohunter.js";
import { Enemy } from "./entities/enemy.js";
import { NPC } from "./entities/npc.js";
import { World } from "./world.js";
import { InputHandler } from "./input.js";
import { HUD } from "./ui/hud.js";
import { Minimap } from "./ui/minimap.js";
import { saveProgress, loadProgress } from "./api.js";
import { GAME_CONFIG } from "../config/game.config.js";

const HERO_CLASSES = {
  knight: Knight,
  rogue: Rogue,
  mage: Mage,
  demohunter: DemonHunter,
};

export class Game {
  constructor(canvas, heroClass = GAME_CONFIG.defaultClass) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.world = new World(this.width, this.height);
    this.input = new InputHandler();
    this.hud = new HUD();
    this.minimap = new Minimap();
    this.heroClass = heroClass;
    this.entities = [];
    this.lastTime = 0;
    this.saveTimer = 0;
  }

  async init() {
    const saved = await loadProgress();
    const HeroClass = HERO_CLASSES[saved?.class || this.heroClass] || Knight;

    this.hero = new HeroClass(saved?.x ?? 480, saved?.y ?? 270, {
      level: saved?.level ?? 1,
      gold: saved?.gold ?? 0,
    });

    this.entities = [
      this.hero,
      new NPC(160, 120, { name: "Elder Mira", role: "quest", dialogue: ["The realm needs heroes."] }),
      new Enemy(700, 360),
      new Enemy(300, 420),
      new Enemy(560, 180),
    ];
  }

  start() {
    requestAnimationFrame((t) => this.loop(t));
  }

  loop(time) {
    const dt = Math.min((time - this.lastTime) / 1000, 0.05);
    this.lastTime = time;
    this.update(dt);
    this.render();
    requestAnimationFrame((t) => this.loop(t));
  }

  update(dt) {
    this.hero.handleInput(this.input, this.world);
    for (const e of this.entities) e.update(dt, this);
    this.hud.update(this.hero);

    this.saveTimer += dt * 1000;
    if (this.saveTimer >= GAME_CONFIG.autosaveInterval) {
      this.saveTimer = 0;
      this.save();
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.world.render(this.ctx);
    const renderer = { ctx: this.ctx, circle: (x, y, r, c) => { this.ctx.fillStyle = c; this.ctx.beginPath(); this.ctx.arc(x, y, r, 0, Math.PI * 2); this.ctx.fill(); } };
    for (const e of this.entities) e.render(renderer);
    this.minimap.render(this.ctx, this.hero, this.entities.filter((e) => e !== this.hero));
  }

  save() {
    return saveProgress({
      class: this.hero.kind,
      x: this.hero.x,
      y: this.hero.y,
      level: this.hero.level,
      gold: this.hero.gold,
    });
  }
}
