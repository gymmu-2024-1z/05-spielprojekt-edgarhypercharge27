import Phaser from "phaser"
import Cave from "../gameObjects/doors/cave.js"
import Player from "../gameObjects/player/player.js"
import NPC from "../gameObjects/player/npc.js"
import Cheese from "../gameObjects/pickups/Cheese.js"

/**
 * Erweiterung einer Phaser.Scene mit praktischen Funktionen um Spielobjekte
 * automatisch zu erstellen.
 */
export default class Base2DScene extends Phaser.Scene {
  map = null
  tiles = null
  obstacles = null
  items = null
  doors = null
  npcs = null
  player = null
  text = null

  constructor(options) {
    super(options) // Szene wird gestartet
  }

  create(mapKey) {
    // Gruppen für Items, Türen und NPCs werden erstellt
    this.items = this.add.group()
    this.doors = this.add.group()
    this.npcs = this.add.group()

    this.loadMap(mapKey) // Map wird geladen
    this.createCamera() // Kamera folgt dem Spieler
    this.setupDefaultCollisions() // Kollisionen werden eingestellt

    // Diese Szenen kommen im Vordergrund
    this.scene.bringToTop("ui-scene")
    this.scene.bringToTop("debug-scene")
  }

  loadMap(mapKey) {
    this.map = this.make.tilemap({ key: mapKey }) // Map wird erstellt
    this.tiles = this.map.addTilesetImage("tileset") // Tileset wird hinzugefügt
    this.map.createLayer("Background", this.tiles, 0, 0) // Hintergrund Layer
    this.obstacles = this.map.createLayer("Obstacles", this.tiles, 0, 0) // Hindernisse Layer

    this.createMapObjects() // Items auf der Map platzieren
    this.createObjects(this.map, "Doors", "Cave", Cave, this.doors) // Türen platzieren
    this.createObjects(this.map, "SpawnPoints", "NPC", NPC, this.npcs) // Gegner platzieren

    // Spieler wird an Startpunkt gesetzt
    this.player = this.createSingleObject(
      this.map,
      "SpawnPoints",
      "SpawnPlayer",
      Player,
    )
  }

  createMapObjects() {
    // Hier wird Käse auf der Map verteilt
    this.createObjects(this.map, "Items", "Cheese", Cheese, this.items)
  }

  createCamera() {
    this.cameras.main.setSize(640, 480) // Kamera Größe wird gesetzt
    this.cameras.main.startFollow(this.player) // Kamera folgt dem Spieler
  }

  setupDefaultCollisions() {
    this.obstacles.setCollisionByProperty({ collides: true }) // Wände blockieren
    this.physics.add.collider(this.player, this.obstacles) // Spieler gegen Hindernisse

    this.physics.add.collider(
      this.npcs,
      this.obstacles,
      this.npcCollideObstacles,
      () => true,
      this,
    )

    this.physics.add.collider(this.npcs, this.doors) // NPCs gegen Türen

    this.physics.add.overlap(
      this.player,
      this.items,
      this.pickUp,
      () => true,
      this,
    )

    this.physics.add.collider(
      this.player,
      this.doors,
      this.enterDoor,
      () => true,
      this,
    )
  }

  npcCollideObstacles(npc, obstacle) {
    if (npc == null) return
    npc.move = "idle" // NPC bleibt stehen
  }

  pickUp(actor, item) {
    item.destroy() // Item wird entfernt wenn aufgesammelt
  }

  enterDoor(actor, door) {
    const { goToWorld, needKey } = door.props
    if (goToWorld == null) return
    if (needKey == null) {
      this.scene.start(goToWorld) // Tür ohne Schlüssel
      return
    }

    if (actor.keys[needKey] > 0) {
      this.scene.start(goToWorld) // Tür mit Schlüssel
      return
    }
  }

  update() {
    if (this.player) this.player.update()
    if (this.npcs) {
      this.npcs.children.entries.forEach((npc) => {
        npc.update()
      })
    }
  }

  createSingleObject(map, objectLayer, objectName, objectClass) {
    const spawnPoint = map.findObject(
      objectLayer,
      (obj) => obj.name === objectName,
    )
    return new objectClass(this, spawnPoint.x, spawnPoint.y)
  }

  createObjects(map, objectLayer, objectName, objectClass, targetGroup) {
    const objects = map.filterObjects(
      objectLayer,
      (obj) => obj.name === objectName,
    )
    if (objects != null) {
      objects.forEach((obj) => {
        targetGroup.add(new objectClass(this, obj.x, obj.y, obj.properties))
      })
    }
  }
}
