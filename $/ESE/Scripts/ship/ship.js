(function () {

    this.velo = vec2();
    this.acc = 1;

    this.guns = [];

    this.filters[0] = rgb(255, 255, 255);

    this.anim = {
        stop: new rjs.Animation({
            frames: s1f2,
            speed: 20/3
        }),
        start: s1s,
        move: new rjs.Animation({
            frames: s1f,
            speed: 20
        })
    };

    this.texture = this.anim.stop;

    this.rot = 0;

    this.createTwin = function () {

        if(!CLONE)
            return;

        this.twin = new ENEMY({
            pos: this.pos.mult(-1, 1),
            layer: this.layer,
			angle: -this.angle,
			private: {
				elems: this.elems,
				markers: this.markers,
				bulletsGroup: G_BULLETS,
                tagT: "twin",
                twin: this
			}
        });

    };

    if(this.tagT == "origin")
        this.createTwin();

    if(Math.abs(this.i) == 10) {
        this.twin.tagT = "origin";
        this.twin.twin = null;
        this.hp = 0;
    }

    this.HP_BG = new rjs.Sprite({
        pos: vec2(0, 0),
        size: vec2(1, 10),
        scale: vec2(100, 1),
        origin: vec2(-.5, -25),
        color: rgb(100, 100, 100),
        families: [F_MARKERS],
        layer: this.markers
    });

    this.HP = new rjs.Sprite({
        pos: vec2(0, 0),
        size: vec2(1, 10),
        scale: vec2(1, 1),
        origin: vec2(-.5, -25),
        color: rgb(255, 255, 255),
        families: [F_MARKERS],
        layer: this.markers
    });

    this.guns.push(new GUN({
        layer: this.elems,
        private: {
            parent: this
        }
    }));

    this.guns.push(new GUN({
        layer: this.elems,
        private: {
            parent: this
        }
    }));

    this.shoot = function (color = rgb(255, 255, 0)) {
        if(!SHOOT)
            return;
        for(let i in this.guns) {
            this.guns[i].shoot(color);
        }
        if(this.tagT == "origin" && this.twin != null)
            this.twin.shoot(this.twin.bullet);
    };

    this.hit = function (bullet) {

        

        if(this.tag == bullet.parent.tag)
            return false;

        if(!(this.tag2 == "player" && !DAMAGE))
            this.hp -= bullet.damage;
        
        // this.filters[0].g = this.filters[0].b = 0;
        
        const coll = rjs.Collision(this, bullet);

        if(coll) {
            this.velo = this.velo.sub(vec2(coll.overlapV.x, coll.overlapV.y).div(3));
        }

        bullet.destroy();
        bullet.img.destroy();

        return true;

    };

    this.loops = [];
    this.loops.push(function () {

        if(this.tagT == "twin") {
            if(this.twin != null && this.twin.destroyed) {
                this.twin = null;
                this.tagT = "origin";
            }
            else {

                this.pos = this.twin.pos.mult(-1, 1);
                this.angle = -this.twin.angle;
                this.velo = vec2(this.twin.velo).mult(-1, 1);
                // this.hp = this.twin.hp;

            }
        }
        else {
            if(this.twin != null && this.twin.destroyed) {
                this.twin = null;
            }
            this.pos = this.pos.add(this.velo);
            this.velo = this.velo.add(vec2().sub(this.velo).mult(0.03));

            // this.pos = this.pos.add(this.velo);

            const v = vec2(this.velo);

            F_SHIPS.forNearTo(this.pos, ship => {

                if(this.id == ship.id)
                    return;
    
                const coll = rjs.Collision(this, ship);
    
                if(coll && this.opacity == 100 && ship.opacity == 100) {
                    // this.velo = vec2().sub(this.velo.norm()).mult(2);//this.velo.sub(vec2(coll.overlapV.x, coll.overlapV.y).div(5));
                    this.velo = vec2(coll.overlapN.x, coll.overlapN.y).mult(-10);
                    // this.pos = this.pos.sub(coll.overlapV.x, coll.overlapV.y);
                    this.rot = Math.random()*20;
                }
    
            }, 100);

            // this.pos = this.pos.sub(v);
        }

        for(let i in this.guns) {
            this.guns[i].pos = this.getPoint(i);
            this.guns[i].angle = this.angle-90;
            this.guns[i].scale = this.scale;
        }

        // this.filters[0].g += 6;
        // this.filters[0].b += 6;

        // if(this.filters[0].g > 255)
        //     this.filters[0].g = 255;
        // if(this.filters[0].b > 255)
        //     this.filters[0].b = 255;

        // if(this.hp < 100)
        //     this.hp += 0.01;

        this.HP.pos = this.pos.sub(this.HP_BG.scale.x/2, 100);
        this.HP_BG.pos = this.HP.pos;
        this.HP.scale.x = this.HP_BG.scale.x*(this.hp/100);

        if(this.hp <= 0) {
            for(let i in this.guns) {
                this.guns[i].destroy();
            }
            this.HP.destroy();
            this.HP_BG.destroy();
            if(this.tag2 == "player")
                FAIL();
            this.destroy();
            new EXP({
                layer: this.layer,
                pos: this.pos
            });

            let c = 0;

            F_SHIPS.for(o => {
                if(o.tag2 == "enemy")
                    c ++;
            });

            if(c == 0)
                WIN();
        }

        this.angle += this.rot;
        this.rot -= (this.rot)*0.1;

        let bx = 8500;
        let by = 4500;

        if(typeof planet1 != "undefined" || typeof planet2 != "undefined") {
            bx *= 2;
            by *= 2;
        }

        if(this.pos.x < -bx) {
            this.pos.x = -bx;
        }
        if(this.pos.x > bx) {
            this.pos.x = bx;
        }
        if(this.pos.y < -by) {
            this.pos.y = -by;
        }
        if(this.pos.y > by) {
            this.pos.y = by;
        }

    });

})