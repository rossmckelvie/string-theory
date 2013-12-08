Cursor = Class.create(Sprite, {
  initialize: function() {
    Sprite.call(this, 16, 16);
    this.image = game.assets['images/crosshair.png'];
    this.frame = 0;
    this.x = (game.width / 2) - (this.width / 2);
    this.y = (game.height / 2) - (this.height /2);
  },

  onenterframe: function() {
    this.x = mouseX - (this.width / 2);
    this.y = mouseY - (this.width / 2);
  }
})
