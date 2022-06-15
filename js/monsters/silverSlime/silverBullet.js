class SilverBullets {
    constructor (ctx,player , x, y){
        this.ctx = ctx

        this.w = 30
        this.h = 30
        this.x = x -18
        this.y = y -30

        //pendiete por calcular la recta
        let xDir = player.x - this.x
        let yDir = player.y - this.y
        let vu = Math.sqrt(Math.pow(xDir, 2) + Math.pow(-yDir , 2))

        this.vx = (xDir /vu)* 14
        this.vy = (yDir / vu) * 14
        this.tick = 0;
    
        this.shadowballImg = new Image();
        this.shadowballImg.frames = 6;
        this.shadowballImg.frameIndex = 0;
        this.shadowballImg.src = SILVER_SBEAM_RIGTH
    }

    draw() {
        this.ctx.drawImage(
            this.shadowballImg,
            (this.shadowballImg.width * this.shadowballImg.frameIndex) / this.shadowballImg.frames , 
            0, 
            this.shadowballImg.width / this.shadowballImg.frames, 
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

            this.tick = 0
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