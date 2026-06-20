/**
 * Localization strings. English is the source language; add more locales by
 * extending this map.
 */
export const LOCALES = {
  en: {
    play: "Play",
    settings: "Settings",
    choose_class: "Choose your class",
    level_up: "Level Up!",
    you_died: "You have fallen...",
    respawn: "Respawn",
    knight: "Knight",
    rogue: "Rogue",
    mage: "Mage",
    demohunter: "Demon Hunter",
  },
};

let current = "en";

export function setLocale(code) {
  if (LOCALES[code]) current = code;
}

export function t(key) {
  return LOCALES[current]?.[key] ?? key;
}
