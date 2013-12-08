Triangle = Class.create(Enemy, {
  initialize: function(x, y) {
    this.super_initialize("Triangle", x, y, 50, 50);

    this.image = game.assets['images/triangle_glow.png'];
    this.frame = 0;

    this.x = x;
    this.y = y;

    this.speed = 2;
    this.scoreValue = 10;
    this.health = 1;
	this.angleDiff = 0;
	this.startAngle = -90;
  },

  onenterframe: function() {
    if (!this.super_onenterframe()) return;
    this.followPlayer();
    
	this.angleDiff = this.angle * 180 / Math.PI - this.rotation - this.startAngle;
	this.rotate(this.angleDiff);
	
  }
});
