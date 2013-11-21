window.onload = function() {
  // Create Game
  game = new Game(500, 500);
  game.scale = 1;

  // Preload assets
  game.preload(
	'images/nwomatri.png',
    'images/space.jpg'
  );

  // Set scenes and start game
  game.onload = function() {
    STS = new StringTheoryScene();
	//game.pushScene(STS);
    game.pushScene(new WelcomeScreen());
  }
  console.log("hi");
  game.start();
}
