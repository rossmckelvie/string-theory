Circle = Class.create(Enemy, {
  initialize: function(x, y) {
    Sprite.call(this, 50, 50);
    this.image = game.assets['images/circle_glow.png'];
    this.frame = 0;

    this.x = x;
    this.y = y;

    this.radius = this.getRandomRadius(60, 100);
    this.angle = 0;
    this.speed = 8;
    this.scoreValue = 20;

    this.movedToStartPosition = false;
    var offsetX = this.getOffsetValue((game.width / 2) - this.radius * 1.5);
    var offsetY = this.getOffsetValue((game.height / 2) - this.radius * 1.5);

    // Determine start positions and determine centers
    // TOP LEFT (+ offsetX | + offsetY)
    if (x === 0 && y === 0) {
      this.angle = 0;
      this.desireY = this.radius + offsetY;
      this.centerY = this.radius * 2 + offsetY;
      this.desireX = this.radius * 2 + offsetX;
      this.centerX = this.radius * 2 + offsetX;
    }
    // BOTTOM LEFT (+ offsetX | - offsetY)
    else if (x === 0 && y > 0) {
      this.angle = 180;
      this.desireY = game.height - this.height - this.radius - offsetY;
      this.centerY = game.height - this.height - offsetY;
      this.desireX = 0 + offsetX;
      this.centerX = this.radius * 2 + offsetX;
    }
    // TOP RIGHT (- offsetX | + offsetY)
    else if (x > 0 && y === 0) {
      this.angle = 0;
      this.desireY = this.radius + offsetY;
      this.centerY = this.radius * 2 + offsetY;
      this.desireX = game.width - this.width - offsetX;
      this.centerX = game.width - this.width - offsetX;
    }
    // BOTTOM RIGHT (- offsetX | - offsetY)
    else if (x > 0 && y > 0) {
      this.angle = 180;
      this.desireY = game.height - this.height - this.radius - offsetY;
      this.centerY = game.height - this.height - offsetY;
      this.desireX = game.width - this.width - (this.radius * 2) - offsetX;
      this.centerX = game.width - this.width - offsetX;
    }

    // Set vectors for moving into position
    this.xVector = this.desireX - this.x;
    this.yVector = this.desireY - this.y;
    this.startMoveAngle = Math.atan2(this.yVector, this.xVector);
  },

  onenterframe: function() {
    this.collisionDetect();

    // Move into position if needed
    if (!this.movedToStartPosition) {
      this.xSpeed = this.speed * Math.cos(this.startMoveAngle);
      this.ySpeed = this.speed * Math.sin(this.startMoveAngle);

      if (this.xSpeed === 0 && this.ySpeed === 0)
        this.xSpeed = 1;

      this.x += this.xSpeed;
      this.y += this.ySpeed;

      var diff = Math.abs(this.desireX - this.x) + Math.abs(this.desireY - this.y);
      if (diff < this.speed)
        this.movedToStartPosition = true;
      else return;
    }

    // Enrage after some time
    if (this.age > 500 && this.frame === 0) {
      this.frame = 1;
      this.scoreValue *= 2;
    }

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

  getOffsetValue: function(maxOffset) {
    return Math.floor(Math.random() * maxOffset);
  },

  getRandomRadius: function(shortest, longest) {
    return Math.floor(Math.random() * (longest - shortest + 1) + shortest);
  }
});
