import StaticObject from "../staticObject"

export default class mousetrap extends StaticObject {
  constructor(scene, x, y, properties) {
    super(scene, x, y, "pickups", "mousetrap", properties)

    this.setOrigin(0, 0)
    this.setSize(32, 32)
    this.setOffset(8, 0)
  }
}
