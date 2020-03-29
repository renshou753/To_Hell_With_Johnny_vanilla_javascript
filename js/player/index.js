import Animation from "../base/animation.js";

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 50;
const g = 0.15;
const MOVE_STEP = 4;

export default class Player extends Animation {
  constructor() {
    const PLAYER_IMG_SRC = Player.getImage("player");
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT);

    // 玩家默认位置
    this.x = screenWidth / 2 - this.width / 2;
    this.y = this.height + 30;

    this.isJump = true;
    this.speed = 0;
    this.blood = 3;
    this.moveType = null;
    this.initFrames(PLAYER_IMG_SRC, [
      [
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [0, 7],
        [0, 8],
        [0, 9]
      ],
      [
        [0, 10],
        [0, 11],
        [0, 12],
        [0, 13],
        [0, 14],
        [0, 15],
        [0, 16],
        [0, 17]
      ]
    ]);
    this.initEvent();
  }

  onFrame() {
    if (!this.isPlaying) {
      if (this.isJump) {
        this.drawToCanvas(40, 0);
      } else {
        this.drawToCanvas(0, 0);
      }
    }
  }

  initEvent() {
    window.addEventListener("keydown", e => {
      let key = e.keyCode;
      if (key == 37) {
        this.moveType = "left";
      } else if (key == 39) {
        this.moveType = "right";
      }
      this.setAction(this.moveType == "left" ? 1 : 0);
      this.playAnimation(0, true, 3);
    });

    window.addEventListener('keyup', e=>{
      let key = e.keyCode;
      if (key == 37) {
        this.moveType = null
        this.stop()
      } else if (key == 39) {
        this.moveType = null
        this.stop()
      }
    })
  }

  update() {
    this.y += this.speed
    this.speed += g
    if (this.speed > 20) {
      this.speed = 20
    }
    if (this.y > screenHeight) {
      this.blood = 0
    }
    else if (this.y < 10) {
      this.blood -= 1
      this.y += 20

      if (this.speed < 0) {
        this.speed = 0
      }
    }
    if (this.moveType === "left") {
      this.x -= MOVE_STEP
    }
    else if (this.moveType === "right") {
      this.x += MOVE_STEP
    }
    if (this.x < -10) {
      this.x = -10
    }
    if (this.x > screenWidth - 10) {
      this.x = screenWidth - 10
    }
  }


}
