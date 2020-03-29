import FloorBase from "./floorBase.js";

export default class FloorNormal extends FloorBase {
  constructor() {
    const ENEMY_IMG_SRC = FloorNormal.getImage("floorNormal");
    super(ENEMY_IMG_SRC, 100, 20);
  }

  hitRun(target) {
    if (this.hit) {
      return;
    }
    this.hit = true;
  }

  render() {
    this.drawToCanvas();
  }
}
