() => {

    $CURRENT_VOICE = null;
    $QUEUE = [];

    $voice = (vcs) => {

        if(CURRENT_VOICE != null)
            CURRENT_VOICE.stop();
        CURRENT_VOICE = null;
        QUEUE = vcs;
        
    };

    $voice_loop = () => {

        if(CURRENT_VOICE == null) {
            if(QUEUE.length > 0) {
                CURRENT_VOICE = s_vcs[QUEUE[0]];
                CURRENT_VOICE.play();
            }
            else {
                dial_next();
            }
        }
        if(CURRENT_VOICE != null) {
            if(CURRENT_VOICE.getDuration() == CURRENT_VOICE.getTime()) {
                const nq = [];
                for(let i = 1; i < QUEUE.length; i ++) {
                    nq.push(QUEUE[i]);
                }
                QUEUE = nq;
                CURRENT_VOICE.stop();
                CURRENT_VOICE = null;
            }
        }

    };

}