import FloorBase from "./floorBase.js";

export default class FloorIce extends FloorBase {
  constructor() {
    const ENEMY_IMG_SRC = FloorIce.getImage("floorIce");
    super(ENEMY_IMG_SRC, 100, 20);
  }

  hitRun(target) {
    this.ctrlIndex += 1;
    if (this.hit) {
      return;
    }
    this.hit = true;
  }
  render() {
    if (this.ctrlIndex >= 40) {
      this.visible = false;
      return;
    } else if (this.ctrlIndex >= 20) {
      this.drawToCanvas(100, 0);
      return;
    }
    this.drawToCanvas(0, 0);
  }
}
