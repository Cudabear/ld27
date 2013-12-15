Level = function(gameInstance, map, width, height){
	this.gameInstance = gameInstance;
	this.map = map;
	this.layer = this.gameInstance.add.tilemapLayer(0, 0, width, height, tileset, map, 0);
	this.layer.fixedToCamera = false;
	this.layer.scale= {x:2, y:2};
}
