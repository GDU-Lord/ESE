(scene) => {

	// script runs after the scene initialization
	
	// camrea creation
	$dial_cam = new rjs.Camera();

	// layers initialization
	$dial_bg = new rjs.Layer(scene);
	$dial_main = new rjs.Layer(scene);
	$dial_frame = new rjs.Layer(scene);
	$dial_av = new rjs.Layer(scene);
	$dial_text = new rjs.Layer(scene, vec2(0, 0));

	new DARK({
		layer: dial_text
	});

	new rjs.Sprite({
		pos: vec2(0, -100),
		size: vec2(rjs.client.w, rjs.client.h).mult(0.7),
		texture: t_dial_bg,
		layer: dial_bg
	});

	$dial = new DIAL({
		pos: vec2(0, 350),
		layer: dial_main,
		private: {
			text_layer: dial_text,
			av_layer: dial_av,
			frame_layer: dial_frame
		}
	});

	$dial_kd = new rjs.KeyDown(e => {
		dial_next();
	}, 32, true, scene);

	$dial_next = function () {
		if(rjs.currentScene != scene)
			return;
		if(typeof DIALS[curDial][curIndex+1] == "undefined")
			return;
		curIndex ++;
		dial.clear = true;
		const cur = DIALS[curDial][curIndex];
		voice(cur.voice);
		if(DIALS[curDial][curIndex].name == "NEXT") {
			dial_kd.stop();
			OUT = true;
		}
	};

	// const mm = new rjs.Click(() => {
	// 	const cur = DIALS[curDial][curIndex];
	// 	if(cur.name != "NEXT") {
			
	// 	}
	// });

	const loop = new rjs.GameLoop(() => {

		log(1);

		const cur = DIALS[curDial][curIndex];
		voice_loop();
		if(cur.name == "Hugh") {
			dial.av1.texture = t_dial_hugh;
			dial.av1.opacity = 100;
			dial.av2.opacity = 75;
		}
		else if(cur.name == "Officer") {
			dial.av2.texture = t_dial_officer;
			dial.av2.opacity = 100;
			dial.av1.opacity = 75;
			// dial.Text.pos = dial.pos.sub(dial.size.div(-2.1, 2.1));
			// dial.Text.origin = "right-top";
		}
		dial.text = cur.text;

		if(OUT && OPC > 99) {
			OUT = false;
			NEXT.set(NEXT_PARAMS);
		}

	}, true, scene);

}