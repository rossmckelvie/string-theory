var GameImage = Class.create(Sprite, {
  initialize: function(img, width, height) {
    Sprite.call(this, width, height);
    this.image = game.assets['images/'+img+'.png'];

    this.x = (game.width / 2) - (this.width / 2);
    this.y = (game.height / 2) - (this.height / 2);
    this.frame = 0;
  }
});
