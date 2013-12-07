BlackHole = Class.create(Enemy, {
  initialize: function(x, y) {
    Sprite.call(this, 50, 50);
    this.image = game.assets['images/black_hole_glow.png'];
    this.frame = 0;

    this.opacity = 0.0;
    this.displayedFully = false;

    this.scoreValue = 10;
    this.speed = 0;

    this.x = x;
    this.y = y;

    // Get random offset values for start position
    var offsetX = this.getOffsetValue(game.width / 2.5);
    var offsetY = this.getOffsetValue(game.height / 2.5);

    // Set start positions
    // TOP LEFT (+ offsetX | + offsetY)
    if (x === 0 && y === 0) {
      this.x = x + offsetX;
      this.y = y + offsetY;
    }
    // BOTTOM LEFT (+ offsetX | - offsetY)
    else if (x === 0 && y > 0) {
      this.y = game.height - this.height - offsetY;
      this.x = 0 + offsetX;
    }
    // TOP RIGHT (- offsetX | + offsetY)
    else if (x > 0 && y === 0) {
      this.y = 0 + offsetY;
      this.x = game.width - this.width - offsetX;
    }
    // BOTTOM RIGHT (- offsetX | - offsetY)
    else if (x > 0 && y > 0) {
      this.y = game.height - this.height - offsetY;
      this.x = game.width - this.width - offsetX;
    }
  },

  onenterframe: function() {
    this.collisionDetect();

    // Fade in if needed
    if (!this.displayedFully) {
      this.opacity += 0.02;
      if (this.opacity == 1)
        this.displayedFully = true;
      else return;
    }

    // TODO: Absorb nearby enemies
  }
});
