// Phaser wird geladen
import Phaser from "phaser"

// Unsere Lade-Szene wird erstellt
export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "loading" }) // Name der Szene ist "loading"
  }

  preload() {
    // Spieler-Spritesheet laden
    this.load.spritesheet("player", "./assets/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    })

    // Bild für die Maps laden
    this.load.image("tileset", "./assets/tileset.png")

    // Sachen zum Aufsammeln und Türen laden
    this.load.atlas(
      "pickups",
      "./assets/tileset.png",
      "./assets/atlas/atlas-pickups.json",
    )
    this.load.atlas(
      "doors",
      "./assets/tileset.png",
      "./assets/atlas/atlas-doors.json",
    )

    // Alle Maps laden
    this.load.tilemapTiledJSON(
      "map-level-01",
      "./assets/maps/map-level-01.json",
    )
    this.load.tilemapTiledJSON(
      "map-level-02",
      "./assets/maps/map-level-02.json",
    )
    this.load.tilemapTiledJSON(
      "map-level-03",
      "./assets/maps/map-level-03.json",
    )
  }

  create() {
    this.createAnimations() // Animationen erstellen
  }

  createAnimations() {
    // Animation wenn Spieler still steht
    this.anims.create({
      key: "player_idle",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 1 }),
      frameRate: 10,
      repeat: -1,
    })

    // Animation wenn Spieler nach rechts läuft
    this.anims.create({
      key: "player_right",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    })

    // Animation wenn Spieler nach links läuft
    this.anims.create({
      key: "player_left",
      frames: this.anims.generateFrameNumbers("player", { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    })

    // Animation wenn Spieler nach oben läuft
    this.anims.create({
      key: "player_up",
      frames: this.anims.generateFrameNumbers("player", { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1,
    })

    // Animation wenn Spieler nach unten läuft
    this.anims.create({
      key: "player_down",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    })
  }
}
