var StringTheoryScene = Class.create(Scene, {
  initialize: function(highscore) {
    Scene.apply(this);
    scene = this;
    game = Game.instance;

    this.highscore = highscore;

    var wormGroup;
    bg = new SpaceBackground();

    this.score = 0;
    this.reviving = false;

    wormGroup = new Group();
    this.wormGroup = wormGroup;
    laserGroup = new Group();
    this.laserGroup = laserGroup;
    enemyGroup = new Group();
    this.enemyGroup = enemyGroup;
    bombGroup = new Group();

	this.circleGunCounter = 0;
	this.circleGunCounter2= 0;
    // Music
    music = enchant.DOMSound.load('sounds/hypermain.mp3');
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
    var highScoreLabel = new Label("High Score: " + this.highscore);
    highScoreLabel.addEventListener('enterframe', function() {
      if (scene.score > scene.highscore)
        this.text = "High Score: " + scene.score;
    });
    highScoreLabel.color = "white";
    highScoreLabel.font = "14px ProximaNova";
    highScoreLabel.x = 10;
    highScoreLabel.y = 30;
    this.addChild(highScoreLabel);

    // Player
    hitbox = new PlayerHitbox();
    hitbox.x = game.width/2 - hitbox.width/2;
    hitbox.y = (game.height / 2) - (hitbox.height / 2);
    newPlayer = new Player(hitbox);
    this.addChild(newPlayer);
    this.addChild(hitbox);

    // Life & Bomb Indicators
    this.drawLivesIndicator();
    this.drawBombsIndicator();

    // Enemies
    this.addChild(wormGroup);
    this.addChild(laserGroup);
    this.addChild(enemyGroup);
    this.addChild(bombGroup);
    this.numEnemies = 0;

    // Start game controller
    var gc = new GameController(this);
    this.addChild(gc);
  },

  onenterframe: function() {
    if (this.music.currentTime >= this.music.duration) {
      this.music.play();
    }

    this.checkShoot();

    if (this.numEnemies === 0) {
      this.numEnemies++;
      worm = new newWorm(0, 0);
      this.wormGroup.addChild(worm);
    }
  },

  ontouchstart: function (e) {
    newPlayer.my = e.y - gameOffsetY;
    newPlayer.mx = e.x - gameOffsetX;
    game.touched = true;
  },

  ontouchmove: function (e) {
    newPlayer.my = e.y - gameOffsetY;
    newPlayer.mx = e.x - gameOffsetX;
    game.touched = true;
  },

  ontouchend: function (e) {
    newPlayer.my = e.y - gameOffsetY;
    newPlayer.mx = e.x - gameOffsetX;
    game.touched = false;
  },

  checkShoot: function() {
		if (game.touched) {

			if (newPlayer.level >= 0 && this.age % 6 === 0) {
				laser = new PlayerShoot0(newPlayer.x, newPlayer.y, newPlayer.mx, newPlayer.my);
				this.laserGroup.addChild(laser);
			}

			if (newPlayer.level >= 1 && this.age % 12 === 0) {
				laser = new PlayerShoot1(newPlayer.x, newPlayer.y, newPlayer.mx, newPlayer.my, 1);
				this.laserGroup.addChild(laser);
				laser = new PlayerShoot1(newPlayer.x, newPlayer.y, newPlayer.mx, newPlayer.my, -1);
				this.laserGroup.addChild(laser);
			}

			if (newPlayer.level >= 2 && this.age % 10 === 0) {
				laser = new PlayerShoot2(newPlayer.x, newPlayer.y, newPlayer.mx, newPlayer.my);
				this.laserGroup.addChild(laser);
			}

			if (newPlayer.level === 3 && this.age % 15 === 0) {
				laser = new PlayerShoot3(newPlayer.x, newPlayer.y, newPlayer.mx, newPlayer.my, this.circleGunCounter);
				this.laserGroup.addChild(laser);
				this.circleGunCounter ++;
				if (this.circleGunCounter >= 8) this.circleGunCounter = 0;
			}

			if (newPlayer.level === 4 && this.age % 60 === 0) {
				for (i = this.circleGunCounter2; i < 8; i += 2) {
					laser = new PlayerShoot3(newPlayer.x, newPlayer.y, newPlayer.mx, newPlayer.my, i);
					this.laserGroup.addChild(laser);
				}

				if (this.circleGunCounter2) this.circleGunCounter2 = 0;
				else this.circleGunCounter2 = 1;

			}


		}
	},

  incrementScore: function(score) {
    this.score += score;
  },

  playerDead: function() {
    newPlayer.lives--;
    console.log("Player dying!");

    if (newPlayer.lives === 0) {
      music.stop();
      game.replaceScene(new GameOverScreen(this.score, this.highscore));
    } else {
      this.reviving = true;

      // Start player revive animation
      newPlayer.revive();

      // Remove one indicator
      this.lifeIndicatorGroup.removeChild(this.lifeIndicatorGroup.lastChild);

      // Nuke enemies
      for (var i = enemyGroup.childNodes.length; i >= 0; i--)
        enemyGroup.removeChild(enemyGroup.childNodes[i]);
    }
  },

  drawLivesIndicator: function() {
    this.lifeIndicatorGroup = new Group();
    this.addChild(this.lifeIndicatorGroup);

    for (var i = 0; i < newPlayer.lives; i++) {
      this.lifeIndicatorGroup.addChild(this.getLifeIndicatorSprite(i));
    }
  },

  getLifeIndicatorSprite: function(life_id) {
    var img = new GameImage('life_icon', 16, 16);
    img.y = 20;
    img.x = (game.width / 2) - ((img.width + 10) * (life_id + 1));

    return img;
  },

  drawBombsIndicator: function() {
    var i, centerX = game.width / 2;
    this.bombIndicatorGroup = new Group();

    this.addChild(this.bombIndicatorGroup);

    for (i = 0; i < newPlayer.bombs; i++) {
      this.bombIndicatorGroup.addChild(this.getBombIndicatorSprite(i));
    }
  },

  getBombIndicatorSprite: function(bomb_id) {
    var img = new GameImage('bomb_icon', 16, 16);
    img.y = 20;
    img.x = (game.width / 2) + ((img.width + 10) * (bomb_id + 1));

    return img;
  }
});
