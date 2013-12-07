Triangle = Class.create(Enemy, {
  initialize: function(x, y) {
    Sprite.call(this, 50, 50);
    this.image = game.assets['images/triangle_glow.png'];
    this.frame = 0;

    this.x = x;
    this.y = y;

    this.speed = 2;
    this.scoreValue = 10;
  },

  onenterframe: function() {
    this.collisionDetect();
    this.followPlayer();
  }
});
