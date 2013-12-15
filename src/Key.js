Key = function(gameInstance, x, y){
	this.gameInstance = gameInstance;
	this.sprite = gameInstance.add.sprite(x, y, 'key');
	this.sprite.body.gravity.y = gravity;
	this.sprite.anchor.setTo(0.5, 0.5);
	this.sprite.body.setSize(this.sprite.width - 10, this.sprite.height - 4, 5, 2);

	this.onOut =  function(){
		if(this !== player.key){
			this.sprite.kill();
		}else{
			gameOver();
		}
	}

	this.sprite.events.onOutOfBounds.add(this.onOut, this);
}