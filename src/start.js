//Wenn man auf den Start Knopf klickt, soll das Spiel anfangen
document.querySelector("#startBtn").addEventListener("click", () => {
  //Der Text am Anfang verschwindet
  document.getElementById("intro").style.display = "none"

  //Das Spielfeld wird gezeigt
  document.getElementById("gameCanvas").style.display = "block"

  //Jetzt startet das Spiel
  import("./game/main.js")
})
