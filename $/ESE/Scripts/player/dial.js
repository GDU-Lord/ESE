(function () {

    this.Text = new rjs.Text({
        pos: this.pos.sub(this.size.div(2.1, 2.1)),
        size: 30,
        font: f_pix,
        // font: "Arial",
        text: "",
        origin: "left-top",
        color: rgb(200, 220, 255),
        layer: this.text_layer
    });

    this.frame1 = new DIAL_FRAME({
        pos: vec2(),
        layer: this.frame_layer
    });

    this.frame2 = new DIAL_FRAME({
        pos: vec2(),
        scale: vec2(-1, 1),
        layer: this.frame_layer
    });

    this.av1 = new AV({
        pos: this.frame1.pos,
        layer: this.av_layer
    });

    this.av2 = new AV({
        pos: this.frame2.pos,
        layer: this.av_layer
    });

    this.text = "";
    this.curText = "";
    this.clear = true;
    
    this.loops = [function () {

        this.av1.render = this.av1.texture != null;
        this.av2.render = this.av2.texture != null;

        this.frame1.pos = this.pos.sub(this.size.x/2+vec2(65, 64).mult(dial_scale).x/2, dial_scale*2);
        this.frame2.pos = this.pos.add(this.size.x/2+vec2(65, 64).mult(dial_scale).x/2, -dial_scale*2);
        this.av1.pos = this.frame1.pos;
        this.av2.pos = this.frame2.pos;

        this.Text.opacity = 100-OPC;

        if(this.clear) {
            this.curText = "";
            this.text = "";
            this.clear = false;
        }

        if(this.curText != this.text) {
            this.curText += this.text[this.curText.length];
        }

        this.Text.text = "";
        
        const words = this.curText.split(" ");
        const words2 = this.text.split("\n");

        for(let i in words) {
            const text = this.Text.text + words2[i] + " ";
            const lines = text.split("\n");
            if(lines[lines.length-1].length > 45 && words[i]) {
                this.Text.text = this.Text.text + "\n" + words[i] + " ";
            }
            else {
                this.Text.text = this.Text.text + words[i] + " ";
            }
        }

        if(this.text != "") {
            this.pos = this.pos.sub(this.pos.sub(0, 350).mult(0.1));
        }
        else if(rjs.currentScene == fight_scene && DIAL_MOVE) {
            this.pos = this.pos.sub(this.pos.sub(0, 1000).mult(0.1));
        }

    }];


})