var tileset

tileSetInit = function(){
	tileset = game.add.tileset('tiles');

	tileset.setCollisionRange(0, this.tileset.total -1, true, true, true, true)
	tileset.setCollision (5, false, false, false, false);
	tileset.setCollision (6, false, false, false, false);
	tileset.setCollision (7, false, false, false, false);
	tileset.setCollision (8, false, false, false, false);
	tileset.setCollision (9, false, false, false, false);
	tileset.setCollision (11, false, false, false, false);
	tileset.setCollision (12, false, false, false, false);
	tileset.setCollision (13, false, false, false, false);
	tileset.setCollision (14, false, false, false, false);
	tileset.setCollision (18, false, false, false, false);
	tileset.setCollision (19, false, false, false, false);
	//inputs
	tileset.setCollision (25, false, false, false, false);
	tileset.setCollision (24, false, false, false, false);
	tileset.setCollision (23, false, false, false, false);
	tileset.setCollision (22, false, false, false, false);
}