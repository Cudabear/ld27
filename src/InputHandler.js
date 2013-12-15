InputHandler = function(gameInstance, handler){
	//initialization
	this.gameInstance = gameInstance;
	this.handler = handler;
	this.jumpKey = Phaser.Keyboard.X;
	this.pickupKey = Phaser.Keyboard.Z;
	this.leftKey = Phaser.Keyboard.LEFT;
	this.rightKey = Phaser.Keyboard.RIGHT;
	this.upKey = Phaser.Keyboard.UP;
	this.restartKey = Phaser.Keyboard.R;

	this.lastRInput = 0;

	this.handleInput = function(){
		//handle actions
		if(this.gameInstance.input.keyboard.isDown(this.pickupKey)){
			this.handler.handleInput('pickup');
		}

		if(this.gameInstance.input.keyboard.isDown(this.jumpKey)){
			this.handler.handleInput('jump');
		}

		if(this.gameInstance.input.keyboard.isDown(this.restartKey)){
			if(this.lastRInput + 1000 < game.time.now){
				this.handler.handleInput('restart');
				this.lastRInput = game.time.now;
			}
		}

		//handle movement
		if(this.gameInstance.input.keyboard.isDown(this.leftKey)){
			this.handler.handleInput('left');
		}else if(this.gameInstance.input.keyboard.isDown(this.rightKey)){
			this.handler.handleInput('right');
		}else{
			this.handler.handleInput('none');
		}

		//handle level finish
		if(this.gameInstance.input.keyboard.isDown(this.upKey)){
			this.handler.handleInput('up');
		}
	}
}