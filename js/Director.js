import DataStore from "./base/DataStore.js";

export default class Director {
  constructor() {
    this.dataStore = DataStore.getInstance();
    this.moveSpeed = 2;
    this.AniId = 0;
  }

  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    this.dataStore.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.dataStore.get("background").render();
    this.dataStore.floors.forEach(item => item.render());
    this.dataStore.get("player").onFrame();
    this.dataStore.get("ceiling").drawToCanvas();
    this.dataStore.animations.forEach(ani => {
      if (ani.isPlaying) {
        ani.aniRender();
      }
    });

    this.dataStore
      .get("gameinfo")
      .renderGameScore(this.dataStore.ctx, this.dataStore.score);
    this.dataStore
      .get("gameinfo")
      .renderBlood(this.dataStore.ctx, this.dataStore.get("player").blood);

    // 游戏结束停止帧循环
    if (this.dataStore.gameOver) {
      this.dataStore
        .get("gameinfo")
        .renderGameOver(this.dataStore.ctx, this.dataStore.score);

      if (!this.hasEventBind) {
        this.hasEventBind = true;
        this.touchHandler = this.touchEventHandler.bind(this);
        window.addEventListener("click", this.touchHandler);
      }
    }
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault();
    let x = e.clientX;
    let y = e.clientY;
    let area = this.dataStore.get("gameinfo").btnArea;

    if (
      x >= area.startX &&
      x <= area.endX &&
      y >= area.startY &&
      y <= area.endY
    ) {
      this.restart();
    }
  }

  update() {
    if (this.dataStore.gameOver) return;

    this.dataStore.get("background").update();

    this.dataStore.get("player").update();

    this.dataStore.floors.forEach(item => {
      item.update();
    });
    this.floorGenerate();
    this.dataStore.get("player").isJump = true;
    this.collisionDetection();

    this.dataStore.score = this.dataStore.get("background").renderIndex;

    if (this.dataStore.get("player").blood <= 0) {
      this.dataStore.gameOver = true;
    }
  }

  floorGenerate() {
    if (this.dataStore.frame == 1) {
      this.initFirstFloor();
    }

    if (this.dataStore.frame % 60 == 0) {
      let index = Math.ceil(Math.random() * 6 - 1);
      let mstage = this.dataStore.floorType[index];
      let floor = this.dataStore.pool.getItemByClass("floor", mstage);
      floor.init(2);
      this.dataStore.floors.push(floor);
    }
  }

  initFirstFloor() {
    let floor = this.dataStore.get("floorNormal");
    floor.init(2, 100, 300);
    this.dataStore.floors.push(floor);
  }

  run() {
    this.dataStore.frame++;
    this.render();
    this.update();
    this.AniId = requestAnimationFrame(() => this.run());
  }

  //碰撞检测
  collisionDetection() {
    for (let i = 0; i < this.dataStore.floors.length; i++) {
      let floor = this.dataStore.floors[i];
      if (floor.isTouched(this.dataStore.get("player"))) {
        this.dataStore.get("player").isJump = false;
        this.dataStore.get("player").speed = 0;
        this.dataStore.get("player").y =
          floor.y - this.dataStore.get("player").height + 5;
        if (!floor.hit) {
          this.dataStore.get("music").playTouch();
        }
        floor.hitRun(this.dataStore.get("player"));
        break;
      }
    }

    if (
      this.dataStore.get("ceiling").isCollideWith(this.dataStore.get("player"))
    ) {
      this.DataStore.get("player").blood -= 1;
    }
  }

  restart() {
    this.dataStore.reset();
    window.removeEventListener("click", this.touchHandler);
    this.hasEventBind = false;
    window.cancelAnimationFrame(this.AniId);
    this.AniId = requestAnimationFrame(() => this.run());
  }
}
