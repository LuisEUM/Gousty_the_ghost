class Mp {
    constructor(ctx, x, y=50, w=50, h=50){
        this.ctx = ctx
        this.w = w
        this.h = h
        this.x = x
        this.y = y
        this.tick = 0;

        this.mpImg = new Image();
        this.mpImg.frames = 6;
        this.mpImg.frameIndex = 0;
        this.mpPoints = 3
    }

    draw() {
        if (this.mpPoints === 3) {
            this.mpImg.src = '/img/GOUSTY/Hearts/Gousty_Hearts.png'
        }
        if (this.mpPoints === 2) {
            this.mpImg.src = '/img/GOUSTY/Hearts/Gousty_Hearts.png'
        }
        if (this.mpPoints === 1) {
            this.mpImg.src = '/img/GOUSTY/Hearts/Gousty_Hearts_With_Half life.png'
        }
        if (this.mpPoints <= 0) {
            this.mpImg.src = '/img/GOUSTY/Hearts/Gousty_Hearts_With_No_Points.png'
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