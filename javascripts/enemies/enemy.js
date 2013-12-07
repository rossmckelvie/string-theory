Enemy = Class.create(Sprite, {
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

        //Particle effect on death.  I know this is stupid lol, I'll fix  it later.
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));
        game.currentScene.addChild(new ParticleBlast(this.x, this.y, 90, 91));




        break;
      }
    }
  }
});
