newWorm = Class.create(Sprite, // We extend the Sprite class
{
    initialize: function() { //initialization
        Sprite.call(this, 32, 32); //initialization of the Sprite object
        this.image = game.assets['images/balls.png'];
        this.x = (game.width);
        this.y = (game.height/2);
        this.frame = 83;
		this.moveSpeed = 2;
		this.dead = 0;
		this.xC = this.x + this.width/2;
		this.yC = this.y + this.height/2;
		this.xColl = 0;
		this.yColl = 0;
		this.coll = 0;
    },

	onenterframe: function () {

		this.x -= this.moveSpeed;

		this.xC = this.x + this.width/2;
		this.yC = this.y + this.height/2;

		if (this.x + this.width < 0 ||
			this.x - this.width > game.width ||
			this.y + this.height < 0 ||
			this.y - this.height > game.height ||
			(this.dead)){

			this.parentNode.numEnemies --;
			this.parentNode.removeChild(this);
			this.destroy;
		}

		//collision detection
		for (var j = laserGroup.childNodes.length - 1; j >= 0; j--) {
		    var laser;
		    laser = laserGroup.childNodes[j];
		    if(this.intersect(laser)){
		        this.parentNode.removeChild(this);
		        break;
		    }
		}

		/*for(i = 0; i < lasers.length; i++){
            if(( Math.abs(this.xC - lasers[i].xC ) <= (this.width/2 + lasers[i].width/2)) &&
				(Math.abs(this.yC - lasers[i].yC ) <= (this.height/2 + lasers[i].height/2))) {
                this.coll = 1;
				console.log("XY");
			}

			if((((lasers[i].xC < this.xC) &&
				(lasers[i].xC + lasers[i].xSpd > this.xC)) ||
				((lasers[i].xC > this.xC) &&
				(lasers[i].xC + lasers[i].xSpd < this.xC))) &&
				(Math.abs(lasers[i].yC - this.yC) < (this.height/2 + lasers[i].height/2))) {
				console.log("X");
				this.xColl = 1;
			}

			else{
				this.xColl = 0;
			}


			if((((lasers[i].yC < this.yC) &&
				(lasers[i].yC + lasers[i].ySpd > this.yC)) ||
				((lasers[i].yC > this.yC) &&
				(lasers[i].yC + lasers[i].ySpd < this.yC))) &&
				(Math.abs(lasers[i].xC - this.xC) < (this.width/2 + lasers[i].width/2))){
				console.log("Y");
				this.yColl = 1;
			}

			else {
				this.yColl = 0;
			}


			if (((this.xColl) && (this.yColl))  || (this.coll)) {
				this.dead = 1;
				lasers[i].dead = 1;
			}

		}*/


	},

});