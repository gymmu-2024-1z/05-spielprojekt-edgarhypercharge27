import Phaser from "phaser"
import EVENTS from "../../events"

export default class Player extends Phaser.Physics.Arcade.Sprite {
  hp = 3
  maxHp = 3
  speed = 200
  isDead = false

  constructor(scene, x, y) {
    super(scene, x, y, "player")
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this, false)
    this.body.collideWorldBounds = true
    this.setOrigin(0.5, 0.5)
    this.setSize(24, 24, false)
    this.setOffset(4, 8)

    this.setControls()
  }

  update() {
    if (this.isDead) {
      return
    }

    this.body.setVelocityX(0)
    this.body.setVelocityY(0)

    let isIdle = true

    if (this.cursor.left.isDown) {
      console.log("Player left")
      this.body.setVelocityX(-this.speed)
      if (isIdle) this.anims.play("player_left", true)
      isIdle = false
    }
    if (this.cursor.right.isDown) {
      this.body.setVelocityX(this.speed)
      if (isIdle) this.anims.play("player_right", true)
      isIdle = false
    }
    if (this.cursor.up.isDown) {
      this.body.setVelocityY(-this.speed)
      if (isIdle) this.anims.play("player_up", true)
    }
    if (this.cursor.down.isDown) {
      this.body.setVelocityY(this.speed)
      if (isIdle) this.anims.play("player_down", true)
    }

    if (isIdle) {
      this.anims.play("player_idle", true)
    }

    if (this.scene.physics.overlap(this, this.scene.hoehleneingang)) {
      this.scene.scene.start("HoehlenSzene")
    }
  }

  increaseSpeed(value) {
    this.speed = Math.min(this.speed + value, 960)
  }

  decreaseSpeed(value) {
    this.speed = Math.max(100, this.speed - value)
  }

  setControls() {
    this.cursor = this.scene.input.keyboard.createCursorKeys()
  }

  heal(value) {
    if (value == null) value = 0
    this.hp += value
    if (this.hp > this.maxHp) {
      this.hp = this.maxHp
    }
    EVENTS.emit("update-hp", this.hp)
  }

  damage(value) {
    if (value == null) value = 0
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
