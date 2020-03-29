import DataStore from "./js/base/DataStore.js";
import Director from "./js/Director.js";
import BackGround from "./js/runtime/background.js";
import Ceiling from "./js/npc/ceiling.js";
import FloorNormal from "./js/npc/floor/floorNormal.js";
import FloorAttack from "./js/npc/floor/floorAttack.js";
import FloorBounce from "./js/npc/floor/floorBounce.js";
import FloorIce from "./js/npc/floor/floorIce.js";
import FloorLeft from "./js/npc/floor/floorLeft.js";
import FloorRight from "./js/npc/floor/floorRight.js";
import Player from "./js/player/index.js";
import Music from "./js/runtime/music.js"
import GameInfo from "./js/runtime/gameinfo.js"
import ResourceLoader from "./js/base/ResourceLoader.js";

export default class Main {
  constructor() {
    this.canvas = document.getElementById("game_canvas");
    this.ctx = this.canvas.getContext("2d");
    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance();
    const loader = ResourceLoader.create();
    loader.onLoaded(map => this.onResourceFirstLoaded(map));
  }

  onResourceFirstLoaded(map) {
    this.dataStore.canvas = this.canvas;
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    this.dataStore.floorType = [
      FloorNormal,
      FloorIce,
      FloorLeft,
      FloorRight,
      FloorBounce,
      FloorAttack
    ];
    this.init();
  }

  init() {
    this.dataStore.reset();
    this.dataStore
      .put("background", BackGround)
      .put("ceiling", Ceiling)
      .put("floorNormal", FloorNormal)
      .put("floorAttack", FloorAttack)
      .put("floorIce", FloorIce)
      .put("floorLeft", FloorLeft)
      .put("floorRight", FloorRight)
      .put("floorBounce", FloorBounce)
      .put("player", Player)
      .put("music", Music)
      .put("gameinfo",GameInfo)
    this.director.run();
  }
}
