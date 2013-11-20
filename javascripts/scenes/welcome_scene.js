var WelcomeScreen = Class.create(Scene, {
  initialize: function() {
    var game, bg;

    Scene.apply(this);
    game = Game.instance;

    // Set Background
    bg = new Sprite(game.width, game.height);
    bg.image = game.assets['images/space.jpg'];
    this.addChild(bg);

    // Add welcome text
    var welcomeLabel = new Label("Click to Start");
    welcomeLabel.color = "white";
    welcomeLabel.x = (game.width / 2) - (welcomeLabel.width / 2);
    welcomeLabel.y = (game.height / 2) - (welcomeLabel.height / 2);
    this.addChild(welcomeLabel);
  },

  onenterframe: function(evt) {
    this.addEventListener(Event.TOUCH_START, this.handleClick);
  },

  handleClick: function() {
    Game.instance.popScene();
  }
});
