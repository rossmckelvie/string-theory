Square = Class.create(Enemy, {
  initialize: function(x, y) {
    this.super_initialize("Square", x, y, 50, 50);

    this.image = game.assets['images/square_glow.png'];
    this.frame = 0;

    this.x = x;
    this.y = y;

    this.scoreValue = 20;
    this.health = 2;

    this.speed = 5;
    this.currentPathController = "followPlayer";
    this.frame = 0;

    this.moveChoices = [
      [ "moveRandom", 45 ],
      [ "followPlayer", 70 ]
    ];
    this.moveChoicesTotalWeight = 0;
    for (var i = 0; i < this.moveChoices.length; i++)
      this.moveChoicesTotalWeight += this.moveChoices[i][1];
  },

  onenterframe: function() {
    if (!this.super_onenterframe()) return;

    // Every 30 steps, choose random direction or follow
    if (!(this.age % 30 === 0)) return this[this.currentPathController]();

    var random = Math.floor(Math.random() * this.moveChoicesTotalWeight);
    var i, cumulativeWeight = 0;

    for (i = 0; i < this.moveChoices.length; i++) {
      cumulativeWeight += this.moveChoices[i][1];

      if (random < cumulativeWeight) {
        this.currentPathController = this.moveChoices[i][0];
        break;
      }
    }

    return this[this.currentPathController]();
  },

  moveRandom: function() {
    if (this.age % 30 === 0) {
      this.randomX = Math.floor(Math.random() * (game.width - (this.width / 2)));
      this.randomY = Math.floor(Math.random() * (game.height - (this.height / 2)));
      this.randomAngle = Math.atan2(this.randomX - this.x, this.randomY - this.y);
    }

    this.randomXSpeed = this.speed * Math.cos(this.randomAngle);
    this.randomYSpeed = this.speed * Math.sin(this.randomAngle);

    if (this.randomXSpeed === 0 && this.randomYSpeed === 0)
      this.randomXSpeed = 1;

    var newX = this.x + this.randomXSpeed + this.width;
    var newY = this.y + this.randomYSpeed + this.height;

    if (newX >= game.width || newX <= 0) this.randomXSpeed *= -1;
    if (newY >= game.height || newY <= 0) this.randomYSpeed *= -1;

    this.x += this.randomXSpeed;
    this.y += this.randomYSpeed;
  }
});
