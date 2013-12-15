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
		var lightBubble = game.add.sprite(0, 0, 'light');
		lightBubble.scale = {x: 1.5, y:1.5};
		var level = new Level(game, this.maps[number], 3200, 640);
		var gremlins = [];

		
		var dat = this.parseTiles(game, level, 3200, 640, lightBubble, gremlins);
		dat.push(lightBubble);
		return dat;
	},

	parseTiles: function(game, level, width, height, lightBubble, gremlins){
		var recData = level.map.copy(0, 0, width, height, 1);
		var key = null;
		var player = null;
		var lantern = null;

		for(var i = 0; i < recData.length; i++){
			switch(recData[i].index){
				case monsterTile:
					gremlins.push(new Gremlin(game, null, recData[i].x*64, recData[i].y*64));
				break;
				case keyTile:
					key = new Key(game, recData[i].x*64, recData[i].y*64);
				break;
				case playerTile:
					player = new Player(game, null, null, recData[i].x*64, recData[i].y*64);
				break;
				case lanternTile:
					lantern = new Lantern(game, lightBubble, recData[i].x*64, recData[i].y*64);
				break;
			}
		}

		player.key = key;
		player.lantern = lantern;

		for(var i = 0; i < gremlins.length; i++){
			gremlins[i].key = key;
		}

		/*
		level.map.replace(monsterTile, 0, 0, 0, width, height, 0);
		level.map.replace(keyTile, 0, 0, 0, width, height, 0);
		level.map.replace(playerTile, 0, 0, 0, width, height, 0);
		level.map.replace(lanternTile, 0, 0, 0, width, height, 0);
		*/
	
		return [level, player, key, lantern, gremlins];
	}
}