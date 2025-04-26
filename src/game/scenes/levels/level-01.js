import Base2DScene from "../base-2d-scene.js"
import Cheese from "../../gameObjects/pickups/Cheese.js"

export default class Level01 extends Base2DScene {
  constructor() {
    super({ key: "level-01" })
  }

  preload() {
    this.load.tilemapTiledJSON(
      "map-level-01",
      "./assets/maps/map-level-01.json",
    )
  }

  create() {
    super.create("map-level-01")
  }

  pickUp(actor, item) {
    super.pickUp(actor, item)

    if (item instanceof Cheese) {
      this.player.addKey("level-02")
      this.player.increaseSpeed(100)
      this.player.heal(item.props.restoreHp || 0)
    }
  }

  createAnimations() {
    this.anims.create({
      key: "player_idle",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 1 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "player_right",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "player_left",
      frames: this.anims.generateFrameNumbers("player", { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "player_up",
      frames: this.anims.generateFrameNumbers("player", { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "player_down",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    })
  }
}
