Enemy = Class.create(Sprite, {
  super_initialize: function(name, x, y, width, height) {
    Sprite.call(this, width, height);

    this.name = name;
    this.absorbable = true;
    this.flickerOn = false;
    this.health = 1;
    this.speed = 1;
    this.scoreValue = 0;
    this.movingToBlackHole = false;
    this.moveToBlackHoleSpeed = 5;
    this.blackHole = undefined;
    this.blackHoleAngle = 0;
    this.angle = 0;
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
      scene.playerDead();
      return;
    }
    if (this.wormBody != 1) {
      // Collision detection on laser
      for (i = laserGroup.childNodes.length - 1; i >= 0; i--) {
        laser = laserGroup.childNodes[i];

        if (this.intersect(laser)) {

          //Particle effect on hit
          for (var i = 0; i < 10; i++)
            game.currentScene.addChild(new ParticleBlast(4, 10, this.x, this.y, 90, 91, 'particle0'));

          // Decrememnt health and remove laser
          this.health -= laser.damange;
          laserGroup.removeChild(laser);

          //worm collision
          if (this.worm === 1) {
            if (this.bodyLeft > 0) {
              for (var i = enemyGroup.childNodes.length - 1; i >= 0; i--) {
                enemy = enemyGroup.childNodes[i];
                if (enemy.topHead == this) {
                  enemyGroup.removeChild(enemy);
                  this.bodyLeft--;
                  scene.incrementScore(this.scoreValue);
                  sfxEnemy.play();
                  //Particle effect on death
                  break;
                }
              }
            }
            else {
              scene.incrementScore(this.scoreValue);
              enemyGroup.removeChild(this);
              sfxEnemy.play();

              //Particle effect on death
              for (var i = 0; i < 10; i++)
                game.currentScene.addChild(new ParticleBlast(4, 10, this.x, this.y, 90, 91, 'particle0'));
            }
          }
          //collision for everything
          else {
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
              for (var i = 0; i < 10; i++)
                game.currentScene.addChild(new ParticleBlast(4, 10, this.x, this.y, 90, 91, 'particle0'));
            }
          }
          // All done, return
          break;
        }
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
        for (var i = 0; i < 10; i++)
          game.currentScene.addChild(new ParticleBlast(4, 10, this.x, this.y, 90, 91, 'particle0'));

        // All done, return
        break;
      }
    }

  },

  /*collisionDetectBombOnly: function() {
    // Collision detection on bomb
    sfxEnemy = game.assets['sounds/deadEnemy.wav'];
    for (i = bombGroup.childNodes.length - 1; i >= 0; i--) {
      bomb = bombGroup.childNodes[i];

      if (this.intersect(bomb)) {
        scene.incrementScore(this.scoreValue);
        enemyGroup.removeChild(this);
        sfxEnemy.play();

        //Particle effect on death
        for (var i = 0; i < 10; i++)
          game.currentScene.addChild(new ParticleBlast(4, 15, this.x, this.y, 90, 91, 'particle0'));

        // All done, return
        break;
      }
    }
  },*/

  // **********************************************************************
  // Requires: this.speed to be set in implementation class
  // **********************************************************************
  followPlayer: function() {
    this.angle = this.angleToEntity(newPlayer);
    this.moveWithDirection(this.angle);
  },

  followWorm: function(wormHead) {
    this.angle = this.angleToEntity(wormHead);
    this.moveWithDirection(this.angle);
  },

  moveWithDirection: function(direction) {
    xSpeed = this.speed * Math.cos(direction);
    ySpeed = this.speed * Math.sin(direction);

    if (xSpeed === 0 && ySpeed === 0)
      xSpeed = 1;

    this.x += xSpeed;
    this.y += ySpeed;
  },

  absorbIntoBlackHole: function(black_hole) {
    if (this.blackHole !== undefined) return;

    this.movingToBlackHole = true;
    this.blackHole = black_hole;
    this.blackHoleAngle = this.angleToEntity(this.blackHole);
    this.absorbable = false;
  },

  getOffsetValue: function(maxOffset) {
    return Math.floor(Math.random() * maxOffset);
  },

  // **********************************************************************
  // Returns: true if inherting class can continue with it's onenterframe,
  //          or false if being absorbed by black hole and en route
  // **********************************************************************
  super_onenterframe: function() {
    // Collision detect
    this.collisionDetect();

    // Check for flicker
    if (this.flickerOn && (this.startFlickerAge + 3 == this.age)) {
      this.opacity = 1;
      this.flickerOn = false;
    }

    // Check for black hole absorption
    if (this.movingToBlackHole) {

      // Black hole may have been destroyed on the way
      if (this.blackHole === undefined) {
        this.movingToBlackHole = false;
        return true;
      }

      // Move towards black hole
      this.moveWithDirection(this.blackHoleAngle);

      // If we're on the black hole, get absorbed
      if (this.within(this.blackHole, 10)) {
        this.x = -100;
        this.y = -100;
        this.blackHole.absorbEnemy(this);
        this.movingToBlackHole = false;
        enemyGroup.removeChild(this);
      }
    }

    // If not being absorbed, or in a black hole, return true.
    // Otherwise, Enemy controls the subclass's movement
    return this.blackHole === undefined;
  },

  flicker: function() {
    this.flickerOn = true;
    this.startFlickerAge = this.age;
    this.opacity = 0.5;
  },

  angleToEntity: function(entity) {
    var xVector = (entity.x + (entity.width / 2)) - (this.x + (this.width / 2));
    var yVector = (entity.y + (entity.height / 2)) - (this.y + (this.height / 2));

    return Math.atan2(yVector, xVector);
  }
});
