() => {

	// script runs after the engine initialization
	// usually game and engine configurations take place here

	// attaching mouse and touchscreen
	Mouse = new rjs.Mouse();
	Touch = new rjs.Touch();

	rjs.CLEAR_COLOR = rgba(4, 4, 4, 255);//rgba(10, 0, 20, 255);

	$diff = function (a1, a2) {
		a1 = norm(a1);
        a2 = norm(a2);
        const d1 = norm(a2-a1);
        const d2 = norm(-360-d1);
        return Math.min(d1, d2);
	};

	$norm = function (a) {
		return vec2(1, 0).rot(a).angle;
	};

	$angles = function (a1, a2) {
        a1 = norm(a1);
        a2 = norm(a2);
        const d1 = norm(a2-a1);
        const d2 = norm(-360-d1);
        return d1 < d2;
    };

	$global_loop = new rjs.GameLoop(() => {
		F_AUTO_LOOP.for(o => {

			if(rjs.currentScene == o.scene) {
				for(let i in o.loops) {
					o.loops[i].bind(o)();
				}
			}

		});
		if(s_music.getDuration() == s_music.getTime()) {
			s_music.setTime(0);
			s_music.play();
		}
	});

	$MD = false;

	new rjs.MouseDown(e => {
		MD = true;
	});

	new rjs.MouseUp(e => {
		MD = false;
	});

	$DIALS = rjs.JSON("dials.json");

	$OUT = false;
	$ZERO = false;
	$HUND = false;
	$OPC = 0;

	$NEXT = null;
	$NEXT_PARAMS = {};

	$DIAL_MOVE = false;

	rjs.Script("player/voice.js")();

}