(function () {

    if(!this.copy) {

        this.copies = [this];

        this.copies.push(new BG({
            pos: this.pos.add(this.size.mult(this.scale).x, 0),
            layer: eval("fight_bg"+this.i),
            size: this.size,
            scale: this.scale,
            texture: this.texture,
            private: {
                i: this.i,
                copy: true
            }
        }));

        this.copies.push(new BG({
            pos: this.pos.add(this.size.mult(this.scale)),
            layer: eval("fight_bg"+this.i),
            size: this.size,
            scale: this.scale,
            texture: this.texture,
            private: {
                i: this.i,
                copy: true
            }
        }));

        this.copies.push(new BG({
            pos: this.pos.add(0, this.size.mult(this.scale).y),
            layer: eval("fight_bg"+this.i),
            size: this.size,
            scale: this.scale,
            texture: this.texture,
            private: {
                i: this.i,
                copy: true
            }
        }));

        this.copies.push(new BG({
            pos: this.pos.sub(this.size.mult(this.scale).x, 0),
            layer: eval("fight_bg"+this.i),
            size: this.size,
            scale: this.scale,
            texture: this.texture,
            private: {
                i: this.i,
                copy: true
            }
        }));

        this.copies.push(new BG({
            pos: this.pos.sub(this.size.mult(this.scale)),
            layer: eval("fight_bg"+this.i),
            size: this.size,
            scale: this.scale,
            texture: this.texture,
            private: {
                i: this.i,
                copy: true
            }
        }));

        this.copies.push(new BG({
            pos: this.pos.sub(0, this.size.mult(this.scale).y),
            layer: eval("fight_bg"+this.i),
            size: this.size,
            scale: this.scale,
            texture: this.texture,
            private: {
                i: this.i,
                copy: true
            }
        }));

        this.copies.push(new BG({
            pos: this.pos.add(this.size.mult(this.scale).mult(-1, 1)),
            layer: eval("fight_bg"+this.i),
            size: this.size,
            scale: this.scale,
            texture: this.texture,
            private: {
                i: this.i,
                copy: true
            }
        }));

        this.copies.push(new BG({
            pos: this.pos.add(this.size.mult(this.scale).mult(1, -1)),
            layer: eval("fight_bg"+this.i),
            size: this.size,
            scale: this.scale,
            texture: this.texture,
            private: {
                i: this.i,
                copy: true
            }
        }));

        log(this.copies);

    }

    this.loops = [function () {

        let pref = "";

        if(this.pos.x == 0)
            pref = "trans";
        if(this.pos.x < 0)
            pref = "blue";
        if(this.pos.x > 0)
            pref = "red";

        this.texture = eval("t_bg"+this.i+"_"+pref);

    }];


})