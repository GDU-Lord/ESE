(scene, {stage = 0} = {}) => {
	
	// the script runs 
	// params - the start parameters

	$MIN_DIST = 100000;
	$SHOOT = false;
	$CHASE = true;
	$CLONE = false;
	$STAGE_1 = true;
	$MOVE = false;
	$DAMAGE = false;
	$PLAY = false;
	$CONTROL = true;
	$MOVE_TO_POINT = false;

	CHECK_IF_MOVED = false;

	if(stage == 1) {
		GEN_BG();

		MIN_DIST = 1500;
		SHOOT = false;
		CHASE = true;
		CLONE = true;
		DAMAGE = true;
		MOVE = true;
		PLAY = true;
		CONTROL = true;
		MOVE_TO_POINT = false;

		STAGE_1 = false;

		DIAL_MOVE = true;

		$player = new PLAYER({
			pos: vec2(-1000, 0),
			layer: fight_main,
			private: {
				i: 0,
				elems: fight_elems,
				markers: fight_markers,
				bulletsGroup: G_BULLETS,
				map: minimap
			}
		});

		dark.opacity = 100;
		dark.out = false;

		// $start_trigger = new TRIGGER({

		// 	pos: vec2(-1000, 0),
		// 	size: vec2(100, 100),
		// 	layer: fight_triggers,
		// 	render: false,
		// 	private: {
		// 		yes: [STAGE_1],
		// 		no: [CHASE],
		// 		target: player,
		// 		action: () => {
					
		// 			rjs.Wait(() => {

		// 				CHASE = true;
		// 				SHOOT = true;
		// 				MIN_DIST = 500;

		// 			}, 60, true, scene);

		// 		},
		// 		loops: [
		// 			function () {
			
		// 				if(STAGE_1 && !CHASE && rjs.Collision(this, this.target)) {
		// 					this.action();
		// 					this.destroy();
		// 				}
				
		// 			}
		// 		]
		// 	}

		// });

		fight_dial.frame1.render = fight_dial.frame2.render = fight_dial.av1.render = fight_dial.av2.render = false;
		fight_dial.destroy();

		minimap.parent = player;

		for(let i = 1; i <= 10; i ++) {
			new FRIEND({
				pos: vec2(-1000, -i*400),
				layer: fight_main,
				angle: 90,
				private: {
					i: -i,
					elems: fight_elems,
					markers: fight_markers,
					bulletsGroup: G_BULLETS
				}
			});
		}

		for(let i = 1; i <= 10; i ++) {
			new FRIEND({
				pos: vec2(-1000, i*400),
				layer: fight_main,
				angle: 90,
				private: {
					i: i,
					elems: fight_elems,
					markers: fight_markers,
					bulletsGroup: G_BULLETS
				}
			});
		}
		
		// switching to the camera "new_cam"
	}
	else if(stage == 0) {

		// GEN_BG();

		SHOOT = true;
		CHASE = false;
		MOVE_TO_POINT = false;

		$tiled_bg = new rjs.Sprite({
			pos: vec2(),
			size: vec2(rjs.client.w*10, rjs.client.h*10),
			texture: t_tiled_bg,
			layer: fight_bg,
			families: [F_MARKERS],
			color: rgb(150, 150, 200)
		});

		$player = new PLAYER({
			pos: vec2(0, 0),
			layer: fight_main,
			private: {
				i: 0,
				elems: fight_elems,
				markers: fight_markers,
				bulletsGroup: G_BULLETS,
				map: minimap
			}
		});

		new ENEMY({
			pos: vec2(0, 500),
			layer: fight_main,
			private: {
				i: 0,
				hp: 5,
				elems: fight_elems,
				markers: fight_markers,
				bulletsGroup: G_BULLETS
			}
		});

		curDial = 1;
		curIndex = 0;
		const cur = DIALS[curDial][curIndex];
		voice(cur.voice);	
		NEXT = dial_scene;
		NEXT_PARAMS = {dial:1};

		minimap.parent = player;

		new rjs.Wait(() => {
			if(curIndex == 0) {
				curIndex = 1;
				const cur = DIALS[curDial][curIndex];
				voice(cur.voice);
				fight_dial.clear = true;
				new rjs.Wait(() => {
					if(curIndex == 1) {
						curIndex = 2;
						fight_dial.clear = true;
					}
					new rjs.Wait(() => {
						CHECK_IF_MOVED = true;
					}, 200, true, scene);
				}, 200, true, scene);
			}
		}, 450, true, scene);

	}
	else if(stage == 2) {

		MIN_DIST = 500;
		SHOOT = true;
		CHASE = true;
		CLONE = false;
		DAMAGE = true;
		MOVE = true;
		PLAY = true;
		CONTROL = true;
		MOVE_TO_POINT = false;

		GEN_BG("red");

		fight_dial.frame1.render = fight_dial.frame2.render = fight_dial.av1.render = fight_dial.av2.render = false;
		fight_dial.destroy();

		$player = new PLAYER({
			pos: vec2(0, 0),
			layer: fight_main,
			private: {
				i: 0,
				elems: fight_elems,
				markers: fight_markers,
				bulletsGroup: G_BULLETS,
				map: minimap
			}
		});

		minimap.parent = player;

		$planet1 = new PLANET({
			pos: vec2(5000, 0),
			layer: fight_bg4,
			texture: t_planet1
		});

		for(let i = 0; i < 25; i ++) {
			new FRIEND({
				pos: vec2(Math.random(), Math.random()).sub(0.5).mult(2500),
				layer: fight_main,
				angle: 90,
				private: {
					i: 0,
					elems: fight_elems,
					markers: fight_markers,
					bulletsGroup: G_BULLETS,
					map: minimap
				}
			});
			new ENEMY({
				pos: vec2(Math.random(), Math.random()).sub(0.5).mult(2500).add(4000, 0),
				layer: fight_main,
				angle: 90,
				private: {
					i: 0,
					elems: fight_elems,
					markers: fight_markers,
					bulletsGroup: G_BULLETS,
					map: minimap
				}
			});
		}

		

	}
	else if (stage == 3) {
		MIN_DIST = 500;
		SHOOT = true;
		CHASE = true;
		CLONE = false;
		DAMAGE = true;
		MOVE = true;
		PLAY = true;
		CONTROL = true;
		MOVE_TO_POINT = false;

		GEN_BG("red2");

		fight_dial.frame1.render = fight_dial.frame2.render = fight_dial.av1.render = fight_dial.av2.render = false;
		fight_dial.destroy();

		$player = new PLAYER({
			pos: vec2(0, 0),
			layer: fight_main,
			private: {
				i: 0,
				elems: fight_elems,
				markers: fight_markers,
				bulletsGroup: G_BULLETS,
				map: minimap
			}
		});

		minimap.parent = player;

		$planet2 = new PLANET({
			pos: vec2(5000, 0),
			layer: fight_bg4,
			texture: t_planet2
		});

		for(let i = 0; i < 25; i ++) {
			if(i > 1) {
				new FRIEND({
					pos: vec2(Math.random(), Math.random()).sub(0.5).mult(2500),
					layer: fight_main,
					angle: 90,
					private: {
						i: 0,
						elems: fight_elems,
						markers: fight_markers,
						bulletsGroup: G_BULLETS,
						map: minimap
					}
				});
			}
			new ENEMY({
				pos: vec2(Math.random(), Math.random()).sub(0.5).mult(2500).add(4000, 0),
				layer: fight_main,
				angle: 90,
				private: {
					i: 0,
					elems: fight_elems,
					markers: fight_markers,
					bulletsGroup: G_BULLETS,
					map: minimap
				}
			});
		}

		
	}

	fight_cam.set();

}