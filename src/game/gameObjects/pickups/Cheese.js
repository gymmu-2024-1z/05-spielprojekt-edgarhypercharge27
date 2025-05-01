import StaticObject from "../staticObject"

export default class Cheese extends StaticObject {
  constructor(scene, x, y, properties) {
    super(scene, x, y, "pickups", "Cheese", properties)

    this.setOrigin(0, 0)
    this.setSize(24, 32)
    this.setOffset(8, 0)
  }

  update(player) {
    if (this.scene.physics.overlap(this, player)) {
      const speedBoost = this.properties.speedBoost || 10
      player.speed += speedBoost
      this.destroy()
    }
  }
}
