var lasers = [];

window.onload = function() {
  // Create Game
  game = new Game(800, 600);
  game.scale = 1;
  game.fps = 60;

  // Key bind
  game.keybind(65, 'left');
  game.keybind(68, 'right');
  game.keybind(87, 'up');
  game.keybind(83, 'down');

  // Preload assets
  game.preload(
    // Scenes
    'images/space.jpg',
    'images/stringtheory.png',
    'images/stringtheory1.png',
    'images/particle0.png',
    'images/start1.png',
    'images/gameover.png',

    // Player
    'images/nwomatri.png',
    'images/playerHitbox.png',

    // Weapons
    'images/balls.png',

    // Enemies
    'images/square_glow.png',
    'images/circle_glow.png',
    'images/triangle_glow.png',
    'images/black_hole_glow.png',

    // Sounds
    'sounds/hyper.mp3',
    'sounds/hypermain.mp3',
    'sounds/select.wav',
    'sounds/deadEnemy.wav'
   );

  // Set scenes and start game
  game.onload = function() {
    game.pushScene(new WelcomeScreen());
  }

  // Start game
  game.start();
}
