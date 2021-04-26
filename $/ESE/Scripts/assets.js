() => {
	
	// script runs after the engine initialization
	// here's the place for setting up some presets of the game objects called "assets"

	$BULLET_SPEED = 20;

	// vertices: [
	// 	vec2(1, 0),
	// 	vec2(-1.5, -1),
	// 	vec2(-1, 0),
	// 	vec2(-1.5, 1)
	// ],

	$SHIP = new rjs.Asset({
		type: rjs.Sprite,
		size: vec2(1, 1),
		colorMode: "SINGLE",
		scale: vec2(100, 100),
		// colors: [rgb(255, 255, 255), rgb(100, 100, 150), rgb(100, 130, 150), rgb(100, 100, 150)],
		points: [
			vec2(-0.3, 0),
			vec2(0.3, 0)
		],
		// texture: s1a,
		// program: H_ROT,
		// origin: vec2(-0.5, 0),
		families: [F_AUTO_LOOP, F_SHIPS],
		private: {
			hp: 100,
			tag: "none",
			tagT: "origin",
			target: null,
			init: rjs.Script("ship/ship.js")
		}
	});

	$PLAYER = new rjs.Asset({
		type: SHIP,
		colors: [rgb(200, 255, 200), rgb(100, 100, 150), rgb(100, 130, 150), rgb(100, 100, 150)],
		private: {
			tag: "a",
			tag2: "player",
			init: rjs.Script("player/player.js"),
			bullet: rgb(255, 255, 0)
		}
	});

	$FRIEND = new rjs.Asset({
		type: SHIP,
		colors: [rgb(180, 200, 255), rgb(100, 100, 150), rgb(100, 130, 150), rgb(100, 100, 150)],
		private: {
			tag: "a",
			tag2: "friend",
			init: rjs.Script("friend/friend.js"),
			bullet: rgb(0, 255, 0),
		}
	});

	$ENEMY = new rjs.Asset({
		type: SHIP,
		colors: [rgb(255, 180, 200), rgb(100, 100, 150), rgb(100, 130, 150), rgb(100, 100, 150)],
		private: {
			tag: "b",
			tag2: "enemy",
			init: rjs.Script("enemy/enemy.js"),
			bullet: rgb(255, 0, 0),
		}
	});

	$GUN = new rjs.Asset({
		type: rjs.Sprite,
		size: vec2(0.5, 0.2),
		colorMode: "SINGLE",
		// colors: [rgb(50, 50, 50), rgb(200, 100, 0), rgb(200, 100, 0), rgb(50, 50, 50)],
		render: false,
        families: [F_MARKERS],
		private: {
			shoot (color) {

				const bul = new BULLET({
					pos: vec2(this.pos),
					layer: this.layer,
					groups: [],
					color: color,
					private: {
						velo: this.parent.velo.add(vec2(BULLET_SPEED, 1).rot(this.angle)),
						parent: this.parent
					}
				});

				this.parent.bulletsGroup.set(bul);

			}
		}
	});

	$BULLET = new rjs.Asset({
		type: rjs.Sprite,
		size: vec2(30, 10),
		families: [F_AUTO_LOOP],
		private: {
			init: rjs.Script("ship/bullet.js"),
			damage: 1
		}
	});

	$PARTICLE = new rjs.Asset({
		type: rjs.Sprite,
		size: vec2(1, 1),
		color: rgb(255, 150, 0),
		program: H_PART,
		families: [F_AUTO_LOOP],
		private: {
			min: 50,
			max: 100,
			loops: [
				function () {
					if(rjs.currentCamera.pos.mult(this.layer.parallax.div(100)).sub(this.pos).len >= 1000)
						this.render = false;
					else
						this.render = true;
				}
			],
			init () {
				const r = Math.random()*(this.max-this.min)+this.min;
				const horiz = 10000;
				const vert = 10000;
				this.scale = vec2(r, r);
				this.pos = vec2(Math.random()*horiz*2-horiz, Math.random()*vert*2-vert);
				this.color = rgb(Math.random()*100+155, Math.random()*100+155, Math.random()*100+155);
			}
		}
	});

	$MINIMAP = new rjs.Asset({
		type: rjs.Sprite,
		pos: vec2(-rjs.client.w/2+200, -rjs.client.h/2+200),
		size: vec2(300, 300),
		// color: rgb(100, 100, 100),
		opacity: 80,
		// program: H_CIRC,
		texture: t_radar,
		families: [F_AUTO_LOOP],
		private: {
			init: rjs.Script("player/minimap.js")
		}
	});

	$MARKER = new rjs.Asset({
		type: rjs.Sprite,
		size: vec2(5, 5),
		// program: H_CIRC,
		opacity: 80
	});

	$TRIGGER = new rjs.Asset({
		type: rjs.Sprite,
		color: rgb(0, 150, 255),
		opacity: 80,
		families: [F_AUTO_LOOP],
		private: {
			yes: [],
			no: [],
			target: null,
			action: () => {}
		}
	});

	$BG = new rjs.Asset({
		type: rjs.Sprite,
        // color: rgb(255, 100, 50),
        filters: [rgba(255, 255, 255, 500)],
        scale: vec2(0.5, 0.5),
        program: H_BG,
		families: [F_MARKERS],
		private: {
			init: function () {
				this.pos.x *= rjs.client.w;
				this.pos.y *= rjs.client.h;
			}
		}
	});

	$BG_MIR = new rjs.Asset({
		type: BG,
		families: [F_MARKERS],
		colorMode: "VERTEX",
        colors: [rgb(50, 150, 255), rgb(255, 50, 25), rgb(255, 50, 25), rgb(50, 150, 255)]
	});

	$dial_scale = 4;

	$DIAL = new rjs.Asset({
		type: rjs.Sprite,
		size: vec2(86, 44).mult(10, dial_scale),
		// color: rgb(150, 150, 150),
		families: [F_AUTO_LOOP],
		texture: t_dial_win,
		private: {
			init: rjs.Script("player/dial.js")
		}
	});

	$DIAL_FRAME = new rjs.Asset({
		type: rjs.Sprite,
		size: vec2(65, 64).mult(dial_scale),
		// color: rgb(200, 200, 200),
		texture: t_dial_frame
	});

	$AV = new rjs.Asset({
		type: rjs.Sprite,
		size: vec2(48, 48).mult(dial_scale)
	});

	$DARK = new rjs.Asset({
		type: rjs.Sprite,
		pos: vec2(),
		size: vec2(rjs.client.w, rjs.client.h),
		color: rgb(0, 0, 0),
		families: [F_AUTO_LOOP],
		private: {
			out: false,
			k: 2,
			loops: [function () {
				if(ZERO) {
					rjs.Wait(() => {
						ZERO = false;
					}, 1);
					this.opacity = 0;
				}
				if(HUND) {
					rjs.Wait(() => {
						HUND = false;
					}, 1);
					this.opacity = 100;
				}
				if(OUT) {
					if(this.opacity < 100)
						this.opacity += this.k;
				}
				else {
					if(this.opacity > 0)
						this.opacity -= this.k;
				}
				this.render = this.opacity > 1;
				OPC = this.opacity;
			}]
		}
	});

	$PLANET = new rjs.Asset({
		type: rjs.Sprite,
		size: vec2(500, 500),
		families: [F_PLANETS]
	});

	$FINAL = new rjs.Asset({
		type: rjs.Text,
		size: 60,
		font: f_pix,
		color: rgb(200, 240, 255)
	});

	$EXP = new rjs.Asset({
		type: rjs.Sprite,
		size: vec2(150, 150),
		families: [F_AUTO_LOOP],
		private: {
			init () {

				this.texture = new rjs.Animation({
					frames: exf,
					speed: 14
				});

				new rjs.Wait(() => {
					this.destroy();
				}, 30);
				
			}
		}
	});

}