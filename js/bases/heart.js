class Heart {
    constructor(ctx, x, y=50, playerIsLookingRigth, PlayerIsLookingLeft ){
        this.ctx = ctx
        this.w = 60
        this.h = 60
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
                this.x,
                this.y,
                this.w,
                this.h
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
                this.x,
                this.y,
                this.w,
                this.h
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