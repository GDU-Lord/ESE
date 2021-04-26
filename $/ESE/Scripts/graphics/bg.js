(param = "mirror") => {  

    if(param == "mirror") {
        new BG_MIR({
            pos: vec2(0, 0),
            size: vec2(rjs.client.w, rjs.client.h*10),
            scale: vec2(1.5, 1.5),
            texture: t_bg,
            layer: fight_bg0
        });
    
        new BG({
            pos: vec2(-5/2-2, 0),
            size: vec2(rjs.client.w*5, rjs.client.h*10),
            color: rgb(50, 150, 255),
            scale: vec2(1.5, 1.5),
            texture: t_bg,
            layer: fight_bg0
        });
    
        new BG({
            pos: vec2(5/2+2, 0),
            size: vec2(rjs.client.w*5, rjs.client.h*10),
            color: rgb(255, 50, 25),
            scale: vec2(1.5, 1.5),
            texture: t_bg,
            layer: fight_bg0
        });
    
        new BG_MIR({
            pos: vec2(0, 0),
            size: vec2(rjs.client.w, rjs.client.h*10),
            scale: vec2(0.5, 0.5),
            texture: t_bg_stars3,
            layer: fight_bg3
        });
    
        new BG({
            pos: vec2(-5/2/2-1/2/2, 0),
            size: vec2(rjs.client.w*5, rjs.client.h*10),
            color: rgb(50, 150, 255),
            scale: vec2(0.5, 0.5),
            texture: t_bg_stars3,
            layer: fight_bg3
        });
    
        new BG({
            pos: vec2(5/2/2+1/2/2, 0),
            size: vec2(rjs.client.w*5, rjs.client.h*10),
            color: rgb(255, 100, 50),
            scale: vec2(0.5, 0.5),
            texture: t_bg_stars3,
            layer: fight_bg3
        });
    
    }
    else if(param == "red") {

        new BG({
            pos: vec2(0, 0),
            size: vec2(rjs.client.w*11, rjs.client.h*10),
            color: rgb(255, 100, 50),
            scale: vec2(1.5, 1.5),
            texture: t_bg,
            layer: fight_bg0
        });

        new BG({
            pos: vec2(0, 0),
            size: vec2(rjs.client.w*11, rjs.client.h*10),
            color: rgb(255, 100, 50),
            scale: vec2(0.5, 0.5),
            texture: t_bg_stars3,
            layer: fight_bg3
        });

    }
    else if(param == "red2") {

        new BG({
            pos: vec2(0, 0),
            size: vec2(rjs.client.w*11, rjs.client.h*10),
            color: rgb(255, 50, 150),
            scale: vec2(1.5, 1.5),
            texture: t_bg,
            layer: fight_bg0
        });

        new BG({
            pos: vec2(0, 0),
            size: vec2(rjs.client.w*11, rjs.client.h*10),
            color: rgb(255, 50, 50),
            scale: vec2(0.5, 0.5),
            texture: t_bg_stars3,
            layer: fight_bg3
        });

    }

}