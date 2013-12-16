Player = function(gameInstance, key, x, y){
	//initialization
	this.sprite = gameInstance.add.sprite(x, y, 'guy');
	this.sprite.anchor.setTo(.5, .5);
	this.sprite.body.gravity.y = gravity;
	this.sprite.body.setSize(this.sprite.width - 6, this.sprite.height - 6, 3, 3);
	this.key = key;

	gameInstance.camera.follow(this.sprite);
	this.sprite.animations.add('walk', [1, 2], 5);
	this.sprite.animations.add('stand', [0], 5);
	this.sprite.animations.add('hold-walk', [4, 5], 5);
	this.sprite.animations.add('hold-stand', [3], 5);



	this.speed = 250;
	this.isCarrying = false;
	this.carriedItem = null;


	this.pickupButtonCooldown = 0;
	this.laternButtonCooldown = 0;
	this.canJump = true;
	this.jumpHeldFor = 0;

	this.stepfxCooldown = 0;
	

	this.doWalk = function(){
		if(!stepfx.isPlaying && this.sprite.body.touching.down && this.stepfxCooldown === 0){
			stepfx.play();
		}else{
			this.stepfxCooldown++;
			if(this.stepfxCooldown > 20){
				this.stepfxCooldown = 0;
			}
		}

		this.sprite.animations.play(this.isCarrying ? 'hold-walk' : 'walk', 3, false);
	}

	this.doStand = function(){
		this.sprite.animations.play(this.isCarrying ? 'hold-stand' : 'stand', 3, false);
	}

	this.handleInput = function(type){
		if(states.current === states.playing){
			switch(type){
				case 'left':
					this.sprite.body.velocity.x = -this.speed;
					this.sprite.scale.x = -1;
					this.doWalk();
					break;
				case 'right':
						this.sprite.body.velocity.x = this.speed;
						this.sprite.scale.x = 1;
						this.doWalk();
					break;
				case 'jump':
					if(this.canJump){
						this.sprite.body.velocity.y -= 500;
						this.canJump = false

						if(!jumpfx.isPlaying){
							jumpfx.play();
						}
					}
					break;
				case 'pickup':
					//prevent button spam
					if(states.current === states.playing){
						if(this.pickupButtonCooldown <= 0){
							this.pickupButtonCooldown = 8;
							if(!this.isCarrying){
								//attempt to pickup key
								
								if(!this.pickupKey()){
									this.bringOutLantern();
								}
							}else{
								this.dropItem();
							}
						}else{
							this.pickupButtonCooldown--;
						}
					}
					break;
				case 'up':
					var tileType = level.map.getTileWorldXY(this.sprite.x, this.sprite.y, 64, 64, 0);

					if(tileType ===14 || tileType === 13 || tileType === 18 || tileType === 19 || tileType === 15|| tileType === 20){
						if(this.carriedItem === this.key){	
							currentLevel++;
							if(currentLevel > 3){
								currentLevel = 1;
							}
								repeatLevel();
						}
					}
				case 'none':
					this.doStand();
					this.sprite.body.velocity.x = 0;
					break;
				case 'restart':
						states.current = states.gameOver;
						repeatLevel();
						restartfx.play();
						states.current = states.playing;
						text.alpha = 0;
					break;
			}
		}else if(states.current === states.gameOver){
			if(type === 'restart'){
				repeatLevel();
				restartfx.play();
				states.current = states.playing;
				text.alpha = 0;
			}
		}

		if(this.isCarrying){
			this.carriedItem.sprite.x = this.sprite.x + this.sprite.scale.x * (this.carriedItem.isLantern ? 40 : 50);
			this.carriedItem.sprite.y = this.sprite.y - (this.carriedItem.isLantern ? -20 : 0);
			this.carriedItem.sprite.scale.x = this.sprite.scale.x * (this.carriedItem.isLantern ? 2 : 1);
			this.carriedItem.sprite.body.velocity.y = 0;
		}

		if(this.sprite.body.touching.down){
			this.canJump = true;
		}
	}

	//attempt to pick up key, if it is near enough.
	this.pickupKey = function(){
		var distX = Math.abs(this.key.sprite.x - this.sprite.x);
		var distY = Math.abs(this.key.sprite.y - this.sprite.y);
		var dist = Math.sqrt(distX*distX + distY*distY);

		if(dist < 75){
			this.isCarrying = true;
			//this.key.sprite.body.gravity = 0;
			this.carriedItem = this.key;
			pickupfx.play();
			return true;
		}

		return false;
	}

	this.dropItem = function(){
		if(this.sprite.scale.x < 0){
			this.carriedItem.sprite.x += (this.carriedItem.isLantern ? 48 : 50);
		}else{
			this.carriedItem.sprite.x -= (this.carriedItem.isLantern ? 40 : 50);
		}	

		this.isCarrying = false;
		this.carriedItem = null;
	}

	this.putAwayLantern = function(){
		this.isCarrying = false;
		this.carriedItem = null;
	}

	this.bringOutLantern = function(){
		for(var i = 0; i < lanterns.length; i++){
			var distX = Math.abs(lanterns[i].sprite.x - this.sprite.x);
			var distY = Math.abs(lanterns[i].sprite.y - this.sprite.y);
			var dist = Math.sqrt(distX*distX + distY*distY);

			if(dist < 75){
				this.isCarrying = true;
				pickupfx.play();
				this.carriedItem = lanterns[i];
				break;
			}
		}
	}

	this.onOut = function(){
		if(this.sprite !== player.sprite){
			this.sprite.kill();
		}else{
			gameOver();
		}
	}

	this.sprite.events.onOutOfBounds.add(this.onOut, this);
}