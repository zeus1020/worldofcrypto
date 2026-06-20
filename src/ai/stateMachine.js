/**
 * Generic finite state machine used for enemy and NPC behavior
 * (idle → patrol → chase → attack → flee).
 */
export class StateMachine {
  constructor(states, initial) {
    this.states = states;
    this.current = initial;
    this.time = 0;
  }

  transition(to, entity, ctx) {
    if (to === this.current) return;
    const prev = this.states[this.current];
    if (prev && prev.exit) prev.exit(entity, ctx);
    this.current = to;
    this.time = 0;
    const next = this.states[to];
    if (next && next.enter) next.enter(entity, ctx);
  }

  update(dt, entity, ctx) {
    this.time += dt;
    const state = this.states[this.current];
    if (state && state.update) {
      const next = state.update(dt, entity, ctx);
      if (next) this.transition(next, entity, ctx);
    }
  }
}
