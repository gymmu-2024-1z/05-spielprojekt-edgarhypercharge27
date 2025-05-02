import Phaser from "phaser"
import EVENTS from "../../events"

export default class Player extends Phaser.Physics.Arcade.Sprite {
  hp = 3
  maxHp = 3
  speed = 200
  isDead = false
  jumpSpeed = -500 // Negative Y für Sprung nach oben

  constructor(scene, x, y) {
    super(scene, x, y, "player")
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.setCollideWorldBounds(true)
    this.setOrigin(0.5, 0.5)
    this.setSize(24, 24, false)
    this.setOffset(4, 8)

    this.setControls()
  }

  update() {
    if (this.isDead) return

    this.body.setVelocityX(0)

    let isIdle = true

    if (this.cursor.left.isDown) {
      this.body.setVelocityX(-this.speed)
      if (isIdle) this.anims.play("player_left", true)
      isIdle = false
    } else if (this.cursor.right.isDown) {
      this.body.setVelocityX(this.speed)
      if (isIdle) this.anims.play("player_right", true)
      isIdle = false
    }

    // SPRUNG: Nur wenn auf dem Boden
    if (this.cursor.up.isDown && this.body.blocked.down) {
      this.body.setVelocityY(this.jumpSpeed)
      this.anims.play("player_up", true)
      isIdle = false
    }

    if (isIdle && this.body.blocked.down) {
      this.anims.play("player_idle", true)
    }

    if (this.scene.physics.overlap(this, this.scene.hoehleneingang)) {
      this.scene.scene.start("HoehlenSzene")
    }
  }

  setControls() {
    this.cursor = this.scene.input.keyboard.createCursorKeys()
  }

  increaseSpeed(value) {
    this.speed = Math.min(this.speed + value, 960)
  }

  decreaseSpeed(value) {
    this.speed = Math.max(100, this.speed - value)
  }

  heal(value = 0) {
    this.hp += value
    if (this.hp > this.maxHp) this.hp = this.maxHp
    EVENTS.emit("update-hp", this.hp)
  }

  damage(value = 0) {
    this.hp -= value
    if (this.hp <= 0) {
      this.hp = 0
      this.die()
    }
    EVENTS.emit("update-hp", this.hp)
  }

  die() {
    this.isDead = true
    this.anims.play("player_die", true)
    this.scene.scene.restart()
  }
}
