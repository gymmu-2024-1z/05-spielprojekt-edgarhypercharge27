// Wir holen uns den Start-Button aus dem HTML
const startBtn = document.getElementById("startBtn")

// Wenn der Start-Button geklickt wird, passiert Folgendes:
startBtn.addEventListener("click", () => {
  // Das Menü (der ganze Hauptteil) wird versteckt
  document.getElementById("intro").style.display = "none"
  document.getElementById("startBtn").style.display = "none"
  document.querySelector("main").style.display = "none"

  // Das Spielfeld (Canvas) wird jetzt angezeigt
  document.getElementById("game-canvas").style.display = "block"

  // Das eigentliche Spiel wird geladen und gestartet
  import("./game/main.js").then((module) => {
    const game = module.game // Wir holen das Spielobjekt aus der Datei
    console.log("Spiel gestartet!") // Kleiner Text in der Konsole für uns zur Kontrolle

    // Wir starten jetzt die erste Spielszene (Level 01)
    game.scene.start("level-01")
  })
})
