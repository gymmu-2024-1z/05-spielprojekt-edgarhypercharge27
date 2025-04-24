import Phaser from "phaser"
import EVENTS from "../../events"

export default class Player extends Phaser.Physics.Arcade.Sprite {
  hp = 3 // Jerry startet mit 3 Leben
  maxHp = 3 //Maximalzahl der Leben
  speed = 200 //Anfangsgeschwindigkeit von Jerr
  isDead = false //wird auf true gesetzt, wenn Jerry stirbt
  controls = {
    left: false,
    right: false,
    up: false,
    down: false,
  }

  constructor(scene, x, y) {
    super(scene, x, y, "Jerry")
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this, false)
    this.body.collideWorldBounds = true //Jerry kann nicht aus der Welt hinauslaufen
    this.setOrigin(0.5, 0.5)
    this.setSize(24, 24, false)
    this.setOffset(4, 8)
  }

  //Diese Funktion wird ständig aufgerufen, um Jerry zu bewegen
  update() {
    if (this.isDead) {
      return //Wenn Jerry tot ist, passiert nichts mehr
    }

    //Setze Geschwindigkeit auf 0, damit Jerry nicht plötzlich weiterläuft
    this.body.setVelocityX(0)
    this.body.setVelocityY(0)

    let isIdle = true //Markiert, ob Jerry inaktiv ist

    //Wenn die linke Taste gedrückt wird, bewegt sich Jerry nach links
    if (this.controls.left) {
      this.body.setVelocityX(-this.speed)
      if (isIdle) this.anims.play("player_left", true) // Animation für Bewegung nach links
      isIdle = false
    }
    //Wenn die rechte Taste gedrückt wird, bewegt sich Jerry nach rechts.
    if (this.controls.right) {
      this.body.setVelocityX(this.speed)
      if (isIdle) this.anims.play("player_right", true) //Animation für Bewegung nach rechts
      isIdle = false
    }

    //Wenn die obere Taste gedrückt wird, bewegt sich Jerry nach oben
    if (this.controls.up) {
      this.body.setVelocityY(-this.speed)
      if (isIdle) this.anims.play("player_up", true) // Animation für Bewegung nach oben
    }

    //Wenn die untere Taste gedrückt wird, bewegt sich Jerry nach unten
    if (this.controls.down) {
      this.body.setVelocityY(this.speed)
      if (isIdle) this.anims.play("player_down", true) //Animation für Bewegung nach unten
    }

    // Wenn Jerry inaktiv ist, wird die "Idle-Animation" abgespielt
    if (isIdle) {
      this.anims.play("player_idle", true) //Animation für Inaktivität
    }

    //Wenn Jerry in die Höhle läuft, startet das nächste Level
    if (this.scene.physics.overlap(this, this.scene.hoehleneingang)) {
      this.scene.scene.start("HoehlenSzene")
    }
  }

  //Diese Funktion wird aufgerufen, um Jerry schneller zu machen
  increaseSpeed(value) {
    this.speed = Math.min(this.speed + value, 960) //Geschwindigkeit kann nicht über 960 gehen
  }

  //Diese Funktion verringert die Geschwindigkeit von Jerry
  decreaseSpeed(value) {
    this.speed = Math.max(100, this.speed - value) //Geschwindigkeit kann nicht unter 100 fallen
  }

  //Diese Funktion setzt die Steuerung mit den Pfeiltasten
  setControls() {
    this.cursor = this.scene.input.keyboard.createCursorKeys() //Tasteneingaben für Bewegung
  }

  //Diese Funktion heilt Jerry um eine bestimmte Menge an Leben
  heal(value) {
    if (value == null) value = 0
    this.hp += value //Lebenspunkte erhöhen
    if (this.hp > this.maxHp) {
      this.hp = this.maxHp //Lebenspunkte können nicht über das Maximum steigen
    }

    //Teile dem Spiel mit, dass sich Jerrys Leben geändert haben
    EVENTS.emit("update-hp", this.hp)
  }

  //Diese Funktion wird aufgerufen, wenn Jerry Schaden erleidet
  damage(value) {
    if (value == null) value = 0
    this.hp -= value //Lebenspunkte verringern
    if (this.hp <= 0) {
      this.hp = 0
      this.die() //Wenn keine Lebenspunkte mehr da sind, stirbt Jerry
    }

    //Info an  Spiel, dass Leben sich geändert haben
    EVENTS.emit("update-hp", this.hp)
  }

  //Diese Funktion lässt Jerry sterben und führt nach dem Tod etwas aus
  die() {
    this.isDead = true //Jerry ist tot
    this.anims.play("player_die", true) //Todes Animation abspielen
    this.scene.scene.restart()
  }
}
