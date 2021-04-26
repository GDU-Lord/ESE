(scene) => {

	// script runs after the scene initialization
	
	// camrea creation
	$credits_cam = new rjs.Camera();

	// layers initialization
	$credits_bg = new rjs.Layer(scene);
	$credits_main = new rjs.Layer(scene);
	$credits_ui = new rjs.Layer(scene, vec2(0, 0));

	new FINAL({
		pos: vec2(0, -400),
		size: 130,
		text: "ESE:The Mirror",
		layer: credits_main
	});

	new FINAL({
		pos: vec2(0, -230),
		text: "Eternal Star Empire",
		color: rgb(150, 200, 255),
		layer: credits_main
	});

	new FINAL({
		pos: vec2(-800, -150),
		size: 50,
		origin: "left-top",
		text: "The game was made in 13 days\n\nfor Gamedev.js game jam 2021\n\nBy [GameDev United] team",
		color: rgb(200, 200, 150),
		layer: credits_main
	});

	new FINAL({
		pos: vec2(-800, 150),
		size: 50,
		origin: "left-top",
		text: "Lord ØST - Game design & story & code\n\nSechsUndVierzig - Art\n\nroobertαng - Voice acting\n\nMelsDean - Music",
		color: rgb(200, 140, 130),
		layer: credits_main
	});

	const b1 = new rjs.Sprite({
		pos: vec2(550, -90),
		size: vec2(600, 100),
		color: rgb(130, 160, 170),
		layer: credits_main
	});

	const b2 = new rjs.Sprite({
		pos: vec2(550, 30),
		size: vec2(600, 100),
		color: rgb(170, 160, 130),
		layer: credits_main
	});

	new FINAL({
		pos: b1.pos,
		size: 50,
		text: "Rate the game!",
		color: rgb(4, 4, 4),
		layer: credits_main
	});

	new FINAL({
		pos: b2.pos,
		size: 50,
		text: "Rect Engine 5",
		color: rgb(4, 4, 4),
		layer: credits_main
	});

	new rjs.Sprite({
		pos: vec2(550, 310),
		size: vec2(420, 420),
		texture: t_logo,
		layer: credits_main
	});

	const click = new rjs.Click(e => {
		if(rjs.MouseOver(b2)) {
			window.open("https://github.com/GDU-Lord/RE-5");
		}
	});

	const loop = new rjs.GameLoop(() => {

		if(rjs.MouseOver(b1) || rjs.MouseOver(b2)) {
			rjs.eventDetector.style.cursor = "pointer";
		}
		else {
			rjs.eventDetector.style.cursor = "default";
		}

	}, true, scene);

}