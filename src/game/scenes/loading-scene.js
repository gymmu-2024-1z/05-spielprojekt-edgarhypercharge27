import Phaser from "phaser"

export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "loading" })
  }

  preload() {
    // Spieler-Spritesheet (Jerry) laden
    this.load.spritesheet("player", "./assets/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    })

    // NPC-Spritesheet (Tom) laden
    this.load.spritesheet("npc", "./assets/npc.png", {
      frameWidth: 32,
      frameHeight: 32,
    })

    // Tileset für die Welt laden
    this.load.image("tileset", "./assets/tileset.png")

    // Karten für Level laden
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
    this.createAnimations()
  }

  createAnimations() {
    // Animationen für Jerry (player)
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

    // Animationen für Tom (npc)
    this.anims.create({
      key: "npc_idle",
      frames: this.anims.generateFrameNumbers("npc", { start: 1, end: 1 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "npc_right",
      frames: this.anims.generateFrameNumbers("npc", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "npc_left",
      frames: this.anims.generateFrameNumbers("npc", { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "npc_up",
      frames: this.anims.generateFrameNumbers("npc", { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "npc_down",
      frames: this.anims.generateFrameNumbers("npc", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    })
  }
}
