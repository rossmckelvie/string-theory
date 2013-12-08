Worm = Class.create(Enemy, // We extend the Sprite class
{
    initialize: function(x, y) { //initialization
	this.super_initialize("Worm", x, y, 50, 50);
	//this.image = game.assets['images/worm_head_glow.png'];
	this.image = game.assets['images/worm_head_glow.png'];
	this.makeBody = 1;
	this.x = x;
	this.y = y;

	this.scoreValue = 20;
	this.health = 1;

	this.speed = 3;
	this.currentPathController = "followPlayer";

	this.moveChoices = [
	  [ "moveRandom", 45 ],
	  [ "followPlayer", 70 ]
	];
	this.moveChoicesTotalWeight = 0;
	for (var i = 0; i < this.moveChoices.length; i++)
	  this.moveChoicesTotalWeight += this.moveChoices[i][1];

    },

    onenterframe: function() {
	if (this.makeBody > 0) {
		game.currentScene.addChild(new WormBody(this.x, this.y, this));
		this.makeBody--;
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

WormBody = Class.create(Sprite, {
	initialize: function(x, y, head) {
		Sprite.call(this, 33, 33);
		this.image = game.assets['images/worm_tail_piece_glow.png'];
		this.x = x - 50;
		this.y = y - 50;
		this.head = head;
	},

	onenterframe: function() {
		angle = this.angleToEntity(this.head);
		this.moveWithDirection(angle);
	},

	angleToEntity: function(entity) {
	  var xVector = (entity.x + (entity.width / 2)) - (this.x + (this.width / 2));
	  var yVector = (entity.y + (entity.height / 2)) - (this.y + (this.height / 2));

	  return Math.atan2(yVector, xVector);
	},

	moveWithDirection: function(direction) {
	  xSpeed = this.speed * Math.cos(direction);
	  ySpeed = this.speed * Math.sin(direction);

	  if (xSpeed === 0 && ySpeed === 0)
	    xSpeed = 1;

	  this.x += xSpeed;
	  this.y += ySpeed;
	}
});