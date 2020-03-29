import FloorBase from "./floorBase.js";

export default class FloorLeft extends FloorBase {
  constructor() {
    const ENEMY_IMG_SRC = FloorLeft.getImage("floorLeft");
    super(ENEMY_IMG_SRC, 100, 20);
  }

  hitRun(target) {
    target.x -= 2;
    if (this.hit) {
      return;
    }
    this.hit = true;
  }
  render() {
    this.drawToCanvas(100, 0);
  }
}
