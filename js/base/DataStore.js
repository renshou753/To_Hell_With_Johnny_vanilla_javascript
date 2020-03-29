/**
 * 全局状态管理器
 */

import Pool from "./pool.js";

export default class DataStore {
  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  constructor() {
    this.map = new Map();
    this.pool = new Pool();
  }

  put(key, value) {
    if (typeof value === "function") {
      value = new value();
    }
    this.map.set(key, value);
    return this;
  }

  get(key) {
    return this.map.get(key);
  }

  destroy() {
    for (let value of this.map.values()) {
      value = null;
    }
    this.map.clear();
  }

  reset() {
    this.frame = 0;
    this.score = 0;
    this.floors = [];
    this.items = [];
    this.animations = [];
    this.gameOver = false;
  }

  /**
   * 回收地板，进入对象池
   * 此后不进入帧循环
   */
  removeFloor(floor) {
    let temp = this.floors.shift();
    temp.visible = false;
    this.pool.recover("floor", floor);
  }

  removeItem(item) {
    let temp = this.items.shift();
    temp.visible = false;
    this.pool.recover("item", item);
  }
}
