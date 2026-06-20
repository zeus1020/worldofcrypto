import { Game } from "./game.js";
import { buildClassMenu } from "./ui/menu.js";

const canvas = document.getElementById("game");
const menu = document.getElementById("class-menu");

function launch(heroClass) {
  if (menu) menu.style.display = "none";
  const game = new Game(canvas, heroClass);
  game.init().then(() => game.start());
}

if (menu) {
  buildClassMenu(menu, launch);
} else {
  launch("knight");
}
