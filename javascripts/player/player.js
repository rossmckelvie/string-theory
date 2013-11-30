Player = Class.create(Sprite, // We extend the Sprite class
{
    initialize: function() { //initialization
        Sprite.call(this, 192, 192); //initialization of the Sprite object
        this.image = game.assets['images/nwomatri.png'];
        this.x = (game.width / 2) - (this.width / 2);;
        this.y = (game.height / 2) - (this.height / 2);;
        this.frame = 7;
		this.increment = 1;
		this.numLasers = 0;
		this.moveSpeed = 5;
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
			
		if (game.input.left && !game.input.right) {
			this.x -= this.moveSpeed;
		}
			
		else if (game.input.right && !game.input.left) {
			this.x += this.moveSpeed;
		}
			
		if (game.input.up && !game.input.down) {
			this.y -= this.moveSpeed;
		}
			
		else if (game.input.down && !game.input.up) {
			this.y += this.moveSpeed;
		}
			
		if (this.x < -this.width/2) {
			this.x = -this.width/2;
		}
		
		if (this.x > game.width - this.width/2) {
			this.x = game.width - this.width/2;
		}
		
		if (this.y < -this.height/2) {
			this.y = -this.height/2;
		}
		
		if (this.y > game.height - this.height/2) {
			this.y = game.height - this.height/2;
		}
			
			
	},
	
});