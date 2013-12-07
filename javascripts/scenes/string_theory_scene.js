var StringTheoryScene = Class.create(Scene, {
  initialize: function(highscore) {
    Scene.apply(this);
    scene = this;
    game = Game.instance;

    this.highscore = highscore;

    var wormGroup;
    bg = new Sprite(game.width, game.height);
    bg.image = game.assets['images/space.jpg'];

    this.score = 0;

    wormGroup = new Group();
    this.wormGroup = wormGroup;
    laserGroup = new Group();
    this.laserGroup = laserGroup;

    // Music
    music = game.assets['sounds/hypermain.mp3'];
    music.volume = 0.15;
    music.play();
    this.music = music;

    // Background
    this.addChild(bg);

    // Score Label
    scoreLabel = new Label("Score: 0");
    scoreLabel.addEventListener('enterframe', function() {
      this.text = "Score: " + scene.score;
    });
    scoreLabel.color = "white";
    scoreLabel.font = "14px ProximaNova";
    scoreLabel.x = 10;
    scoreLabel.y = 10;
    this.addChild(scoreLabel);

    // High Score Label
    var highScoreLabel;
    if (highscore === undefined) {
      highScoreLabel = new Label("High Score: 0");
      highScoreLabel.addEventListener('enterframe', function() {
        this.text = "High Score: " + scene.score;
      });
    }
    else highScoreLabel = new Label("High Score: " + this.highscore);

    highScoreLabel.color = "white";
    highScoreLabel.font = "14px ProximaNova";
    highScoreLabel.x = 10;
    highScoreLabel.y = 30;
    this.addChild(highScoreLabel);

    // Player
    newPlayer = new Player();
    this.addChild(newPlayer);

    // Enemies
    this.addChild(wormGroup);
    this.addChild(laserGroup);
    this.numEnemies = 0;

    // Demo square
    var square = new Square(0, 0);
    this.addChild(square);

    // Demo circle
    var circle = new Circle(game.width, game.height);
    this.addChild(circle);
  },

  onenterframe: function() {
    if (this.music.currentTime >= this.music.duration) {
      this.music.play();
    }

    if (game.touched && this.age % 6 === 0) {
     laser = new PlayerShoot(newPlayer.x, newPlayer.y, newPlayer.mx, newPlayer.my);
     this.laserGroup.addChild(laser);
     newPlayer.numLasers ++;
    }

    if (this.numEnemies === 0) {
      this.numEnemies ++;
      worm = new newWorm();
      this.wormGroup.addChild(worm);
    }

    this.numEnemies = 0;
  },

  onenterframe: function() {
    if (this.music.currentTime >= this.music.duration) {
      this.music.play();
    }

    if (game.touched && this.age % 6 === 0) {
      laser = new PlayerShoot(newPlayer.x, newPlayer.y, newPlayer.mx, newPlayer.my);
      this.laserGroup.addChild(laser);
      newPlayer.numLasers ++;
    }

    if (this.numEnemies === 0) {
      this.numEnemies++;
      worm = new newWorm();
      this.wormGroup.addChild(worm);
    }
  },

  ontouchstart: function (e) {
    newPlayer.my = e.y;
    newPlayer.mx = e.x;
    game.touched = true;
  },

  ontouchmove: function (e) {
    newPlayer.my = e.y;
    newPlayer.mx = e.x;
    game.touched = true;
  },

  ontouchend: function (e) {
    newPlayer.my = e.y;
    newPlayer.mx = e.x;
    game.touched = false;
  },

  incrementScore: function(score) {
    this.score += score;
  },

  endGame: function() {
    game.replaceScene(new GameOverScreen(this.score, this.highscore));
  }
});
