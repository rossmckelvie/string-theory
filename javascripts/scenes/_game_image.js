var GameImage = Class.create(Sprite, {
  initialize: function(img, width, height) {
    Sprite.call(this, width, height);
    this.image = game.assets['images/'+img+'.png'];
    this.frame = 0;
  }
});
