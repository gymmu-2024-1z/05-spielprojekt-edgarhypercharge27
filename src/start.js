//Wenn man auf den Start Knopf klickt, soll das Spiel anfangen
document.getElementById("startBtn").addEventListener("click", () => {
  //Alles andere wird ausgeblendet
  document.querySelector("main").style.display = "none"

  //Das Spielfeld wird gezeigt
  document.getElementById("gameCanvas").style.display = "block"

  //Jetzt startet das Spiel
  import("./game/main.js")
})
