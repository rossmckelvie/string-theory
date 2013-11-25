var WelcomeScreen = Class.create(Scene, {
  initialize: function() {
    var game, bg, title, title1, start, particleGroup;

    Scene.apply(this);
    game = Game.instance;

    // Set Background
    bg = new Sprite(game.width, game.height);
    bg.image = game.assets['images/space.jpg'];

    start = new Sprite(315, 29);
    start.image = game.assets['images/start1.png'];
    start.x = game.width/2 - start.width/2;
    start.y = 500;

    title = new Sprite(600, 60);
    title.image = game.assets['images/stringtheory2.png'];
    title.x = game.width/2 - title.width/2;
    title.y = -300;

    title1 = new Sprite(600, 60);
    title1.image = game.assets['images/stringtheory3.png'];
    title1.x = game.width/2 - title.width/2;
    title1.y = -300;

    title.tl.moveTo(title.x, 100, 70);
    title1.tl.moveTo(title1.x, 100, 70);

    particleGroup = new Group();

    this.addEventListener(Event.ENTER_FRAME, function() {
      if (this.age % 2 == 0) {
         particleGroup.addChild(new ParticleStream(800, 800, 100));
         particleGroup.addChild(new ParticleStream(0, 800, 100));
         particleGroup.addChild(new ParticleStream(400, 1200, 100));
      }
      title1.tl.fadeIn(100);
      title1.tl.fadeOut(60);
      start.tl.fadeIn(30);
      start.tl.fadeOut(30);
    });

    this.addChild(bg);
    this.addChild(particleGroup);
    this.addChild(title);
    this.addChild(title1);
    this.addChild(start);
  },

  onenterframe: function(evt) {
    this.addEventListener(Event.TOUCH_START, this.handleClick);
  },

  handleClick: function() {
    Game.instance.popScene();
  }
});

var ParticleStream = Class.create(Sprite, {
   initialize: function(xA, yA, speed) {
      Sprite.call(this, 4, 15);
      this.image = game.assets['images/particle0.png'];
      this.x = xA;
      this.y = yA;
      this.scaleX = 0.5;
      this.scaleY = 0.5;
      this.tl.moveTo(Math.floor(Math.random() * 1000), Math.floor(Math.random() * -600), speed);
      this.addEventListener(Event.ENTER_FRAME, this.update);
   },

   update: function(evt) {
      if (this.y < 10) {
         this.parentNode.removeChild(this);
      }
   }
});