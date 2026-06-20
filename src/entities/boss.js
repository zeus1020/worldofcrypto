import { Enemy } from "./enemy.js";
import { StateMachine } from "../ai/stateMachine.js";

/**
 * Boss enemy with multiple phases and telegraphed special attacks.
 */
export class Boss extends Enemy {
  constructor(x, y, config = {}) {
    super(x, y, {
      size: 48,
      speed: 60,
      hp: 1200,
      damage: 35,
      goldReward: 500,
      xpReward: 1000,
      aggroRange: 600,
      ...config,
    });
    this.name = config.name ?? "World Boss";
    this.phase = 1;
    this.specialTimer = 0;
    this.brain = new StateMachine(
      {
        idle: { update: () => "chase" },
        chase: {
          update: (dt, self, ctx) => {
            if (self.specialTimer <= 0) return "special";
            return null;
          },
        },
        special: {
          enter: (self) => (self.casting = true),
          update: (dt, self) => {
            self.castTime = (self.castTime ?? 0) + dt;
            if (self.castTime > 1.2) {
              self.casting = false;
              self.castTime = 0;
              self.specialTimer = 5;
              return "chase";
            }
            return null;
          },
        },
      },
      "idle"
    );
  }

  update(dt, game) {
    this.specialTimer -= dt;
    if (this.hp < this.maxHp * 0.5 && this.phase === 1) {
      this.phase = 2;
      this.speed *= 1.3;
      this.damage *= 1.4;
    }
    this.brain.update(dt, this, game);
    super.update(dt, game);
  }
}
