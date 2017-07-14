// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  let game;
  game = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  window.onbeforeunload = function() {
    var data = game.exitGame();
    $.ajax({
      //async:false so app will wait till req is complete before exiting
      async: false,
      url: "https://requestb.in/12m3sfs1?From-EXIT-GAME",
      method: "POST",
      //this is needed for production
      //reminder: server has to allow-access-origin
      crossDomain: true,
      //CORS needed if hosted from desktop
      data: data,
      headers: {
        "x-supertoken": "yes-its-supertoken"
      },
      success: function() {
        console.log("Exiting...score submitted, score: " + data)
      },
      error: function() {
        console.log("Error @ exit() ")
      }
    });
  };
});
