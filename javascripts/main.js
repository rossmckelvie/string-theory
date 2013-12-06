var lasers = [];

window.onload = function() {
  // Create Game
  game = new Game(800, 600);
  game.scale = 1;
  game.fps = 60;

  game.keybind(65, 'left');
  game.keybind(68, 'right');
  game.keybind(87, 'up');
  game.keybind(83, 'down');

  // Preload assets
  game.preload(
	'images/nwomatri.png',
    'images/space.jpg',
	'images/balls.png',
   'images/stringtheory.png',
   'images/stringtheory1.png',
   'images/particle0.png',
   'images/start1.png',
   'sounds/hyper.mp3',
   'sounds/hypermain.mp3',
   'sounds/select.wav'
  );

  // Set scenes and start game
  game.onload = function() {
      game.pushScene(new WelcomeScreen());
  }
  game.start();
}
