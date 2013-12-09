Worm = Class.create(Enemy, // We extend the Sprite class
{
    initialize: function(x, y) { //initialization
	this.super_initialize("Worm", x, y, 50, 50);
	//this.image = game.assets['images/worm_head_glow.png'];
	this.image = game.assets['images/worm_head_glow.png'];
	this.makeBody = 4;
	this.x = x;
	this.y = y;
	this.worm = 1;
	this.bodyLeft = 0;

	this.scoreValue = 10;
	this.health = 1;

	this.speed = 5;
	this.currentPathController = "followPlayer";

	this.moveChoices = [
	  //[ "moveRandom", 45 ],
	  [ "followPlayer", 70 ]
	];
	this.moveChoicesTotalWeight = 0;
	for (var i = 0; i < this.moveChoices.length; i++)
	  this.moveChoicesTotalWeight += this.moveChoices[i][1];

    },

    onenterframe: function() {
	if (this.makeBody == 4) {
		this.makeBody--;
		enemyGroup.addChild(new WormBody(this.x, this.y, this, this.makeBody, this, 4.8));
		this.bodyLeft++;
	}
      if (!this.super_onenterframe()) return;

      // Every 30 steps, choose random direction or follow
      if (!(this.age % 30 === 0)) return this[this.currentPathController]();

      var random = Math.floor(Math.random() * this.moveChoicesTotalWeight);
      var i, cumulativeWeight = 0;

      for (i = 0; i < this.moveChoices.length; i++) {
	cumulativeWeight += this.moveChoices[i][1];

	if (random < cumulativeWeight) {
	  this.currentPathController = this.moveChoices[i][0];
	  break;
	}
      }

      return this[this.currentPathController]();
    },

    moveRandom: function() {
      if (this.age % 30 === 0) {
	this.randomX = Math.floor(Math.random() * (game.width - (this.width / 2)));
	this.randomY = Math.floor(Math.random() * (game.height - (this.height / 2)));
	this.randomAngle = Math.atan2(this.randomX, this.randomY);
      }

      this.randomXSpeed = this.speed * Math.cos(this.randomAngle);
      this.randomYSpeed = this.speed * Math.sin(this.randomAngle);

      if (this.randomXSpeed === 0 && this.randomYSpeed === 0)
	this.randomXSpeed = 1;

      this.x += this.randomXSpeed;
      this.y += this.randomYSpeed;

      if (this.y < 0) this.y = 0;
      if (this.x < 0) this.x = 0;
      if (this.x + this.width > game.width) this.x = game.width - this.width;
      if (this.y + this.height > game.height) this.y = game.height - this.height;
    }
});

WormBody = Class.create(Enemy, {
	initialize: function(x, y, head, makeMore, topHead, speed) {
		this.super_initialize("WormBody", x, y, 33, 33);
		this.image = game.assets['images/worm_tail_piece_glow.png'];
		this.x = x - 20;
		this.y = y - 20;
		this.head = head;
		this.speed = speed;
		this.head = head;
		this.makeBody = makeMore;
		this.topMake = makeMore;
		this.topHead = topHead;
		this.wormBody = 1;

		this.currentPathController = "followWorm";
	},

	onenterframe: function() {
		sfxEnemy = game.assets['sounds/deadEnemy.wav'];
		// Collision detection on bomb, this is seperate from the one in the enemy class
		// because otherwise there's a bug, feel free to play around with it though
		for (i = bombGroup.childNodes.length - 1; i >= 0; i--) {
		  bomb = bombGroup.childNodes[i];

		  if (this.intersect(bomb)) {
		    scene.incrementScore(this.scoreValue);
		    enemyGroup.removeChild(this);
		    sfxEnemy.play();

		    //Particle effect on death
		    for (var i = 0; i < 10; i++)
		      game.currentScene.addChild(new ParticleBlast(4, 10, this.x, this.y, 90, 91, 'particle0'));

		    // All done, return
		    break;
		  }
		}
		if (this.makeBody == this.topMake && this.topMake != 0) {
			this.makeBody--;
			enemyGroup.addChild(new WormBody(this.x, this.y, this, this.makeBody, this.topHead, this.speed-=0.1));
			this.topHead.bodyLeft++;
		}
		return this[this.currentPathController](this.head);
	}
});