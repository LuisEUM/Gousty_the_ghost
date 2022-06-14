class Mp {
    constructor(ctx, x, y=60, w=40, h=40){
        this.ctx = ctx
        this.w = w
        this.h = h
        this.x = x + 5
        this.y = y
        this.tick = 0;

        this.mpImg = new Image();
        this.mpImg.frames = 6;
        this.mpImg.frameIndex = 0;
        this.mp = 0
    }

    draw() {
        if (this.mp === 3) {
            this.mpImg.src = SHADOWPOINTS4
        }
        if (this.mp === 2) {
            this.mpImg.src = SHADOWPOINTS3
        }
        if (this.mp === 1) {
            this.mpImg.src = SHADOWPOINTS2
        }
        if (this.mp <= 0) {
            this.mpImg.src = SHADOWPOINTS1
        }
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