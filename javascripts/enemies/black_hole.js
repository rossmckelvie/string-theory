BlackHoleSquare = Class.create(Enemy, {
  initialize: function(x, y) {
    this.super_initialize("BlackHoleSquare", x, y, 34, 34);

    this.image = game.assets['images/black_hole_square_glow.png'];
    this.frame = 0;

    this.scoreValue = 2;
    this.speed = 7;

    this.x = x;
    this.y = y;

    this.absorbable = false;
  },

  onenterframe: function() {
    if (!this.super_onenterframe()) return;
    this.followPlayer();
  }
});

BlackHole = Class.create(Enemy, {
  initialize: function(x, y) {
    this.super_initialize("BlackHole", x, y, 50, 50);

    this.image = game.assets['images/black_hole_glow.png'];
    this.frame = 0;

    this.opacity = 0.0;
    this.displayedFully = false;

    this.scoreValue = 10;
    this.speed = 0;
    this.health = 1;

    this.x = x;
    this.y = y;

    this.gravitationalPull = 200;
    this.absorbable = false;

    this.pulseRate = 20;
    this.pulseDirection = 1;
    this.enemiesInside = 0;
    this.exploding = false;

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
    this.super_onenterframe();

    // Fade in if needed
    if (!this.displayedFully) {
      this.opacity += 0.02;
      if (this.opacity >= 1)
        this.displayedFully = true;
      else return;
    }

    // If exploding, spawn the squares
    if (this.exploding) {
      if (this.age % 5 === 0) {
        square = new BlackHoleSquare(this.x, this.y);
        enemyGroup.addChild(square);
        this.explodeAmount--;
      }

      if (this.explodeAmount === 0) enemyGroup.removeChild(this);
      else if (this.explodeAmount % 5 === 0) this.frame--;

      return;
    }

    // Absorb nearby enemies
    for (var i = 0; i < enemyGroup.childNodes.length; i++) {
      var enemy = enemyGroup.childNodes[i];

      if (this.within(enemy, this.gravitationalPull) && enemy.absorbable)
       enemy.absorbIntoBlackHole(this);
    }

    // Pulse if needed
    if (this.enemiesInside > 0)
      this.pulse();
  },

  absorbEnemy: function(enemy) {
    this.enemiesInside++;
    this.health += enemy.health;
    this.scoreValue += enemy.scoreValue;
    this.pulseRate -= this.health;

    if (this.health === 15)
      this.explode();
  },

  pulse: function() {
    if (this.age % this.pulseRate === 0) {
      if (this.frame === 4 || (this.frame === 1 && this.pulseDirection === -1))
       this.pulseDirection *= -1;

      this.frame += this.pulseDirection;
    }
  },

  explode: function() {
    this.exploding = true;
    this.explodeAmount = 15;
    this.frame = 4;
  }
});
