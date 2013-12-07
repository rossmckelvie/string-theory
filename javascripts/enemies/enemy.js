Enemy = Class.create(Sprite, {
  collisionDetect: function() {
    var laser, i;

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
        break;
      }
    }
  }
});
