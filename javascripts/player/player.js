Player = Class.create(Sprite, {
  initialize: function(hitbox) { //initialization
    Sprite.call(this, 192, 192);
    this.image = game.assets['images/nwomatri.png'];

    this.x = (game.width / 2) - (this.width / 2);
    this.y = (game.height / 2) - (this.height / 2);

    this.frame = 7;
    this.increment = 1;
    this.numLasers = 0;
    this.moveSpeed = 5;
    this.omega = 2;
    this.hitbox = hitbox;
  },

  onenterframe: function () {
    if (this.age % 4 === 0) {
      this.frame += this.increment;
    }

    if (this.frame >=11) {
      this.increment = -1;
    }

    if (this.frame <= 7) {
      this.increment = 1;
    }

    this.rotate(this.omega);

    if (game.input.left && !game.input.right) {
      this.x -= this.moveSpeed;
      this.hitbox.x -=this.moveSpeed;
    }

    else if (game.input.right && !game.input.left) {
      this.x += this.moveSpeed;
      this.hitbox.x +=this.moveSpeed;
    }

    if (game.input.up && !game.input.down) {
      this.y -= this.moveSpeed;
      this.hitbox.y -=this.moveSpeed;
    }

    else if (game.input.down && !game.input.up) {
      this.y += this.moveSpeed;
      this.hitbox.y +=this.moveSpeed;
    }

    if (this.x < -this.width/2) {
      this.x = -this.width/2;
      this.hitbox.x = -this.hitbox.width/2;
    }

    if (this.x > game.width - this.width/2) {
      this.x = game.width - this.width/2;
      this.hitbox.x = game.width -this.hitbox.width/2;
    }

    if (this.y < -this.height/2) {
      this.y = -this.height/2;
      this.hitbox.y = -this.hitbox.height/2;
    }

    if (this.y > game.height - this.height/2) {
      this.y = game.height - this.height/2;
      this.hitbox.y = game.height -this.hitbox.height/2;
    }
  }

});


var PlayerHitbox = Class.create(Sprite, {
   initialize: function() {
      Sprite.call(this, 30, 26);
      this.image = game.assets['images/playerHitbox.png'];
   }
});