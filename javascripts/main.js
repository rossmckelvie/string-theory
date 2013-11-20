window.onload = function() {
  // Create Game
  game = new Game(500, 500);
  game.scale = 1;

  // Preload assets
  game.preload(
    'images/space.jpg'
  );

  // Set scenes and start game
  game.onload = function() {
    game.pushScene(new StringTheoryScene());
    game.pushScene(new WelcomeScreen());
  }
  game.start();
}
