(function () {

    this.ship = rjs.Script("ship/ship.js");
    this.ship();

    this.ms = 0;
    this.delay = 10;
    
    this.HP.filters[0] = this.HP_BG.filters[0] = rgb(0, 255, 0);

    // this.hit = () => {};

    this.loops.push(function () {

        let angle = Mouse.get(this.layer).sub(this.pos).angle+90;

        if(MOVE_TO_POINT) {
            angle = planet1.pos.div(0.5).sub(this.pos).angle+90;
        }

        let d = diff(this.angle, angle);

        // this.scale.y = this.scale.y-(this.scale.y-Math.min(50, Math.max(50/d, 30)))*0.1;

        if(angles(this.angle, angle))
            this.angle += d*0.2;
        else
            this.angle -= d*0.2;

        rjs.currentCamera.pos = rjs.currentCamera.pos.sub(rjs.currentCamera.pos.sub(this.pos).mult(0.2));

        if(!CONTROL) {

            this.pos = this.pos.sub(this.pos.sub(-1000, 0).mult(0.03));
            return;

        }

        if(MOVE_TO_POINT) {
            this.velo = this.velo.add(vec2(this.acc, 0).rot(this.angle-90));
            F_PLANETS.for(p => {
                if(this.pos.sub(p.pos.div(0.5)).len <= 400) {

                    this.scale = this.scale.div(1.05);
                    this.opacity = this.opacity/1.05;
                    this.HP.opacity = this.opacity;
                    this.HP_BG.render = false;

                    if(this.opacity < 4) {
                        if(typeof planet2 == "undefined") {
                            OUT = true;
                            ZERO = true;
                            HUND = false;
                            NEXT = fight_scene;
                            NEXT_PARAMS = {
                                stage: 3
                            };
                            MOVE_TO_POINT = false;
                        }
                        else {
                            OUT = true;
                            ZERO = true;
                            HUND = false;
                            NEXT = final_scene;
                            NEXT_PARAMS = {};
                            MOVE_TO_POINT = false;
                        }
                    }

                }
            });
            return;
        }

        if(rjs.KeyPressed(32)) {
            this.velo = this.velo.add(vec2(this.acc, 0).rot(this.angle-90));
            if(this.texture == this.anim.stop) {
                this.texture = this.anim.start;
                new rjs.Wait(() => {
                    if(this.texture == this.anim.start) {
                        this.anim.move.currentIndex = 0;
                        this.texture = this.anim.move;
                    }
                }, 10, true, this.scene);
            }
        }
        else {
            this.texture = this.anim.stop;
        }

        this.ms ++;

        if(MD && this.ms >= this.delay) {
            this.shoot();
            this.ms = 0;
        }

        
        
    });

})