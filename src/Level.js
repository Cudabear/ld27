Level = function(gameInstance, mapName, setName, width, height){
	this.gameInstance = gameInstance;
	this.tileset = this.gameInstance.add.tileset(setName);
	this.map = this.gameInstance.add.tilemap(mapName);
	this.tileset.setCollisionRange(0, this.tileset.total -1, true, true, true, true)
	this.tileset.setCollision (1, false, false, false, false);
	this.tileset.setCollision (5, false, false, false, false);
	this.tileset.setCollision (6, false, false, false, false);
	this.tileset.setCollision (7, false, false, false, false);
	this.tileset.setCollision (8, false, false, false, false);
	this.tileset.setCollision (9, false, false, false, false);
	this.tileset.setCollision (11, false, false, false, false);
	this.tileset.setCollision (12, false, false, false, false);
	this.tileset.setCollision (13, false, false, false, false);
	this.tileset.setCollision (14, false, false, false, false);
	this.tileset.setCollision (18, false, false, false, false);
	this.tileset.setCollision (19, false, false, false, false);

	//inputs
	this.tileset.setCollision (25, false, false, false, false);
	this.tileset.setCollision (24, false, false, false, false);
	this.tileset.setCollision (23, false, false, false, false);
	this.tileset.setCollision (22, false, false, false, false);

	this.layer = this.gameInstance.add.tilemapLayer(0, 0, width, height, this.tileset, this.map, 0);
	this.layer.fixedToCamera = false;
	this.layer.scale= {x:2, y:2};
	//this.layer.resizeWorld();
}
