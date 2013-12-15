Lantern = function(gameInstance, lightBubble, x, y){
	this.gameInstance = gameInstance;
	this.sprite = gameInstance.add.sprite(x,y, 'lantern');
	this.sprite.scale = {x: 2, y: 2};
	this.sprite.body.setSize(26, 32, 3, 0);
	this.sprite.anchor.setTo(0.5, 0.5);
	this.sprite.body.gravity.y = gravity;
	this.lightBubble = lightBubble;
	this.lightBubble.body.setSize(138 * 1.5, 138 * 1.5, 29*1.5, 29*1.5);
	this.lightBubble.body.immovable = true;

	this.onOut =  function(){
		this.sprite.kill();
	}

	this.sprite.events.onOutOfBounds.add(this.onOut, this);
}
