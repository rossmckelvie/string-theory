Circle = Class.create(Sprite, {
  initialize: function(x, y) {
    Sprite.call(this, 50, 50);
    this.image = game.assets['images/circle_glow.png'];
    this.frame = 0;

    this.radius = 80;
    this.angle = 0;
    this.speed = 8;

    // Set y to top of sattelite distance
    if (y - this.radius < 0) {
      this.y = this.radius * 2;
      this.centerY = this.radius * 2;
    }
    else if (y + this.height + this.radius > game.height) {
      this.y = game.height - this.height;
      this.centerY = game.height - this.height;
    }
    else {
      this.y = y - y;
      this.centerY = y;
    }

    // Set x so that it doesn't overflow game
    if (x - (this.radius * 2) < 0) {
      this.x = this.radius * 4;
      this.centerX = this.radius * 2;
    }
    else if (x + this.width > game.width) {
      this.x = game.width - this.width;
      this.centerX = game.width - this.width;
    }
    else {
      this.x = x;
      this.centerX = x - this.radius;
    }

    console.log("start: (" + this.x + ", " + this.y + ")");
  },

  onenterframe: function() {
    // Enrage after some time
    if (this.age > 500)
      this.frame = 1;

    // Pick path to follow
    if (this.frame === 0)
      this.followCirclePath();
    else if (this.frame === 1)
      this.followPlayer();
  },

  followCirclePath: function() {
    // Calculate location on circular path
    x = this.centerX + this.radius * Math.cos(this.angle * Math.PI / 180);
    y = this.centerY + this.radius * Math.sin(this.angle * Math.PI / 180);

    // Move to location
    this.x = x - this.radius;
    this.y = y - this.radius;

    // Update angle
    this.angle += 2;
    if (this.angle > 360) this.angle = 0;
  },

  followPlayer: function() {
    this.xVector = (newPlayer.x + (newPlayer.width / 2)) - (this.x + (this.width / 2));
    this.yVector = (newPlayer.y + (newPlayer.height / 2)) - (this.y + (this.height / 2));
    this.angle = Math.atan2(this.yVector, this.xVector);

    this.xSpeed = this.speed * Math.cos(this.angle);
    this.ySpeed = this.speed * Math.sin(this.angle);

    if (this.xSpeed === 0 && this.ySpeed === 0)
      this.xSpeed = 1;

    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
});
