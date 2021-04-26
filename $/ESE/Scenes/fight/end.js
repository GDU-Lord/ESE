(scene, params) => {
	
	// the script runs after leaving the scene
	// params - scene end parameters

	F_AUTO_LOOP.for(o => {

		if(o.scene == scene && o.id != minimap.id && o.id != dark.id)
			o.destroy();

	});

	F_MARKERS.for(o => {

		if(o.scene == scene)
			o.destroy();

	});

	F_PLANETS.for(o => {

		if(o.scene == scene)
			o.destroy();

	});

	F_BULLET_IMGS.for(o => {

		if(o.scene == scene)
			o.destroy();

	});

}