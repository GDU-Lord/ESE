() => {
	
	// script runs after the engine initialization
	// here's the place for setting up the textures, fonts and other sources

	// $t_bg = rjs.Image("bg/bg.png");

	// $t_bg1_trans = new rjs.Crop(t_bg, vec2(320*3, 160*1), vec2(320, 160));
	// $t_bg2_trans = new rjs.Crop(t_bg, vec2(320*2, 160*0), vec2(320, 160));
	// $t_bg3_trans = new rjs.Crop(t_bg, vec2(320*2, 160*1), vec2(320, 160));
	// $t_bg4_trans = new rjs.Crop(t_bg, vec2(320*3, 160*0), vec2(320, 160));

	// $t_bg1_red = new rjs.Crop(t_bg, vec2(320*1, 160*1), vec2(320, 160));
	// $t_bg2_red = new rjs.Crop(t_bg, vec2(320*0, 160*0), vec2(320, 160));
	// $t_bg3_red = new rjs.Crop(t_bg, vec2(320*0, 160*1), vec2(320, 160));
	// $t_bg4_red = new rjs.Crop(t_bg, vec2(320*1, 160*0), vec2(320, 160));

	// $t_bg1_blue = new rjs.Crop(t_bg, vec2(320*1, 160*3), vec2(320, 160));
	// $t_bg2_blue = new rjs.Crop(t_bg, vec2(320*0, 160*2), vec2(320, 160));
	// $t_bg3_blue = new rjs.Crop(t_bg, vec2(320*0, 160*3), vec2(320, 160));
	// $t_bg4_blue = new rjs.Crop(t_bg, vec2(320*1, 160*2), vec2(320, 160));

	$t_logo = new rjs.Image("logo.png");
	$t_logo_re = new rjs.Image("logo-re.png");
	$t_logo_jam = new rjs.Image("jam.png");

	$t_bg = new rjs.Tiled(rjs.Image("bg/Nebula.png"), vec2(rjs.client.w, rjs.client.h));
	$t_bg_stars3 = new rjs.Tiled(rjs.Image("bg/Large_Stars.png"), vec2(rjs.client.w, rjs.client.h));
	$t_bg_stars2 = new rjs.Tiled(rjs.Image("bg/Medium_Stars.png"), vec2(rjs.client.w, rjs.client.h));
	$t_bg_stars1 = new rjs.Tiled(rjs.Image("bg/Small_Stars.png"), vec2(rjs.client.w, rjs.client.h));
	$t_bullet = rjs.Image("bullet.png");
	$t_tiled_bg = new rjs.Tiled(rjs.Image("bg/tile.png"), vec2(100, 100));

	$t_dial_bg = rjs.Image("bg/dial_bg.png");
	$t_texs = rjs.Image("dial/All_images_sheet.png");

	$t_dial_win = new rjs.Crop(t_texs, vec2(304, 148), vec2(86, 44));
	$t_dial_frame = new rjs.Crop(t_texs, vec2(144, 128), vec2(65, 64));

	$t_dial_hugh = new rjs.Crop(t_texs, vec2(16, 144), vec2(48, 48));
	$t_dial_officer = new rjs.Crop(t_texs, vec2(76, 144), vec2(48, 48));

	// 300
	// 48
	// 97
	// 97

	$t_planet1 = new rjs.Crop(t_texs, vec2(300, 50), vec2(97, 97));
	$t_planet2 = new rjs.Crop(t_texs, vec2(452, 54), vec2(102, 102));

	$t_radar = new rjs.Crop(t_texs, vec2(592, 135), vec2(128, 128));

	$t_vez_f = [];

	for(let i = 0; i < 15; i ++) {
		t_vez_f[i] = new rjs.Crop(t_texs, vec2(48*i, 0), vec2(48, 48));
	}

	$t_dial_vezie = new rjs.Animation({
		frames: t_vez_f,
		speed: 20
	});
	
	$s1s = new rjs.Crop(t_texs, vec2(128+64,199), vec2(64, 64));

	$s1f = [
		new rjs.Crop(t_texs, vec2(128+64*2, 199), vec2(64, 64)),
		new rjs.Crop(t_texs, vec2(128+64*3, 199), vec2(64, 64)),
		new rjs.Crop(t_texs, vec2(128+64*4, 199), vec2(64, 64)),
		new rjs.Crop(t_texs, vec2(128+64*5, 199), vec2(64, 64))
	];

	$s1f.push(s1f[2], s1f[1]);

	$s1f2 = [
		s1f[2],
		s1f[3]
	];

	$bf = [
		new rjs.Crop(t_texs, vec2(32*0, 72), vec2(32, 16)),
		new rjs.Crop(t_texs, vec2(32*1, 72), vec2(32, 16)),
		new rjs.Crop(t_texs, vec2(32*2, 72), vec2(32, 16)),
		new rjs.Crop(t_texs, vec2(32*3, 72), vec2(32, 16)),
		new rjs.Crop(t_texs, vec2(32*4, 72), vec2(32, 16))
	];

	$a_bullet = new rjs.Animation({
		frames: bf,
		speed: 20
	});

	$exf = [
		new rjs.Crop(t_texs, vec2(64*0+720, 64*0), vec2(64, 64)),
		new rjs.Crop(t_texs, vec2(64*1+720, 64*0), vec2(64, 64)),
		new rjs.Crop(t_texs, vec2(64*2+720, 64*0), vec2(64, 64)),
		new rjs.Crop(t_texs, vec2(64*3+720, 64*0), vec2(64, 64)),
		new rjs.Crop(t_texs, vec2(64*4+720, 64*0), vec2(64, 64)),
		new rjs.Crop(t_texs, vec2(64*0+720, 64*1), vec2(64, 64)),
		new rjs.Crop(t_texs, vec2(64*1+720, 64*1), vec2(64, 64))
	];

	$t_crystal = rjs.Image("Crystal.png");

	// for(let i = 3; i > 0; i --) {
	// 	s1f.push(new rjs.Image("ship-1/f"+i+".gif"));
	// }

	// $s1a = new rjs.Animation({
	// 	frames: s1f,
	// 	speed: 20
	// });

	$F_BG = new rjs.Shader("FRAGMENT", "Sources/glsl/bg_fragment.glsl", "BG");

	$H_BG = new rjs.Program({
		vertex : "DEFAULT",
		fragment: F_BG,
		id: "BG"
	});

	$F_PART = new rjs.Shader("FRAGMENT", "Sources/glsl/part_fragment.glsl", "PART");

	$H_PART = new rjs.Program({
		vertex : "DEFAULT",
		fragment: F_PART,
		id: "PART"
	});

	$F_CIRC = new rjs.Shader("FRAGMENT", "Sources/glsl/circle_fragment.glsl", "CIRC");

	$H_CIRC = new rjs.Program({
		vertex : "DEFAULT",
		fragment: F_CIRC,
		id: "CIRC"
	});

	$F_ROT = new rjs.Shader("FRAGMENT", "Sources/glsl/rot_fragment.glsl", "ROT");

	$H_ROT = new rjs.Program({
		vertex : "DEFAULT",
		fragment: F_ROT,
		id: "ROT"
	});

	$f_pix = rjs.Font( "PIX", "PIX.ttf");

	$s_music = rjs.Audio("music.mp3"),

	$s_vcs = {
		"h1": rjs.Audio("h1.wav"),
		"h2": rjs.Audio("h2.wav"),
		"h3": rjs.Audio("h3.wav"),
		"h4": rjs.Audio("h4.wav"),
		"h5": rjs.Audio("h5.wav"),
		"h6": rjs.Audio("h6.wav"),
		"h7": rjs.Audio("h7.wav"),
		"h8": rjs.Audio("h8.wav"),
		"h9": rjs.Audio("h9.wav"),
		"h10": rjs.Audio("h10.wav"),
		"h11": rjs.Audio("h11.wav"),
		"h12": rjs.Audio("h12.wav"),
		"h15.1": rjs.Audio("h15.1.wav"),
		"h15.2": rjs.Audio("h15.2.wav"),
		"masteroff1": rjs.Audio("masteroff1.wav"),
		"masteroff1.5": rjs.Audio("masteroff1.5.wav"),
		"masteroff2": rjs.Audio("masteroff2.wav"),
		"masteroff3.1": rjs.Audio("masteroff3.1.mp3"),
		"masteroff3.2": rjs.Audio("masteroff3.2.mp3"),
		"masteroff3.3": rjs.Audio("masteroff3.3.mp3"),
		"masteroff3.4": rjs.Audio("masteroff3.4.mp3"),
		"masteroff3.5": rjs.Audio("masteroff3.5.mp3"),
		"masteroff3.6": rjs.Audio("masteroff3.6.mp3"),
		"masteroff3.7": rjs.Audio("masteroff3.7.mp3"),
		"masteroff3.8": rjs.Audio("masteroff3.8.mp3"),
		"masteroff4": rjs.Audio("masteroff4.wav"),
		"masteroff4.5.1": rjs.Audio("masteroff4.5.1.wav"),
		"masteroff4.5.2": rjs.Audio("masteroff4.5.2.wav"),
		"masteroff4.5.3": rjs.Audio("masteroff4.5.3.wav"),
		"masteroff4.5.4": rjs.Audio("masteroff4.5.4.wav"),
		"masteroff5": rjs.Audio("masteroff5.wav"),
		"masteroff6": rjs.Audio("masteroff6.wav"),
		"masteroff6.5.1": rjs.Audio("masteroff6.5.1.wav"),
		"masteroff6.5.2": rjs.Audio("masteroff6.5.2.wav"),
		"masteroff6.5.3": rjs.Audio("masteroff6.5.3.wav"),
		"masteroff7": rjs.Audio("masteroff7.wav"),
		"vez1": rjs.Audio("vez1.wav"),
		"vez2": rjs.Audio("vez2.wav")
	};

	$s_final = rjs.Audio("final.mp3");

	$s_follow1 = rjs.Audio("fol3.mp3");
	// $s_follow2 = rjs.Audio("follow-me4.mp3");

}