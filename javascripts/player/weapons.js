Weapon = Class.create(Sprite, {


  gunDetect: function(x, y, mx, my) {
    this.x = (x) + newPlayer.width/2 - (this.width / 2);
    this.y = (y) + newPlayer.height/2 - (this.height / 2);

    this.xVector = mx - (x + newPlayer.width/2) ;
    this.yVector = my - (y + newPlayer.height/2);
    this.Angle = Math.atan2(this.yVector, this.xVector) + this.offset;

    this.speedCalc();
  },

  speedCalc: function() {
    this.xSpd = this.Spd * Math.cos(this.Angle);
    this.ySpd = this.Spd * Math.sin(this.Angle);
  },

  outOfBounds: function() {
    if (this.x + this.width < 0 ||  this.x - this.width > game.width ||
      || this.y + this.height < 0 || this.y - this.height > game.height || this.dead) {
      newPlayer.numLasers --;
      lasers.pop(this);
      this.parentNode.removeChild(this);
      this.destroy;
    }
  },

  basicInit: function() {
    this.dead = 0;
    this.frame = 0;
    this.increment = 1;
    this.Spd = 10;
    this.offset = 0;
    this.damage = 1;
    newPlayer.numLasers++;
  },

  move: function() {
    this.x = this.x + this.xSpd;
    this.y = this.y + this.ySpd;

  }
});

PlayerShoot0 = Class.create(Weapon, {

  initialize: function(x, y, mx, my) { //initialization
    Sprite.call(this, 8, 8);
    this.image = game.assets['images/balls_small.png'];

    this.basicInit();
    this.damage = 1;
    this.gunDetect(x, y, mx, my);

    if (this.xSpd === 0 && this.ySpd === 0) {
      this.xSpd = this.Spd;
    }

    lasers.push(this);
  },

  onenterframe: function () {
    if (this.age % 2 === 0) {
      this.frame += this.increment;
    }

    if (this.frame >=2) {
      this.increment = -1;
    }

    if (this.frame <= 0) {
      this.increment = 1;
    }

    this.outOfBounds();
    this.move();

  }
});

PlayerShoot1 = Class.create(Weapon, {

  initialize: function(x, y, mx, my, offset) { //initialization
    Sprite.call(this, 8, 8);
    this.image = game.assets['images/balls_small.png'];

    this.basicInit();
    this.damage = 1;
    this.offset = offset * 5 * Math.PI / 180;
    this.gunDetect(x, y, mx, my);

    if (this.xSpd === 0 && this.ySpd === 0) {
      this.xSpd = this.Spd;
    }

    lasers.push(this);
  },

  onenterframe: function () {
    if (this.age % 2 === 0) {
      this.frame += this.increment;
    }

    if (this.frame >=2) {
      this.increment = -1;
    }

    if (this.frame <= 0) {
      this.increment = 1;
    }

    this.outOfBounds();
    this.move();
  }
});

PlayerShoot2 = Class.create(Weapon, {

  initialize: function(x, y, mx, my) { //initialization
    Sprite.call(this, 32, 32);
    this.image = game.assets['images/balls.png'];

    this.basicInit();
    this.frame = 50;
    this.damage = 3;
    this.offset = (10-20*Math.random()) * Math.PI/180;
    this.gunDetect(x, y, mx, my);

    if (this.xSpd === 0 && this.ySpd === 0) {
      this.xSpd = this.Spd;
    }

    lasers.push(this);
  },

  onenterframe: function () {
    if (this.age % 2 === 0) {
      this.frame += this.increment;
    }

    if (this.frame >=53) {
      this.increment = -1;
    }

    if (this.frame <= 50) {
      this.increment = 1;
    }

    this.outOfBounds();
    this.move();

  }
});

PlayerShoot3 = Class.create(Weapon, {

  initialize: function(x, y, mx, my, gunCounter) { //initialization
    Sprite.call(this, 32, 32);
    this.image = game.assets['images/balls.png'];
    this.basicInit();
    this.damage = 3;
    this.frame = 56
    this.gunDetect(x, y, mx, my);

    this.Angle = 45 * gunCounter * Math.PI / 180;
    this.speedCalc();

    lasers.push(this);

  },

  onenterframe: function () {
    if (this.age % 2 === 0) {
      this.frame += this.increment;
    }

    if (this.frame >=59) {
      this.increment = -1;
    }

    if (this.frame <= 56) {
      this.increment = 1;
    }

    this.outOfBounds();
    this.move();
  }
});
