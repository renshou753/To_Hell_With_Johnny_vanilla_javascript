import FloorBase from "./floorBase.js";

export default class FloorBounce extends FloorBase {
  constructor() {
    const ENEMY_IMG_SRC = FloorBounce.getImage("floorBounce");
    super(ENEMY_IMG_SRC, 100, 20);
  }

  hitRun(target) {
    this.ctrlIndex = 0;
    target.y -= 15;
    target.speed = -4;
    target.isJump = true;
  }
  render() {
    this.ctrlIndex += 1;
    if (this.ctrlIndex <= 10) {
      this.drawToCanvas(100, 0);
    } else if (this.ctrlIndex === 40) {
      this.drawToCanvas(0, 0);
    } else {
      this.drawToCanvas(0, 0);
    }
  }
}
