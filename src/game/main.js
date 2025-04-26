import Phaser from "phaser"
// Die verschiedenen Teile vom Spiel werden geladen
import LoadingScene from "./scenes/loading-scene.js"
import Level01 from "./scenes/levels/level-01.js"
import Level02 from "./scenes/levels/level-02.js"
import Level03 from "./scenes/levels/level-03.js"
import UIScene from "./scenes/ui-scene.js"
import DebugScene from "./scenes/debug-scene.js"

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  width: 640, // Sollten möglichst vielfache von 32 sein, da unsere Tileset 32x32 Pixel gross sind.
  height: 480, // Gleich wie bei width.
  parent: "game-canvas", // Die ID von dem HTML-Element, in das das Spiel gezeichnet wird.
  scene: [LoadingScene, UIScene, DebugScene, Level01, Level02, Level03], // Jetzt ist Level00 dabei!
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
  },
}
// Startet das Spiel
export const game = new Phaser.Game(config)
