var StringTheoryScene = Class.create(Scene, {
  initialize: function() {
    Scene.apply(this);
	bg = new Sprite(game.width, game.height);
    bg.image = game.assets['images/space.jpg'];
    this.addChild(bg);
	newPlayer = new Player();
	this.addChild(newPlayer);
  },

  onenterframe: function() {
		if(game.touched && this.age % 3 === 0) {
				laser = new PlayerShoot(newPlayer.x, newPlayer.y, newPlayer.mx, newPlayer.my);
				this.addChild(laser);
                newPlayer.numLasers ++;
		}
		
		
		
	},
  
  ontouchstart: function (e) {
            newPlayer.my = e.y;
            newPlayer.mx = e.x;
            game.touched = true;
			
    },
        
    ontouchmove: function (e) {
			newPlayer.my = e.y;
            newPlayer.mx = e.x;
            game.touched = true;
    },
    
    ontouchend: function (e) {
            newPlayer.my = e.y;
            newPlayer.mx = e.x;
            game.touched = false;
    },
});
