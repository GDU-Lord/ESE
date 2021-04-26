(function () {

    this.ship = rjs.Script("ship/ship.js");
    this.ship();

    this.ms = 0;
    this.delay = 10;

    this.loops.push(function () {

        if(!MOVE)
            return;

        let ang;

        if(this.target != null && this.target.destroyed)
            this.target = null;
        if(this.target != null && CHASE) {

            if(!STAGE_1)
                STAGE();

            ang = this.target.pos.sub(this.pos).angle+90;
            
            let angle = ang;

            let d = diff(this.angle, angle);

            // this.scale.y = this.scale.y-(this.scale.y-Math.min(50, Math.max(50/d, 30)))*0.1;

            angle += d;

            if(angles(this.angle, angle))
                this.angle += d*0.2;
            else
                this.angle -= d*0.2;

            let dst = MIN_DIST;

            if(this.target == player && this.tag2 == "friend")
                dst = 1500;
            
            if(Math.abs(diff(ang, this.angle)) < 10 && this.target.pos.sub(this.pos).len > dst)
                this.velo = this.velo.add(vec2(this.acc, 0).rot(this.angle-90));

            this.ms ++;

            if((this.target != player || this.tag2 == "enemy") && Math.abs(diff(ang, this.angle)) < 10 && this.ms >= this.delay) {
                this.shoot(this.bullet);
                this.ms = 0;
            }

        }
        else if(!CHASE && this.tagT == "origin" && this.tag2 == "friend") {

            const tar = vec2(-1000, this.i*400);

            ang = tar.sub(this.pos).angle+90;
            
            let angle = ang;

            let d = diff(this.angle, angle);

            // this.scale.y = this.scale.y-(this.scale.y-Math.min(50, Math.max(50/d, 30)))*0.1;

            angle += d;

            if(angles(this.angle, angle))
                this.angle += d*0.2;
            else
                this.angle -= d*0.2;
            
            

            if(Math.abs(diff(ang, this.angle)) < 10 && tar.sub(this.pos).len > 500)
                this.velo = this.velo.add(vec2(this.acc, 0).rot(this.angle-90));

        }

        // rjs.currentCamera.pos = rjs.currentCamera.pos.sub(rjs.currentCamera.pos.sub(this.pos).mult(0.2));

        let dist = Infinity;
        let target = null;

        if(this.tagT == "origin") {
            F_SHIPS.forNearTo(this.pos, ship => {
                const d = ship.pos.sub(this.pos).len;
                if(ship.twin != this && ship.tag != this.tag && d < dist) {
                    dist = d;
                    target = ship;
                }
            }, 2000);
        }

        if(target != null)
            this.target = target;
        else if(this.tag2 == "friend" && STAGE_1) {
            this.target = player;
        }
        
        
    });

})