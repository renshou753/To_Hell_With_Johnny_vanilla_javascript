import Sprite from "../base/sprite.js";

const ENEMY_WIDTH = window.innerWidth;
const ENEMY_HEIGHT = 16;

export default class Ceiling extends Sprite {
  constructor() {
    const ENEMY_IMG_SRC = Ceiling.getImage("ceiling");
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT);

    this.x = 0;
    this.y = 0;
  }
}
