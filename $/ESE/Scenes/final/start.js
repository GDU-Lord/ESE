(scene, params) => {
	
	// the script runs 
	// params - the start parameters
	
	// switching to the camera "new_cam"
	final_cam.set();

	new rjs.Wait(() => {
		s_final.play();
	}, 100, true, scene);
	

}