class Quake {
    constructor (ctx, x, y){
        this.ctx = ctx

        this.w = 80
        this.h = 80
        this.x = x
        this.y = y + 30
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

    collides(player, strike){
        const colWX = 
            this.x <= player.x + player.w - 20 &&  //derecha del player
            this.x + this.w - 20 >= player.x;  //el mounstro esta a la izquierda
        const colWY = 
            this.y + this.h >= player.y + 20 && //arriba del player
            this.y <= player.y + player.h -20; //abajo del player
        
        if (colWX && colWY) {
            return true
        }
        else if (strike) { //con esto nos aseguramos de que el ultimo frame del weapon no altere el resultado
            return true
        } else {
            return false
        }  
    }
    
}