/**
 * 游戏基础的精灵类
 */
import DataStore from "./DataStore.js";

export default class Sprite {
  constructor(img = null, width = 0, height = 0, x = 0, y = 0) {
    this.img = img;

    this.width = width;
    this.height = height;

    this.x = x;
    this.y = y;

    this.visible = true;

    this.dataStore = DataStore.getInstance();
    this.ctx = this.dataStore.ctx;
  }

  static getImage(key) {
    return DataStore.getInstance().res.get(key);
  }

  /**
   * 将精灵图绘制在canvas上
   * 支持部分裁剪显示
   */
  drawToCanvas(sx = 0, sy = 0) {
    if (!this.visible) return;
    this.ctx.drawImage(
      this.img,
      sx || 0,
      sy || 0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp) {
    let spX = sp.x + sp.width / 2;
    let spY = sp.y + sp.height / 2;

    if (!this.visible || !sp.visible) return false;

    return !!(
      spX >= this.x &&
      spX <= this.x + this.width &&
      spY >= this.y &&
      spY <= this.y + this.height
    );
  }
}
