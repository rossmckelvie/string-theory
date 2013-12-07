var StringTheoryScene = Class.create(Scene, {
  initialize: function() {
    Scene.apply(this);

    var wormGroup;
    bg = new Sprite(game.width, game.height);
    bg.image = game.assets['images/space.jpg'];

    wormGroup = new Group();
    this.wormGroup = wormGroup;
    laserGroup = new Group();
    this.laserGroup = laserGroup;

    /*scoreLabel = new Label('SCORE<br>0');
    scoreLabel.x = -50;
    scoreLabel.y = -100;
    scoreLabel.color = 'white';
    scoreLabel.font = '20px Impact';
    scoreLabel.textAlign = 'center';
    scoreLabel._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

    scoreLabel.tl.moveTo(scoreLabel.x, 20, 20);

    highScoreLabel = new Label('HIGH SCORE<br>0');
    highScoreLabel.x = 530;
    highScoreLabel.y = -100;
    highScoreLabel.color = 'white';
    highScoreLabel.font = '20px Impact';
    highScoreLabel.textAlign = 'center';
    highScoreLabel._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

    highScoreLabel.tl.moveTo(highScoreLabel.x, 20, 20);*/


    music = game.assets['sounds/hypermain.mp3'];
    music.volume = 0.15;
    music.play();
    this.music = music;

    this.addChild(bg);

    newPlayer = new Player();
    this.addChild(newPlayer);
    this.addChild(wormGroup);
    this.addChild(laserGroup);

<<<<<<< HEAD
	newPlayer = new Player();
	this.addChild(newPlayer);
   this.addChild(wormGroup);
   this.addChild(laserGroup);
   this.numEnemies = 0;
  },

  onenterframe: function() {
      if (this.music.currentTime >= this.music.duration ){
         this.music.play();
      }
		if(game.touched && this.age % 6 === 0) {
				laser = new PlayerShoot(newPlayer.x, newPlayer.y, newPlayer.mx, newPlayer.my);
				this.laserGroup.addChild(laser);
                newPlayer.numLasers ++;
		}

      if (this.numEnemies === 0) {
      this.numEnemies ++;
      worm = new newWorm();
      this.wormGroup.addChild(worm);
      }
=======
    var square = new Square(0, 0);
    this.addChild(square);

    this.numEnemies = 0;
>>>>>>> ad1392d4c3e310c101cd860075db37f032f25166
  },

  onenterframe: function() {
    if (this.music.currentTime >= this.music.duration ) {
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
});
