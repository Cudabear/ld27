var splash;
var timeToManfred = 500;
var timeToLogo = 3000;
var timeToKill = 6000;
var everyoneLoaded = false;
var splashOpacity = 1;

var manfred;
var logo;

function splashPreload() {
	splash.load.image('manfredi', 'res/img/manfredi.jpg');
	splash.load.image('logo', 'res/img/logo.png');
}

function splashCreate(){
	manfred = splash.add.sprite(0, 0, 'manfredi');
	manfred.x = WIDTH/2 - manfred.width/2;
	manfred.y = HEIGHT/2 - manfred.height;
	manfred.alpha = 0;
	logo = splash.add.sprite(0, 0, 'logo');
	logo.x = WIDTH/2 - logo.width/2;
	logo.y = HEIGHT/2 + 10;
	logo.alpha = 0;
}

function splashUpdate(){
	if(game.time.now > timeToManfred){
		if(manfred.alpha < 1){
			manfred.alpha += 0.01;
		}
	}

	if(game.time.now > timeToLogo){
		if(logo.alpha < 1){
			logo.alpha += 0.01;
		}
	}

	if(game.time.now > timeToKill){
		showGame();
	}
}

function splashRender(){

}

function winPreload() {
	splash.load.image('manfredi', 'res/img/manfredi.jpg');
	splash.load.image('logo', 'res/img/logo.png');
}

function winCreate(){
	manfred = splash.add.sprite(0, 0, 'manfredi');
	manfred.x = WIDTH/2 - manfred.width/2;
	manfred.y = HEIGHT/2 - manfred.height;
	manfred.alpha = 0;
	logo = splash.add.sprite(0, 0, 'logo');
	logo.x = WIDTH/2 - logo.width/2;
	logo.y = HEIGHT/2 + 10;
	logo.alpha = 0;
}

