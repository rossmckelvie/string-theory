Enemy = Class.create(Sprite, {
  // **********************************************************************
  // Requires: this.scoreValue to be set in implementation class
  // **********************************************************************
  collisionDetect: function() {
    var laser, i, sfxEnemy;

    sfxEnemy = game.assets['sounds/deadEnemy.wav'];

    // Collision detection on player
    if (this.intersect(hitbox)) {
      music.stop();
      this.parentNode.endGame();
      return;
    }

    // Collision detection on laser
    for (i = laserGroup.childNodes.length - 1; i >= 0; i--) {
      laser = laserGroup.childNodes[i];

      if (this.intersect(laser)) {
        this.parentNode.incrementScore(this.scoreValue);
        this.parentNode.removeChild(this);
        laserGroup.removeChild(laser);
        sfxEnemy.play();

        //Particle effect on death
        for (var i = 0; i < 25; i++)
          game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));

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
  }
});
