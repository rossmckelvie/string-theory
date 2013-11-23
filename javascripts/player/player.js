Player = Class.create(Sprite, // We extend the Sprite class
{
    initialize: function() { //initialization
        Sprite.call(this, 192, 192); //initialization of the Sprite object
        this.image = game.assets['images/nwomatri.png'];
        this.x = (game.width / 2) - (this.width / 2);;
        this.y = (game.height / 2) - (this.height / 2);;
        this.frame = 7;
		this.increment = 1;
    },
	
	onenterframe: function () {
            if (this.age % 4 === 0) {
				this.frame += this.increment;
            }
            
            if (this.frame >=11) {
				this.increment = -1;
            }
			
			if (this.frame <= 7) {
				this.increment = 1;
			}
			
			if(game.touched && this.age % 2 === 0 && this.numLasers < 8) {
				new PlayerShoot(this.x, this.y, this.mx, this.my);
                this.numLasers ++;
            }
			
	},
	
});