var monsterTile = 22;
var keyTile = 23;
var playerTile = 24;
var lanternTile = 25;

var LevelFactory = {

	

	init: function(){
		this.maps = [game.add.tilemap('level0'),
			game.add.tilemap('level1'),
			game.add.tilemap('level2'),
			game.add.tilemap('level3'),
			game.add.tilemap('level4'),
			game.add.tilemap('level5')
			];
	},

	createLevel: function(game, number){
		var width = 3200;
		var height = 640;
		if(number === 3){
			width = 960;
			height = 3200;
		}

		var level = new Level(game, this.maps[number], width, height);
		var dat = this.parseTiles(game, level, width, height);
		return dat;
	},

	parseTiles: function(game, level, width, height){
		var recData = level.map.copy(0, 0, width, height, 1);
		var key = null;
		var player = null;
		var lanterns = [];
		var gremlins = [];

		for(var i = 0; i < recData.length; i++){
			switch(recData[i].index){
				case monsterTile:
					gremlins.push(new Gremlin(game, null, recData[i].x*64, recData[i].y*64));
				break;
				case keyTile:
					key = new Key(game, recData[i].x*64, recData[i].y*64);
				break;
				case playerTile:
					player = new Player(game, null, recData[i].x*64, recData[i].y*64);
				break;
				case lanternTile:
					lanterns.push(new Lantern(game, recData[i].x*64, recData[i].y*64));
				break;
			}
		}

		player.key = key;

		for(var i = 0; i < gremlins.length; i++){
			gremlins[i].key = key;
		}
	
		return [level, player, key, lanterns, gremlins];
	}
}