(function () {
    
    this.markers = {};

    this.loops = [function () {

        F_SHIPS.for(ship => {
            if(!(ship.id in this.markers))
                this.add(ship);
        });

        for(let i in this.markers) {
            const {ship, marker} = this.markers[i];
            if(ship.destroyed)
                this.remove(ship);
            else {

                marker.pos = this.pos.add(ship.pos.sub(this.parent.pos).div(20));

                if(this.pos.sub(marker.pos).len > (this.size.x/2-marker.size.x/2-10))
                    marker.pos = this.pos.add(marker.pos.sub(this.pos).norm().mult(this.size.x/2-marker.size.x/2-10));

            }
        }

    }];

    this.add = function (ship) {
        const m = this.markers[ship.id] = {
            ship: ship,
            marker: new MARKER({
                pos: vec2(this.pos),
                layer: this.layer
            })
        };

        if(m.ship.tag2 == "friend") {
            m.marker.color = rgb(100, 150, 255);
        }
        else if(m.ship.tag2 == "player") {
            m.marker.color = rgb(100, 255, 150);
        }
        else if(m.ship.tag2 == "enemy") {
            m.marker.color = rgb(255, 150, 100);
        }
        else {
            m.marker.color = rgb(255, 255, 100);
        }
    };

    this.remove = function (ship) {
        this.markers[ship.id].marker.destroy();
        delete this.markers[ship.id];
    };

})