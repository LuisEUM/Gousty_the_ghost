class Shadowball {
    constructor (ctx, x, y, playerIsLookingRigth, PlayerIsLookingLeft){
        this.ctx = ctx

        this.w = 60
        this.h = 60
        this.x = x
        this.y = y
        this.playerIsLookingRigth = playerIsLookingRigth
        this.PlayerIsLookingLeft = PlayerIsLookingLeft
        this.vx = 0;
        this.vy = 0; 
    
        this.tick = 0;
    
        this.gravity = GRAVITY;
    
        this.shadowballImg = new Image();
        this.shadowballImg.frames = 14;
        this.shadowballImg.frameIndex = 0;
        this.shadowballImg.src = '/img/Gousty - Shodow Ball.png'
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

        if (this.tick >= 14){
            this.animate();
        }

        if (this.tick >= 50 && this.playerIsLookingRigth){
            this.vx = 10;
            this.x += this.vx;
            this.tick = 0
        }

        if (this.tick >= 50 && this.PlayerIsLookingLeft){
            this.vx = -10;
            this.x += this.vx;
            this.tick = 0
        }
    }

    animate() {
        if ((this.tick % 7 === 0 )) {
            this.shadowballImg.frameIndex++;
            if (this.shadowballImg.frameIndex >= this.shadowballImg.frames) {
                this.shadowballImg.frameIndex = 4;
            }
        }
    }

    
}