(scene) => {

	// script runs after the scene initialization
	
	// camrea creation
	$new_cam = new rjs.Camera();

	// layers initialization
	$new_bg = new rjs.Layer(scene);
	$new_main = new rjs.Layer(scene);
	$new_ui = new rjs.Layer(scene, vec2(0, 0));

	//setting up some objects

	const logo1 = new rjs.Sprite({
		pos: vec2(-450, 0),
		size: vec2(300, 300),
		texture: t_logo,
		layer: new_bg
	});

	const logo2 = new rjs.Sprite({
		pos: vec2(-450, 0),
		size: vec2(300, 300),
		texture: t_logo_re,
		opacity: 0,
		layer: new_bg
	});

	const logo3 = new rjs.Sprite({
		pos: vec2(0, 0),
		size: vec2(400, 300),
		scale: vec2(1.5, 1.5),
		texture: t_logo_jam,
		opacity: 0,
		layer: new_bg
	});

	const gdu = new FINAL({
		pos: vec2(-200, 0),
		size: 130,
		text: "GameDev United",
		font: "Arial",
		origin: "left-middle",
		layer: new_main
	});

	const re5 = new FINAL({
		pos: vec2(-200, 0),
		size: 130,
		text: "Rect Engine 5",
		font: "Arial",
		origin: "left-middle",
		opacity: 0,
		layer: new_main
	});

	const ese1 = new FINAL({
		pos: vec2(0, -100),
		size: 130,
		text: "ESE:The Mirror",
		opacity: 0,
		layer: new_main
	});

	const ese2 = new FINAL({
		pos: vec2(0, 100),
		text: "Eternal Star Empire",
		color: rgb(150, 200, 255),
		opacity: 0,
		layer: new_main
	});

	const cont = new FINAL({
		pos: vec2(0, 300),
		text: "Press any key to continue...",
		color: rgb(255, 200, 150),
		render: false,
		layer: new_main
	});

	const box = new rjs.Sprite({
		pos: vec2(),
		size: vec2(256, 256),
		opacity: 0,
		layer: new_main
	});

	// new FINAL({
	// 	pos
	// });

	new rjs.KeyDown(() => {
		
		if(!cont.render)
			return;
		s_music.play();
		s_music.setVolume(10);
		rjs.LOADER_MODE = false;
		rjs.checkSourceLoaded();
		rjs.timeStep = 1;
		dial_scene.set();
		// final_scene.set();

	}, null, true, scene);

	let loaded = false;

	const loop = new rjs.GameLoop(() => {

		// the script runs every single frame before the rendering
		// box rotation

		if(rjs.LOADER_MODE) {
			rjs.checkSourceLoaded();
			log(rjs.sourceLoaded);
		}

		if(rjs.LOADER_MODE && rjs.sourceLoaded) {
			// rjs.LOADER_MODE = false;
			// loop.absl = false;
			loaded = true;
		}
		if(loaded) {
			if(logo1.opacity > 0) {
				logo1.opacity --;
				gdu.opacity --;
			}
			else if(logo2.opacity < 100 && logo1.render) {
				logo2.opacity ++;
				re5.opacity ++;
			}
			else if(logo2.opacity == 100 && logo1.render) {
				logo1.render = false;
			}
			else if(logo2.opacity > 0) {
				logo2.opacity --;
				re5.opacity --;
			}
			else if(logo3.opacity < 100 && logo2.render) {
				logo3.opacity ++;
			}
			else if(logo3.opacity == 100 && logo2.render) {
				logo2.render = false;
			}
			else if(logo3.opacity > 0) {
				logo3.opacity --;
			}
			else if(ese1.opacity < 100) {
				ese1.opacity ++;
				ese2.opacity ++;
			}
			else if(ese1.opacity == 100) {
				cont.render = true;
			}
		}

		if(rjs.LOADER_MODE && logo1.opacity == 100) {
			if(logo1.texture.image.loaded) {
				logo1.render = true;
			}
			else 
				logo1.render = false;
		}
		

	}, true, scene, true);

}