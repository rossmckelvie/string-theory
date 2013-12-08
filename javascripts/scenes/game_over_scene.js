var GameOverScreen = Class.create(Scene, {
  initialize: function(score, highscore) {
    var game, bg;

    Scene.apply(this);
    game = Game.instance;

    // Set background
    bg = new Sprite(game.width, game.height);
    bg.image = game.assets['images/space.jpg'];
    this.addChild(bg);

    var img = new GameImage('gameover1', 523, 58);
    img.x = (game.width / 2) - (this.width / 2);
    img.y = (game.height / 2) - (this.height / 2);
    this.addChild(img);

    restart = new Sprite(384, 29);
    restart.image = game.assets['images/restart.png'];
    restart.x = game.width/2 - restart.width/2;
    restart.y = 600;
    this.addChild(restart);

    // Add score
    this.scoreLabel = new Label("Score: " + score);
    this.scoreLabel.color = "white";
    this.scoreLabel.font = "24px ProximaNova";
    this.scoreLabel.textAlign = 'center';
    this.scoreLabel.x = (game.width / 2) - (this.scoreLabel.width / 2);
    this.scoreLabel.y = img.y + img.height + 40;
    this.addChild(this.scoreLabel);

    // Calculate highscore
    this.highscore = highscore
    if (score > this.highscore || this.highscore === undefined)
      this.highscore = score;

    // Add highscore
    this.highScoreLabel = new Label("High Score: " + this.highscore);
    this.highScoreLabel.color = "white";
    this.highScoreLabel.font = "24px ProximaNova";
    this.highScoreLabel.textAlign = 'center';
    this.highScoreLabel.x = (game.width / 2) - (this.highScoreLabel.width / 2);
    this.highScoreLabel.y = this.scoreLabel.y + 40;
    this.addChild(this.highScoreLabel);
  },

  onenterframe: function(evt) {
    restart.tl.fadeIn(30);
    restart.tl.fadeOut(30);

    this.addEventListener(Event.TOUCH_START, this.handleClick);
  },

  handleClick: function() {
    Game.instance.replaceScene(new StringTheoryScene(this.highscore));
  }
});
