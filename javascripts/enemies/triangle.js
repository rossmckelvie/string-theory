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
  },

  onenterframe: function() {
    if (!this.super_onenterframe()) return;
    this.followPlayer();
  }
});
