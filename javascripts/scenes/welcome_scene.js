var WelcomeScreen = Class.create(Scene, {
  initialize: function() {
    var game, bg, title, start, particleGroup, playerSprite, music, selectFX;

    Scene.apply(this);
    game = Game.instance;

    music = game.assets['sounds/hyper.mp3'];
    music.volume = 0.15;
    music.play();
    this.music = music;

    selectFX = game.assets['sounds/select.wav'];
    //selectFX.volume = 0.15;
    this.selectFX = selectFX;

    // Set Background
    bg = new Sprite(game.width, game.height);
    bg.image = game.assets['images/space.jpg'];

    start = new Sprite(315, 29);
    start.image = game.assets['images/start1.png'];
    start.x = game.width/2 - start.width/2;
    start.y = 500;

    title = new Sprite(596, 49);
    title.image = game.assets['images/stringtheory.png'];
    title.x = game.width/2 - title.width/2;
    title.y = -300;

    title.tl.moveTo(title.x, 100, 70);

    playerSprite = new PlayerSprite();

    particleGroup = new Group();

    this.addEventListener(Event.ENTER_FRAME, function() {
      if (this.music.currentTime >= this.music.duration ){
         this.music.play();
      }

      if (this.age % 2 == 0) {
	 //particleGroup.addChild(new Particle(800, 800, 100));
	 //particleGroup.addChild(new ParticleStream(0, 800, 100));
	 //particleGroup.addChild(new ParticleStream(400, 1200, 100));
	particleGroup.addChild(new ParticleBlast(400, 300, 90, 95));
	particleGroup.addChild(new ParticleBlast(400, 300, 90, 95));

      }
      start.tl.fadeIn(30);
      start.tl.fadeOut(30);
    });

    this.addChild(bg);
    this.addChild(particleGroup);
    this.addChild(title);
    this.addChild(start);
    this.addChild(playerSprite);
  },

  onenterframe: function(evt) {
    this.addEventListener(Event.TOUCH_START, this.handleClick);

  },

  handleClick: function() {
    this.selectFX.play();
    this.music.stop();
    game.pushScene(new StringTheoryScene());
  }
});

var PlayerSprite = Class.create(Sprite, {
  initialize: function() {
    Sprite.call(this, 192, 192);
    this.image = game.assets['images/nwomatri.png'];
    this.x = game.width/2 - this.width/2;
    this.y = game.height/2 - this.height/2;
	this.omega = 2;
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },

  update: function(evt) {
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

var ParticleBlast = Class.create(Sprite, {
   initialize: function(xA, yA, speed, blast) {
      Sprite.call(this, 4, 15);
      this.image = game.assets['images/particle0.png'];
      this.x = xA;
      this.y = yA;
      this.blast = blast;
      this.scaleX = 0.5;
      this.scaleY = 0.3;
      this.tl.moveTo(Math.floor(Math.random() * 800), Math.floor(Math.random() * 600), speed);
      this.addEventListener(Event.ENTER_FRAME, this.update);
   },

   update: function(evt) {
      if (this.age > this.blast) {
	this.parentNode.removeChild(this);
      }
      if (this.y < 10 || this.y > 590) {
	 this.parentNode.removeChild(this);
      }
   }
});