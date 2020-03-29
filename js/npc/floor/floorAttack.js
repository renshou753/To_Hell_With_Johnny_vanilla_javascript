import FloorBase from "./floorBase.js";

export default class FloorAttack extends FloorBase {
  constructor() {
    const ENEMY_IMG_SRC = FloorAttack.getImage("floorAttack");
    super(ENEMY_IMG_SRC, 100, 20);
  }

  hitRun(target) {
    if (this.hit) {
      return;
    }
    this.hit = true;
    target.blood -= 1;
  }
  render() {
    this.drawToCanvas();
  }
}
