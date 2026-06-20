/**
 * Class-selection menu shown before entering the world.
 *
 * Each hero choice carries a painted splash portrait that is shown on its card
 * and on the in-game character sheet.
 */
export const HERO_CHOICES = [
  {
    kind: "knight",
    name: "Knight",
    role: "Tank",
    blurb: "Armored frontline tank.",
    portrait: "assets/images/heroes/knight.png",
  },
  {
    kind: "rogue",
    name: "Rogue",
    role: "Melee DPS",
    blurb: "Fast, deadly melee striker.",
    portrait: "assets/images/heroes/rogue.png",
  },
  {
    kind: "mage",
    name: "Mage",
    role: "Ranged DPS",
    blurb: "Ranged elemental spellcaster.",
    portrait: "assets/images/heroes/mage.png",
  },
  {
    kind: "demohunter",
    name: "Demon Hunter",
    role: "Hybrid DPS",
    blurb: "Agile glaive-throwing hybrid.",
    portrait: "assets/images/heroes/demohunter.png",
  },
];

export function buildClassMenu(container, onSelect) {
  container.innerHTML = "";
  for (const choice of HERO_CHOICES) {
    const card = document.createElement("button");
    card.className = "class-card";
    card.innerHTML = `
      <span class="class-portrait" style="background-image:url('${choice.portrait}')"></span>
      <span class="class-meta">
        <strong>${choice.name}</strong>
        <em class="class-role">${choice.role}</em>
        <span class="class-blurb">${choice.blurb}</span>
      </span>`;
    card.addEventListener("click", () => onSelect(choice.kind));
    container.appendChild(card);
  }
}
