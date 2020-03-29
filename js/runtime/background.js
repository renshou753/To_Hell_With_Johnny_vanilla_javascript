import Sprite from "../base/sprite.js";
import DataStore from "../base/DataStore.js";

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const BG_WIDTH = 320;
const BG_HEIGHT = 504;

export default class BackGround extends Sprite {
  constructor() {
    const BG_IMG_SRC = BackGround.getImage("background");
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT);

    this.top = 0;
    this.renderIndex = 1;

    this.dataStore = DataStore.getInstance();
    this.ctx = this.dataStore.ctx;
  }

  update() {
    this.top -= 2;

    if (this.top <= -screenHeight) {
      this.renderIndex += 1;
      this.top = 0;
    }
  }

  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx = this.ctx) {
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      screenHeight + this.top,
      screenWidth,
      screenHeight
    );

    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      this.top,
      screenWidth,
      screenHeight
    );
  }
}
