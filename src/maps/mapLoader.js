import { Tilemap } from "./tilemap.js";
import { meadow } from "./maps/meadow.js";
import { graveyard } from "./maps/graveyard.js";
import { castle } from "./maps/castle.js";
import { dungeon } from "./maps/dungeon.js";
import { ZARATHOR_ZONES } from "./zones/index.js";

const REGISTRY = {
  meadow,
  graveyard,
  castle,
  dungeon,
  ...ZARATHOR_ZONES,
};

/**
 * Loads map definitions and streams them in/out. Only the active map's
 * geometry and entities are kept resident in memory at any time.
 */
export class MapLoader {
  constructor() {
    this.active = null;
    this.activeId = null;
  }

  load(id) {
    const def = REGISTRY[id];
    if (!def) throw new Error(`Unknown map: ${id}`);
    this.active = new Tilemap(def);
    this.activeId = id;
    return this.active;
  }

  list() {
    return Object.keys(REGISTRY);
  }
}
