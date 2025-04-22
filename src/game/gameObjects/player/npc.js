import Phaser from "phaser"

export default class NPC extends Phaser.Physics.Arcade.Sprite {
  hp = 10
  maxHp = 100
  #speed = 100 //Anfangsgeschwindigkeit von Tom
  move = "right" // Tom läuft immer nach rechts
  speedIncreaseInterval = 5000 // Tom wird alle 5 Sekunden schneller
  timeSinceLastSpeedIncrease = 0 // Zeit, die seit der letzten Geschwindigkeitssteigerung vergangen ist.
  maxSpeed = 960 //Maximale Geschwindigkeit, um durch Objekte zu kollidieren

  constructor(scene, x, y) {
    super(scene, x, y, "Tom")
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this, false)
    this.body.collideWorldBounds = false
    this.setOrigin(0.5, 0.5)
    this.setSize(24, 24, false)
    this.setOffset(4, 8)
  }

  /**
   * Setze die Geschwindigkeit des Spielers. Kann nicht grösser als 960 sein, da
   * der Spieler sonst durch die Spielobjekte geht. Kann auch nicht kleiner als
   * 0 sein.
   *
   * @param {integer} value Die Geschwindigkeit der Spielers.
   */
  set speed(value) {
    this.#speed = Math.min(value, 960)
    this.#speed = Math.max(0, this.#speed)
  }

  /** Geschwindigkeit des Spielers. */
  get speed() {
    return this.#speed
  }

  update(time, delta) {
    const { body } = this
    let isIdle = true //Angabe, dass Tom inaktiv ist

    //Zeit seit der letzten Geschwindigkeitssteugerung erhöhen
    this.timeSinceLastSpeedIncrease += delta

    // Wenn 5 Sekunden vergangen sind, wird Tom schneller
    if (this.timeSinceLastSpeedIncrease >= this.speedIncreaseInterval) {
      this.speed += 20 // Geschwindigkeit von Tom um 20 erhöhen
      this.timeSinceLastSpeedIncrease = 0 // Setze die Zeit zurück
    }
    //Tom soll immer Jerry verfolgen
    const distanceX = this.scene.jerry.x - this.x // X-Abstand zu Jerry
    const distanceY = this.scene.jerry.y - this.y // Y-Abstand zu Jerry

    // Bestimmen, ob Tom nach rechts oder links gehen soll, um Jerry zu verfolgen
    if (distanceX > 0) {
      this.move = "right"
    } else if (distanceX < 0) {
      this.move = "left"
    }

    //Bestimmen, ob Tom nach oben oder unten gehen soll, um Jerry zu verfolgen
    if (distanceY > 0) {
      this.move = "down"
    } else if (distanceY < 0) {
      this.move = "up"
    }

    //Standartbewegung
    this.body.setVelocityX(0)
    this.body.setVelocityY(0)

    if (this.move === "left") {
      body.setVelocityX(-this.speed) //Tom bewegt sich nach links
      if (isIdle) this.anims.play("player_left", true) // Animation für Bewegung nach links
      isIdle = false
    }
    if (this.move === "right") {
      this.body.setVelocityX(this.speed) //Tom bewegt sich nach rechts
      if (isIdle) this.anims.play("player_right", true) // Animation für Bewegung nach rechts
      isIdle = false
    }

    if (this.move === "up") {
      body.setVelocityY(-this.speed) //Tom bewegt sich nach oben
      if (isIdle) this.anims.play("player_up", true) // Animation für Bewegung nach oben
      isIdle = false
    }
    if (this.move === "down") {
      body.setVelocityY(this.speed) //Tom bewegt sich nach unten
      if (isIdle) this.anims.play("player_down", true) //Animation für Bewegung nach unten
      isIdle = false
    }

    //Wenn Tom nichts tut (inaktiv ist), spielt er die Idle-Animation
    if (isIdle) {
      this.anims.play("player_idle", true)
    }
  }

  //Heilung von Tom
  heal(value) {
    if (value == null) value = 0
    this.hp = this.hp + value
    if (this.hp > this.maxHp) {
      this.hp = this.maxHp
    }
  }
}
