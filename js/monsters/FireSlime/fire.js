class Fire {
    constructor (ctx,playerIsLookingRigth, x, y){
        this.ctx = ctx
        this.w = 50
        this.h = 50
        this.x = x
        this.y = y+40

        //pendiete por calcular la recta
        this.vx = 0;
        this.vy = 0;
        this.tick = 0;
        
        this.playerIsLookingRigth = playerIsLookingRigth
        this.shadowballImg = new Image();
        this.shadowballImg.frames = 3;
        this.shadowballImg.frameIndex = 0;
        if(this.playerIsLookingRigth){   
            this.shadowballImg.src = FIRESLIME_FIRE_RIGTH
          }
        if(!this.playerIsLookingRigth){ 
            this.shadowballImg.src = FIRESLIME_FIRE_LEFT
        }
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
        this.y += this.vy;
        this.x += this.vx;

        this.tick++

        this.animate();


        if (this.playerIsLookingRigth){
            this.vx = 5;
        }

        if (!this.playerIsLookingRigth){
            this.vx = -5;

        }
    }

    animate() {
        if ((this.tick % 8 === 0 )) {
            this.shadowballImg.frameIndex++;
            if (this.shadowballImg.frameIndex >= this.shadowballImg.frames) {
                this.shadowballImg.frameIndex = 0;
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