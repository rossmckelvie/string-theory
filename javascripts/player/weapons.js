PlayerShoot = Class.create(Sprite, // We extend the Sprite class
{
    initialize: function(x, y, mx, my) { //initialization
        Sprite.call(this, 32, 32); //initialization of the Sprite object
        this.image = game.assets['images/balls.png'];
        this.x = (x) + newPlayer.width/2 - (this.width / 2);
        this.y = (y) + newPlayer.height/2 - (this.height / 2);
        this.frame = 0;
		this.increment = 1;
		this.xVector = mx - (x + newPlayer.width/2) ;
		this.yVector = my - (y + newPlayer.height/2);
		console.log(this.xVector + " " + this.yVector);
		this.Angle = Math.atan2(this.yVector, this.xVector);
		console.log(this.Angle);
		this.Spd = 10;
		this.xSpd = this.Spd * Math.cos(this.Angle);
		this.ySpd = this.Spd * Math.sin(this.Angle);
		
		console.log(this.xSpd + " " + this.ySpd);
		this.dead = 0;
		
		if (this.xSpd === 0 && this.ySpd === 0) {
			this.xSpd = 1;
		}
		
		lasers.push(this);
		
    },
	
	onenterframe: function () {
		
		if (this.age % 2 === 0) {
			this.frame += this.increment;
        }
            
		if (this.frame >=2) {
			this.increment = -1;
        }
			
		if (this.frame <= 0) {
			this.increment = 1;
		}

		if (this.x + this.width < 0 ||
			this.x - this.width > game.width ||
			this.y + this.height < 0 ||
			this.y - this.height > game.height ||
			(this.dead)){
			
			newPlayer.numLasers --;
			lasers.pop(this);
			this.parentNode.removeChild(this);
			this.destroy;
		}
		
		this.x = this.x + this.xSpd;
		this.y = this.y + this.ySpd;
		
	}
});