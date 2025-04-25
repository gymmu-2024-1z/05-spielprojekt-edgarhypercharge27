import Base2DScene from "../base-2d-scene"

/**
 * Spiellogik für das Level00.
 */
export default class Level00 extends Base2DScene {
  constructor() {
    // Hier rufen wir den Konstruktor von Base2DScene auf
    super({ key: "level-00" })
  }

  preload() {
    // Hier laden wir die Karte für Level00
    this.load.tilemapTiledJSON(
      "map-level-00",
      "./assets/maps/map-level-00.json",
    )

    // Falls du möchtest, kannst du hier später noch andere Sachen laden
    // (z.B. Spezialobjekte, Animationen, Gegner usw.)
  }

  create() {
    // Hier erstellen wir die Spielwelt basierend auf der geladenen Karte
    super.create("map-level-00")
  }
}
