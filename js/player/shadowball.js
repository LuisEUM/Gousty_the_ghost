class Shadowball {
    constructor (ctx, x, y, playerIsLookingRigth, PlayerIsLookingLeft){
        this.ctx = ctx

        this.w = 120
        this.h = 120
        this.x = x -18
        this.y = y -30
        this.playerIsLookingRigth = playerIsLookingRigth
        this.PlayerIsLookingLeft = PlayerIsLookingLeft
        this.vx = 0;
        this.vy = 0;
    
        this.tick = 0;
    
        this.shadowballImg = new Image();
        this.shadowballImg.frames = 14;
        this.shadowballImg.frameIndex = 0;
        this.shadowballImg.src = '/img/GOUSTY/ShadowBall/Gousty - Shodow Ball.png'
    }

    draw() {
        this.ctx.drawImage(
            this.shadowballImg,
            (this.shadowballImg.width * this.shadowballImg.frameIndex) / this.shadowballImg.frames , 
            0, 
            this.shadowballImg.width / 14, 
            this.shadowballImg.height,
            this.x,
            this.y,
            this.w,
            this.h
        )
    }
    
    move() {
        this.vy += 0;
        this.y += this.vy;
        this.x += this.vx;
        this.tick++

        if (this.tick >= 4){
            this.animate();
        }

        if (this.tick >= 10 && this.playerIsLookingRigth){
            this.vx = 20;
            this.x += this.vx;
            this.tick = 0
        }

        if (this.tick >= 10 && this.PlayerIsLookingLeft){
            this.vx = -20;
            this.x += this.vx;
            this.tick = 0
        }
    }

    animate() {
        if ((this.tick % 2 === 0 )) {
            this.shadowballImg.frameIndex++;
            if (this.shadowballImg.frameIndex >= this.shadowballImg.frames) {
                this.shadowballImg.frameIndex = 4;
            }
        }
    }

    
}