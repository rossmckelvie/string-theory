window.onload = function() {
  // Create Game
  game = new Game(800, 600);
  game.scale = 1;

  // Preload assets
  game.preload(
	'images/nwomatri.png',
    'images/space.jpg',
	'images/balls.png'
  );

  // Set scenes and start game
  game.onload = function() {
    game.pushScene(StringTheoryScene());
	//game.pushScene(STS);
    game.pushScene(new WelcomeScreen());
  }
  game.start();
}
