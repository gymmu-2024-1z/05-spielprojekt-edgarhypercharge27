import Base2DScene from "../base-2d-scene.js"
import Cheese from "../../gameObjects/pickups/Cheese.js" // Cheese importieren

/**
 * Spiellogik für das Level03.
 */
export default class Level03 extends Base2DScene {
  constructor() {
    super({ key: "level-03" })
  }

  preload() {
    this.load.tilemapTiledJSON(
      "map-level-03",
      "./assets/maps/map-level-03.json",
    )
  }

  create() {
    super.create("map-level-03")
    this.createAnimations()
  }

  pickUp(actor, item) {
    super.pickUp(actor, item)

    if (item instanceof Cheese) {
      this.player.increaseSpeed(100)
      this.player.heal(item.props.restoreHp || 0)
    }
  }

  createAnimations() {
    this.anims.create({
      key: "player_idle",
      frames: this.anims.generateFrameNumbers("Jerry", { start: 1, end: 1 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "player_right",
      frames: this.anims.generateFrameNumbers("Jerry", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "player_left",
      frames: this.anims.generateFrameNumbers("Jerry", { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "player_up",
      frames: this.anims.generateFrameNumbers("Jerry", { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "player_down",
      frames: this.anims.generateFrameNumbers("Jerry", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    })
  }
}
