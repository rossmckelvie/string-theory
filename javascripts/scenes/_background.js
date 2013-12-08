SpaceBackground = Class.create(Sprite, {
  initialize: function() { //initialization
  this.game = Game.instance;
  Sprite.call(this, game.width, game.height);
  this.surface = new Surface(game.width, game.height);

  this.particleSpacing = 50;

  this.opacity = 0.5;

  this.numXParticles = game.width/this.particleSpacing + 1;
  this.numYParticles = game.height/this.particleSpacing + 1;

  function spaceParticle(x, y) {
    return {
      x : x,
      y : y,
      homeX : x,
      homeY : y
    }
  }

  this.spaceGrid = new Array();
  for (i=0; i < this.numXParticles; i++)
  {
    this.spaceGrid[i] = new Array();
    for (j=0; j < this.numYParticles; j++)
    {
      this.spaceGrid[i][j] = new spaceParticle(this.particleSpacing * i, this.particleSpacing * j);
    }
  }

  this.drawBackground();
  },

  warpSpace: function(x, y, weight, push) {
    for (i=0; i < this.numXParticles; i++)
    {
      for (j=0; j < this.numYParticles; j++)
      {
        var xVector = this.spaceGrid[i][j].homeX - x;
        var yVector = this.spaceGrid[i][j].homeY - y;
        var distance = Math.abs(Math.sqrt( xVector*xVector + yVector*yVector ));
        if(distance >= 30 /*&& distance <= 400*/)
        {
          var Angle = Math.atan2(yVector, xVector);

          this.spaceGrid[i][j].x = this.spaceGrid[i][j].homeX + (weight/distance) * Math.cos(Angle);
          this.spaceGrid[i][j].y = this.spaceGrid[i][j].homeY + (weight/distance)* Math.sin(Angle);
        }
        else /*if(distance <= 400)*/
        {
          var Angle = Math.atan2(yVector, xVector);
          var effect = (distance / 30) * (weight/30);
          this.spaceGrid[i][j].x = this.spaceGrid[i][j].homeX + effect * Math.cos(Angle);
          this.spaceGrid[i][j].y = this.spaceGrid[i][j].homeY + effect * Math.sin(Angle);
        }
        /*else
        {
          this.spaceGrid[i][j].x = this.spaceGrid[i][j].homeX;
          this.spaceGrid[i][j].y = this.spaceGrid[i][j].homeY;;
        }*/
      }
    }
  },

  drawBackground: function() {
    var spaceImg = game.assets['images/space.jpg'];
    this.surface.draw(spaceImg);

    for (i=0; i < this.numXParticles; i++)
    {
      for (j=0; j < this.numYParticles; j++)
      {
        var context = this.surface.context;
        if(i < this.numXParticles - 1)
        {
          context.beginPath();
          context.moveTo(this.spaceGrid[i][j].x, this.spaceGrid[i][j].y);
          context.lineTo(this.spaceGrid[i + 1][j].x, this.spaceGrid[i + 1][j].y);
          context.lineWidth = 1;
          context.strokeStyle = '#669999';
          context.stroke();
        }

        if(j < this.numYParticles - 1)
        {
          context.beginPath();
          context.moveTo(this.spaceGrid[i][j].x, this.spaceGrid[i][j].y);
          context.lineTo(this.spaceGrid[i][j + 1].x, this.spaceGrid[i][j + 1].y);
          context.lineWidth = 1;
          context.strokeStyle = '#669999';
          context.stroke();
        }
      }
    }
    this.image = this.surface;
  },

  onenterframe: function () {
    if (this.age % 2 === 0) {
      this.warpSpace(newPlayer.x + 96, newPlayer.y + 96, 500, 0);
      this.drawBackground();
    }
  }
});
