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
		
		for(i = 0; i < lasers.length; i++){
            if (lasers[i].x + lasers[i].width < 0 ||
			lasers[i].x - lasers[i].width > game.width ||
			lasers[i].y + lasers[i].height < 0 ||
			lasers[i].y - lasers[i].height > game.height ||
			(lasers[i].dead)){
			
			
			newPlayer.numLasers --;			
			this.removeChild(lasers[i]);
			lasers[i].destroy;
			lasers.pop(lasers[i]);
			}
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
