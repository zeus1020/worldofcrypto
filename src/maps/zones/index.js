import { valy } from "./valy.js";
import { desertColosseum } from "./desertColosseum.js";
import { emeraldHighlands } from "./emeraldHighlands.js";
import { frostspireMountains } from "./frostspireMountains.js";
import { obsidianWastes } from "./obsidianWastes.js";
import { shadowfenMoor } from "./shadowfenMoor.js";
import { abyssalRuins } from "./abyssalRuins.js";
import { bloodstoneCoast } from "./bloodstoneCoast.js";
import { tempestIsles } from "./tempestIsles.js";
import { eternalBastion } from "./eternalBastion.js";

/**
 * The ten zones of the Zarathor continent, ordered by progression.
 */
export const ZARATHOR_ZONES = {
  valy,
  desert_colosseum: desertColosseum,
  emerald_highlands: emeraldHighlands,
  frostspire_mountains: frostspireMountains,
  obsidian_wastes: obsidianWastes,
  shadowfen_moor: shadowfenMoor,
  abyssal_ruins: abyssalRuins,
  bloodstone_coast: bloodstoneCoast,
  tempest_isles: tempestIsles,
  eternal_bastion: eternalBastion,
};

/** Progression order of the continent's zones, by id. */
export const ZONE_ORDER = [
  "valy",
  "desert_colosseum",
  "emerald_highlands",
  "frostspire_mountains",
  "obsidian_wastes",
  "shadowfen_moor",
  "abyssal_ruins",
  "bloodstone_coast",
  "tempest_isles",
  "eternal_bastion",
];
