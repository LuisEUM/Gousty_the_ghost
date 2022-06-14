class ArrowR {
    constructor(ctx){
        this.ctx = ctx
        this.w = 117
        this.h = 75
        this.x = 800
        this.y = 420
        this.tick = 0;

        this.mpImg = new Image();
        this.mpImg.src = RIGTH_ARROW
        this.mpImg.frames = 6;
        this.mpImg.frameIndex = 0;
    }

    draw() {
        this.mpImg.src = RIGTH_ARROW
        this.ctx.drawImage(
            this.mpImg,
            (this.mpImg.width * this.mpImg.frameIndex) / this.mpImg.frames , 
            0, 
            this.mpImg.width / 6, 
            this.mpImg.height,
            this.x + 15,
            this.y,
            this.w,
            this.h
        )
    }
    
    move() {
        this.tick++
        if (this.tick){
            this.animate();
        }
    }


    animate() {
        if ((this.tick % 12 === 0 )) {
            this.mpImg.frameIndex++;
            if (this.mpImg.frameIndex >= this.mpImg.frames) {
                this.mpImg.frameIndex = 0;
            }
        }
    }
    
    
}