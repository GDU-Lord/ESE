(scene) => {

	// script runs after the scene initialization
	
	// camrea creation
	$fight_cam = new rjs.Camera();

	// layers initialization

	$fight_bg = new rjs.Layer(scene, vec2(100, 100));
	
	$fight_bg0 = new rjs.Layer(scene, vec2(5, 5));
	$fight_bg1 = new rjs.Layer(scene, vec2(7, 7));
	$fight_bg2 = new rjs.Layer(scene, vec2(10, 10));
	$fight_bg3 = new rjs.Layer(scene, vec2(15, 15));

	$fight_bg0C = new rjs.Layer(scene, vec2(5, 5));
	$fight_bg1C = new rjs.Layer(scene, vec2(7, 7));
	$fight_bg2C = new rjs.Layer(scene, vec2(10, 10));
	$fight_bg3C = new rjs.Layer(scene, vec2(15, 15));

	$fight_bg4 = new rjs.Layer(scene, vec2(50, 50));
	$fight_bg5 = new rjs.Layer(scene);
	$fight_triggers = new rjs.Layer(scene, vec2(100, 100));
	$fight_elems = new rjs.Layer(scene, vec2(100, 100));
	$fight_main = new rjs.Layer(scene, vec2(100, 100));
	$fight_markers = new rjs.Layer(scene, vec2(100, 100));
	$fight_ui1 = new rjs.Layer(scene, vec2(0, 0));
	$fight_ui2 = new rjs.Layer(scene, vec2(0, 0));
	$fight_ui3 = new rjs.Layer(scene, vec2(0, 0));
	$fight_ui4 = new rjs.Layer(scene, vec2(0, 0));
	$fight_ui = new rjs.Layer(scene, vec2(0, 0));

	$fight_dark = new rjs.Layer(scene, vec2(0, 0));

	$GEN_BG = rjs.Script("graphics/bg.js");

	$G_BULLETS = new rjs.Group($fight_elems);

	$dark = DARK({
		layer: fight_dark
	});

	$FPS = new rjs.Text({
		pos: vec2(-750, -450),
		size: 100,
		font: "Arial",
		color: rgb(255, 255, 0),
		text: "FPS: 0",
		layer: fight_ui,
		render: false,
		origin: "left-top"
	});

	$fight_dial = new DIAL({
		pos: vec2(0, 350),
		layer: fight_ui1,
		private: {
			text_layer: fight_ui4,
			av_layer: fight_ui3,
			frame_layer: fight_ui2
		}
	});

	$TEL_TEXT = new rjs.Text({
		pos: vec2(0, -400),
		size: 50,
		color: rgb(190, 225, 255),
		font: f_pix,
		render: false,
		text: "Press [T] to teleport behind the mirror",
		layer: fight_ui
	});

	$TELEPORTED = false;

	// fight_elems.scale = fight_main.scale = vec2(0.2, 0.2);

	//setting up some objects

	$STAGE = function () {

		if(!STAGE_1) {

			STAGE_1 = true;

			rjs.Wait(() => {
				CHASE = false;
				CONTROL = false;
				rjs.Wait(() => {
					// player.twin.tagT = "origin";
					// player.twin.twin = null;
					// player.pos = vec2(player.twin.pos);
					// player.twin = null;
					CHASE = true;
					SHOOT = true;
					MIN_DIST = 500;
					CONTROL = true;
					TEL_TEXT.render = true;
				}, 300);
			}, 300, true, scene);

		}

	};

	$FAIL = function () {

		if(!PLAY)
			return;
		
		OUT = true;
		ZERO = true;
		HUND = false;
		NEXT = fight_scene;

	};

	$WIN = function () {

		if(!PLAY) {

			if(!MOVE) {
				new ENEMY({
					pos: vec2(),
					layer: fight_main,
					private: {
						i: 0,
						hp: 70,
						elems: fight_elems,
						markers: fight_markers,
						bulletsGroup: G_BULLETS
					}
				});
	
				SHOOT = true;
				DAMAGE = false;
				CHASE = true;
				MOVE = true;
				curIndex = 4;
				fight_dial.clear = true;		
			}
			else if(MIN_DIST > 500) {
				new ENEMY({
					pos: vec2(),
					layer: fight_main,
					private: {
						i: 0,
						hp: 70,
						elems: fight_elems,
						markers: fight_markers,
						bulletsGroup: G_BULLETS
					}
				});
	
				MIN_DIST = 500;
				curIndex = 5;
				fight_dial.clear = true;
			}
			else {
				curIndex = 6;
				fight_dial.clear = true;
				
				new rjs.Wait(() => {
					OUT = true;
					ZERO = true;
					HUND = false;
					NEXT_PARAMS = {
						dial: 2
					};
					NEXT = dial_scene;
				}, 300, true, scene);
			}

			return;
		}
		else if(typeof planet1 == "undefined") {
			OUT = true;
			ZERO = true;
			HUND = false;
			NEXT = fight_scene;
			NEXT_PARAMS = {
				stage: 2
			};
		}
		else if(typeof planet2 == "undefined") {
			MOVE_TO_POINT = vec2(planet1.pos.add(0, 500));
		}
		else {
			MOVE_TO_POINT = vec2(planet2.pos.add(0, 500));
		}

	};

	$TEL = function () {
		
		if(TELEPORTED || !PLAY || !CONTROL || !SHOOT)
			return;

		player.twin.tagT = "origin";
		player.twin.twin = null;
		player.pos = vec2(player.twin.pos);
		player.twin = null;

		TEL_TEXT.render = false;

	};

	new rjs.KeyDown(e => {
		TEL();
	}, 84);

	function rand () {
		const n = 3000;
		return vec2(Math.random()*n-n*2, Math.random()*n-n*2);
	}

	$minimap = new MINIMAP({
		layer: fight_ui
	});

	// for(let i = 0; i < 20; i ++) {
	// 	new ENEMY({
	// 		pos: rand(),
	// 		layer: fight_main,
	// 		private: {
	// 			elems: fight_elems,
	// 			markers: fight_markers,
	// 			bulletsGroup: G_BULLETS
	// 		}
	// 	});
	// }

	$CHECK_IF_MOVED = false;

	const loop = new rjs.GameLoop(() => {
		voice_loop();
		if(CHECK_IF_MOVED && curIndex == 2) {
			if(player.pos+"" != vec2()+"") {
				curIndex = 3;
				fight_dial.clear = true;
			}
		}

		// the script runs every single frame before the rendering
		// box rotation
		const cur = DIALS[curDial][curIndex];
		if(cur.name == "Vezie") {
			fight_dial.av2.texture = t_dial_hugh;
			fight_dial.av2.opacity = 75;
			fight_dial.av1.opacity = 100;
			fight_dial.av1.texture = t_dial_vezie;
		}
		fight_dial.text = cur.text;

		if(OUT && OPC > 99) {
			OUT = false;
			NEXT.set(NEXT_PARAMS);
		}

	}, true, scene);

	new rjs.Interval(() => {
		FPS.text = "FPS: "+rjs.FPS+"\n"+"DCPF: "+rjs.renderer.DCPF;
	}, 5, true, scene);

}