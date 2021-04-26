(scene) => {

	// script runs after the scene initialization
	
	// camrea creation
	$final_cam = new rjs.Camera();

	// layers initialization
	$final_bg = new rjs.Layer(scene);
	$final_main = new rjs.Layer(scene);
	$final_ui = new rjs.Layer(scene, vec2(0, 0));

	$final_dial = rjs.JSON("final.json");
	$final_step = 0;

	const ft1 = new FINAL({
		pos: vec2(0, 0),
		text: final_dial[0],
		opacity: 0,
		layer: final_ui
	});

	const ft2 = new FINAL({
		pos: vec2(0, 0),
		text: final_dial[1],
		opacity: 0,
		layer: final_ui
	});

	const ft3 = new FINAL({
		pos: vec2(0, 0),
		text: final_dial[2],
		opacity: 0,
		layer: final_ui
	});

	const crystal = new rjs.Sprite({
		pos: vec2(0, 0),
		size: vec2(150, 300),
		texture: t_crystal,
		layer: final_main,
		opacity: 0
	});

	const loop = new rjs.GameLoop(() => {

		s_music.setVolume(s_music.getVolume()/1.1+0.1);

		const t = s_final.getTime();

		const up = 1;
		const down = 0.5;

		if(t < 3.500) {
			ft1.opacity = Math.min(ft1.opacity+up, 100);
			ft2.opacity = 0;
			ft3.opacity = 0;
		}
		else if(t < 7.000) {
			ft1.opacity = Math.max(ft1.opacity-down, 0);
			ft2.opacity = 0;
			ft3.opacity = 0;
		}
		else if(t < 11.500) {
			ft1.opacity = 0;
			ft2.opacity = Math.min(ft2.opacity+up, 100);
			ft3.opacity = 0;
		}
		else if(t < 17.000) {
			ft1.opacity = 0;
			ft2.opacity = Math.max(ft2.opacity-down, 0);
			ft3.opacity = 0;
		}
		else if(t < 18.500) {
			ft1.opacity = 0;
			ft2.opacity = 0;
			ft3.opacity = Math.min(ft3.opacity+up, 100);
		}
		else {
			ft1.opacity = 0;
			ft2.opacity = 0;
			ft3.opacity = Math.max(ft3.opacity-down, 0);
			new rjs.Wait(() => {
				if(s_follow1.getTime() == 0) {
					s_music.stop();
					s_follow1.play();
				}
			}, 200, true, scene);
		}
		final_step ++;
		if(s_follow1.getTime() > 0) {
			crystal.opacity ++;
			rjs.CLEAR_COLOR.r += 0.5;
			rjs.CLEAR_COLOR.g += 0.5;
			rjs.CLEAR_COLOR.b += 0.5;
		}
		if(s_follow1.getTime() == s_follow1.getDuration()) {
			s_follow1.stop();
			rjs.CLEAR_COLOR = rgba(4, 4, 4, 255);
			if(rjs.currentScene == scene)
				credits_scene.set();
		}

	}, true, scene);

}