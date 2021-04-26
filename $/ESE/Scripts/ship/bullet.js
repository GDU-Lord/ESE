(function () {

    this.render = false;
    this.img = new rjs.Sprite({
        texture: a_bullet,
        size: vec2(40, 20),
        render: false,
        families: [F_BULLET_IMGS],
        layer: this.layer
    });

    this.loops = [function () {

        this.img.render = true;
        this.pos = this.pos.add(this.velo);
        this.angle = this.velo.angle;

        this.img.pos = this.pos;
        this.img.angle = this.angle;

        this.opacity -= 2;
        this.img.opacity = this.opacity;
        this.img.color = this.color;

        if(this.opacity <= 0) {
            this.destroy();
            this.img.destroy();
            return;
        }

        let brk = false;

        F_SHIPS.forNearTo(this.pos, ship => {

            if(brk)
                return;

            if(this.parent.id == ship.id)
                return;

            if(rjs.Collision(this, ship)) {

                brk = ship.hit(this);

            }

        }, 50);

    }];
    
})