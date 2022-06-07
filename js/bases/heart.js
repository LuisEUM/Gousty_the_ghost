class Heart {
    constructor(ctx, x, y=50, w=60, h=60){
        this.ctx = ctx
        this.w = w
        this.h = h
        this.x = x
        this.y = y
        this.tick = 0;

        this.heartImg = new Image();
        this.heartImg.frames = 6;
        this.heartImg.frameIndex = 0;
        this.heartImg.src = '/img/Gousty_Hearts.png'
        this.heartPoints = 2
    }

    draw(showlivesOnX, showlivesOnY, widhtMonsterHeart, heightMonsterHeart) {

        
        console.log(showlivesOnX)

        if (this.heartPoints === 2) {
            this.ctx.drawImage(
                this.heartImg,
                (this.heartImg.width * this.heartImg.frameIndex) / this.heartImg.frames , 
                0, 
                this.heartImg.width / 6, 
                this.heartImg.height,
                showlivesOnX || this.x,
                showlivesOnY || this.y,
                widhtMonsterHeart || this.w,
                heightMonsterHeart || this.h
            )
        }
        if (this.heartPoints === 1) {
            this.heartImg.src = '/img/Gousty_Hearts_With_Half life.png'

            this.ctx.drawImage(
                this.heartImg,
                (this.heartImg.width * this.heartImg.frameIndex) / this.heartImg.frames , 
                0, 
                this.heartImg.width / 6, 
                this.heartImg.height,
                showlivesOnX || this.x,
                showlivesOnY || this.y,
                widhtMonsterHeart || this.w,
                heightMonsterHeart || this.h
            )
        }
        if (this.heartPoints <= 0) {
            this.heartImg.src = '/img/Gousty_Hearts_With_No_Points.png'

            this.ctx.drawImage(
                this.heartImg,
                (this.heartImg.width * this.heartImg.frameIndex) / this.heartImg.frames , 
                0, 
                this.heartImg.width / 6, 
                this.heartImg.height,
                showlivesOnX || this.x,
                showlivesOnY || this.y,
                widhtMonsterHeart || this.w,
                heightMonsterHeart || this.h
            )
        }
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