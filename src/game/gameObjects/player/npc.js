import Phaser from "phaser"

export default class NPC extends Phaser.Physics.Arcade.Sprite {
  hp = 10
  maxHp = 100
  #speed = 100
  move = "right"
  speedIncreaseInterval = 5000
  timeSinceLastSpeedIncrease = 0
  maxSpeed = 960

  constructor(scene, x, y) {
    super(scene, x, y, "player") // MUSS "player" sein, genau wie bei Jerry
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this, false)
    this.body.collideWorldBounds = false
    this.setOrigin(0.5, 0.5)
    this.setSize(24, 24, false)
    this.setOffset(4, 8)
  }

  set speed(value) {
    this.#speed = Math.min(value, 960)
    this.#speed = Math.max(0, this.#speed)
  }

  get speed() {
    return this.#speed
  }

  update(time, delta) {
    const { body } = this
    let isIdle = true

    this.timeSinceLastSpeedIncrease += delta

    if (this.timeSinceLastSpeedIncrease >= this.speedIncreaseInterval) {
      this.speed += 20
      this.timeSinceLastSpeedIncrease = 0
    }

    const distanceX = this.scene.player.x - this.x
    const distanceY = this.scene.player.y - this.y

    if (distanceX > 0) {
      this.move = "right"
    } else if (distanceX < 0) {
      this.move = "left"
    }

    if (distanceY > 0) {
      this.move = "down"
    } else if (distanceY < 0) {
      this.move = "up"
    }

    body.setVelocityX(0)
    body.setVelocityY(0)

    if (this.move === "left") {
      body.setVelocityX(-this.speed)
      if (isIdle) this.anims.play("player_left", true)
      isIdle = false
    }
    if (this.move === "right") {
      body.setVelocityX(this.speed)
      if (isIdle) this.anims.play("player_right", true)
      isIdle = false
    }
    if (this.move === "up") {
      body.setVelocityY(-this.speed)
      if (isIdle) this.anims.play("player_up", true)
      isIdle = false
    }
    if (this.move === "down") {
      body.setVelocityY(this.speed)
      if (isIdle) this.anims.play("player_down", true)
      isIdle = false
    }

    if (isIdle) {
      this.anims.play("player_idle", true)
    }
  }

  heal(value) {
    if (value == null) value = 0
    this.hp += value
    if (this.hp > this.maxHp) {
      this.hp = this.maxHp
    }
  }
}
