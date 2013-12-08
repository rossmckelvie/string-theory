var lasers = [];
gameOffsetX = 0;
gameOffsetY = 0;

window.onload = function() {
  // Create Game
  game = new Game(900, 700);
  game.scale = 1;
  game.fps = 60;

  // Key bind
  game.keybind(65, 'left');
  game.keybind(68, 'right');
  game.keybind(87, 'up');
  game.keybind(83, 'down');
  game.keybind(32, 'space');

  // Preload assets
  game.preload(
    // Scenes
    'images/space.jpg',
    'images/stringtheory.png',
    'images/stringtheory1.png',
    'images/particle0.png',
    'images/start1.png',
    'images/gameover1.png',
    'images/restart.png',
    'images/tutorial.png',

    // Player
    'images/nwomatri.png',
    'images/playerHitbox.png',
    'images/life_icon.png',
    'images/bomb_icon.png',

    // Weapons
    'images/balls.png',
    'images/balls_small.png',
    'images/balls_big.png',
    'images/bombsquare.png',
    'images/bombsquarebig.png',


    // Enemies
    'images/square_glow.png',
    'images/circle_glow.png',
    'images/triangle_glow.png',
    'images/black_hole_glow.png',
    'images/black_hole_square_glow.png',
    'images/worm_head_glow.png',
    'images/worm_tail_piece_glow.png',

    // Sounds
    'sounds/hyper.mp3',
    'sounds/hypermain.mp3',
    'sounds/select.wav',
    'sounds/deadEnemy.wav'
   );

  // Set scenes and start game
  game.onload = function() {
    // Get offset of game
    var element = document.getElementById('enchant-stage');
    var position = element.getBoundingClientRect();
    gameOffsetX = position.left;
    gameOffsetY = position.top;

    // Push welcome screen
    game.pushScene(new WelcomeScreen());
  }

  // Start game
  game.start();
}
