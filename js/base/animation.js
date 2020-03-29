import Sprite from "./sprite.js";
import DataStore from "./DataStore.js";

const __ = {
  timer: Symbol("timer")
};

export default class Animation extends Sprite {
  constructor(img, width, height) {
    super(img, width, height);
    // 当前动画是否播放中

    this.isPlaying = false;

    // 动画是否需要循环播放
    this.loop = false;

    // 每一帧的时间间隔
    this.interval = 1000 / 60;

    // 帧定时器
    this[__.timer] = null;

    // 当前播放的帧
    this.index = -1;

    // 当前播放的动画组
    this.rowIndex = 0;

    // 总帧数
    this.count = 0;

    // 帧图片
    this.spriteImg = "";

    //动画帧（雪碧图位置信息）
    this.frameList = [];

    /**
     * 推入到全局动画池里面
     * 便于全局绘图的时候遍历和绘制当前动画帧
     */
    this.dataStore.animations.push(this);
  }

  /**
   * 初始化帧动画的所有帧
   * 为了简单，只支持一个帧动画
   */
  initFrames(spriteImg, frameList) {
    let img = spriteImg;

    this.spriteImg = img;
    this.frameList = frameList;
  }

  setAction(i = 0) {
    this.rowIndex = i;
    this.count = this.frameList[i].length;
  }

  // 将播放中的帧绘制到canvas上
  aniRender() {
    this.dataStore.ctx.drawImage(
      this.spriteImg,
      this.frameList[this.rowIndex][this.index][1] * this.width,
      this.frameList[this.rowIndex][this.index][0] * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  // 播放预定的帧动画
  playAnimation(index = 0, loop = false, space = 1) {
    this.isPlaying = true;
    this.loop = loop;

    this.index = index;

    if (this.interval > 0 && this.count) {
      this[__.timer] = setInterval(
        this.frameLoop.bind(this),
        this.interval * space
      );
    }
  }

  // 停止帧动画播放
  stop() {
    this.isPlaying = false;

    if (this[__.timer]) clearInterval(this[__.timer]);
  }

  // 帧遍历
  frameLoop() {
    this.index++;

    if (this.index > this.count - 1) {
      if (this.loop) {
        this.index = 0;
      } else {
        this.index--;
        this.stop();
      }
    }
  }
}
