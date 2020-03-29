import FloorBase from "./floorBase.js";

export default class FloorRight extends FloorBase {
  constructor() {
    const ENEMY_IMG_SRC = FloorRight.getImage("floorRight");
    super(ENEMY_IMG_SRC, 100, 20);
  }

  hitRun(target) {
    target.x += 2;
    if (this.hit) {
      return;
    }
    this.hit = true;
  }
  render() {
    this.drawToCanvas(0, 0);
  }
}
