Enemy = Class.create(Sprite, {
  super_initialize: function(x, y, width, height) {
    Sprite.call(this, width, height);

    this.flickerOn = false;
    this.health = 1;
    this.speed = 1;
    this.scoreValue = 0;
  },

  // **********************************************************************
  // Requires:
  //   - this.scoreValue to be set in implementation class
  //   - this.health to be set in implementation class
  // **********************************************************************
  collisionDetect: function() {
    var laser, i, sfxEnemy;

    sfxEnemy = game.assets['sounds/deadEnemy.wav'];

    // Collision detection on player
    if (this.intersect(hitbox)) {
      music.stop();
      scene.endGame();
      return;
    }

    // Collision detection on laser
    for (i = laserGroup.childNodes.length - 1; i >= 0; i--) {
      laser = laserGroup.childNodes[i];

      if (this.intersect(laser)) {
        laserGroup.removeChild(laser);

        //Particle effect on death
        for (var i = 0; i < 25; i++)
          game.currentScene.addChild(new ParticleBlast(4, 15, this.x, this.y, 90, 91, 'particle0'));

        // Decrememnt health
        --this.health;

        // Flicker if not dead
        if (this.health > 0) {
          this.flicker();
        }

        // Die if health is now zero
        else {
          scene.incrementScore(this.scoreValue);
          enemyGroup.removeChild(this);
          sfxEnemy.play();

          //Particle effect on death
          for (var i = 0; i < 25; i++)
            game.currentScene.addChild(new ParticleBlast(4, 15, this.x, this.y, 90, 91, 'particle0'));
        }

        // All done, return
        break;
      }
    }

    // Collision detection on bomb
    for (i = bombGroup.childNodes.length - 1; i >= 0; i--) {
      bomb = bombGroup.childNodes[i];

      if (this.intersect(bomb)) {
        scene.incrementScore(this.scoreValue);
        enemyGroup.removeChild(this);
        sfxEnemy.play();

        //Particle effect on death
        for (var i = 0; i < 25; i++)
          game.currentScene.addChild(new ParticleBlast(4, 15, this.x, this.y, 90, 91, 'particle0'));

        // All done, return
        break;
      }
    }

  },

  // **********************************************************************
  // Requires: this.speed to be set in implementation class
  // **********************************************************************
  followPlayer: function() {
    var xVector = (newPlayer.x + (newPlayer.width / 2)) - (this.x + (this.width / 2));
    var yVector = (newPlayer.y + (newPlayer.height / 2)) - (this.y + (this.height / 2));
    var angle = Math.atan2(yVector, xVector);

    xSpeed = this.speed * Math.cos(angle);
    ySpeed = this.speed * Math.sin(angle);

    if (xSpeed === 0 && ySpeed === 0)
      xSpeed = 1;

    this.x += xSpeed;
    this.y += ySpeed;
  },

  getOffsetValue: function(maxOffset) {
    return Math.floor(Math.random() * maxOffset);
  },

  super_onenterframe: function() {
    this.collisionDetect();

    if (this.flickerOn && (this.startFlickerAge + 3 == this.age)) {
      this.opacity = 1;
      this.flickerOn = false;
    }
  },

  flicker: function() {
    this.flickerOn = true;
    this.startFlickerAge = this.age;
    this.opacity = 0.5;
  }
});
