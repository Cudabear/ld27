Lantern = function(gameInstance, x, y){
	this.gameInstance = gameInstance;
	this.sprite = gameInstance.add.sprite(x,y, 'lantern');
	this.sprite.scale = {x: 2, y: 2};
	this.sprite.body.setSize(26, 32, 3, 0);
	this.sprite.anchor.setTo(0.5, 0.5);
	this.sprite.body.gravity.y = gravity;
	this.lightBubble = glows.create(0, 0, 'light');
	this.lightBubble.scale = {x: 1.0, y:1.0};
	this.lightBubble.body.setSize(192 * 1, 192 * 1, 32*1, 32*1);
	this.lightBubble.body.immovable = true;

	this.isLantern = true;

	this.update = function(){
		this.lightBubble.x = this.sprite.x - 128*1;
		this.lightBubble.y = this.sprite.y - 128*1 + 16;
	}

	this.onOut =  function(){
		this.sprite.kill();
	}

	this.sprite.events.onOutOfBounds.add(this.onOut, this);
}
