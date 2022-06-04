class Heart {
    constructor(ctx, x){
        this.ctx = ctx
        this.w = 60
        this.h = 60
        this.x = x
        this.y = 50 
    
        this.tick = 0;

        this.heartImg = new Image();
        this.heartImg.frames = 6;
        this.heartImg.frameIndex = 0;
        this.heartImg.src = '/img/Gousty_Hearts.png'
        this.health = 1

    }

    draw() {
        this.ctx.drawImage(
            this.heartImg,
            (this.heartImg.width * this.heartImg.frameIndex) / this.heartImg.frames , 
            0, 
            this.heartImg.width / 6, 
            this.heartImg.height,
            this.x,
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
            this.heartImg.frameIndex++;
            if (this.heartImg.frameIndex >= this.heartImg.frames) {
                this.heartImg.frameIndex = 0;
            }
        }
    }

    
}