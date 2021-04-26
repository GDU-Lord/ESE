(scene, {dial = 0} = {}) => {
	
	// the script runs 
	// params - the start parameters
	
	// switching to the camera "new_cam"
	dial_cam.set();

	curDial = dial;
	curIndex = 0;

	

	dial_kd.start();

	NEXT = fight_scene;

	if(dial == 0) {
		NEXT_PARAMS = {
			stage: 0
		};
	}
	else if(dial == 1) {
		NEXT_PARAMS = {
			stage: 1
		};
	}
	else if(dial == 2) {

		NEXT_PARAMS = {
			dial: 3
		};

		NEXT = dial_scene;
	}
	else if(dial == 3) {

		NEXT_PARAMS = {
			stage: 1
		};

		NEXT = fight_scene;
	}

	const cur = DIALS[curDial][curIndex];
	voice(cur.voice);
	

}