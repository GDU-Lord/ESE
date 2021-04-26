// code runs when the page just loaded

window.addEventListener('load', (e) => {

	// Rect Engine 5 initialization
	rjs = new RectJS(rjs => {

		// code runs right before the game engine initializtion
		// usually this is the place for implement some plugins

		rjs.WebGL_Canvas.style.imageRendering = "pixelated";
		rjs.ctx2D_Canvas.style.imageRendering = "pixelated";

	});

	// attach some scripts
	rjs.Script("config.js")();
	rjs.Script("families.js")();
	rjs.Script("sources.js")();
	rjs.Script("assets.js")();

	// scene "new" initialization
	new_scene = new rjs.Scene("new");
	dial_scene = new rjs.Scene("dial");
	fight_scene = new rjs.Scene("fight");
	final_scene = new rjs.Scene("final");
	credits_scene = new rjs.Scene("credits");

	// going to the scene "new"
	// dial_scene.set();
	// fight_scene.set();
	new_scene.set();
	// credits_scene.set();
	

});
