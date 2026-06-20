/**
 * Crafting system. Recipes turn ingredient items into a result item.
 */
export const RECIPES = [
  { id: "iron_sword", ingredients: { iron_ore: 3, wood: 1 }, result: { id: "iron_sword", qty: 1 } },
  { id: "health_potion", ingredients: { herb: 2, water_flask: 1 }, result: { id: "health_potion", qty: 1 } },
  { id: "mana_potion", ingredients: { mana_crystal: 1, water_flask: 1 }, result: { id: "mana_potion", qty: 1 } },
  { id: "steel_armor", ingredients: { steel_ingot: 5, leather: 2 }, result: { id: "steel_armor", qty: 1 } },
];

export function canCraft(recipe, inventory) {
  return Object.entries(recipe.ingredients).every(
    ([id, qty]) => inventory.count(id) >= qty
  );
}

export function craft(recipeId, inventory) {
  const recipe = RECIPES.find((r) => r.id === recipeId);
  if (!recipe || !canCraft(recipe, inventory)) return false;
  for (const [id, qty] of Object.entries(recipe.ingredients)) {
    inventory.remove(id, qty);
  }
  inventory.add({ id: recipe.result.id, stackable: true }, recipe.result.qty);
  return true;
}
