class Heart {
    constructor(ctx, x, y=15, w=50, h=50){
        this.ctx = ctx
        this.w = w
        this.h = h
        this.x = x
        this.y = y
        this.tick = 0;

        this.heartImg = new Image();
        this.heartImg.frames = 6;
        this.heartImg.frameIndex = 0;
        this.heartPoints = 2
    }

    draw(showlivesOnX, showlivesOnY, widhtMonsterHeart, heightMonsterHeart) {

        if (this.heartPoints === 2) {
            this.heartImg.src = '/img/GOUSTY/Hearts/Gousty_Hearts.png'
        }
        if (this.heartPoints === 1) {
            this.heartImg.src = '/img/GOUSTY/Hearts/Gousty_Hearts_With_Half life.png'
        }
        if (this.heartPoints <= 0) {
            this.heartImg.src = '/img/GOUSTY/Hearts/Gousty_Hearts_With_No_Points.png'
        }
        this.ctx.drawImage(
            this.heartImg,
            (this.heartImg.width * this.heartImg.frameIndex) / this.heartImg.frames , 
            0, 
            this.heartImg.width / 6, 
            this.heartImg.height,
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
            this.heartImg.frameIndex++;
            if (this.heartImg.frameIndex >= this.heartImg.frames) {
                this.heartImg.frameIndex = 0;
            }
        }
    }
    
    
}