class SwordS {
    constructor (ctx, x, y, playerIsLookingRigth){
        this.ctx = ctx

        this.w = 182.4574
        this.h = 200
        if(playerIsLookingRigth){
            this.x = x
        }else{
            this.x = x - 200
        }
        
        this.y = y
        this.playerIsLookingRigth = playerIsLookingRigth
        this.vx = 0;
        this.vy = 0;
        this.tick = 0;
    
        this.gravity = GRAVITY;
    
        this.swordImg = new Image();
        this.swordImg.frames = 3;
        this.swordImg.frameIndex = 0;
        this.swordImg.src


    }

    draw() {
        if(!this.playerIsLookingRigth){ //Animacion en tierra
            this.swordImg.src = SWORD_ON_EARTH_LOOKING_LEFT1 
        }
        if(this.playerIsLookingRigth){
            this.swordImg.src = SWORD_ON_EARTH_LOOKING_RIGTH1  
        }  
        
        this.ctx.drawImage(
            this.swordImg,
            (this.swordImg.width * this.swordImg.frameIndex) / this.swordImg.frames , 
            0, 
            this.swordImg.width / this.swordImg.frames, 
            this.swordImg.height,
            this.x,
            this.y - 150,
            this.w,
            this.h
        )
    }
    
    move() {
        this.tick++
        if ((this.tick % 2 === 0 )) { //velocidad de la animación, recuerda cambiar a la vez la velocidad de la animación en el personaje con el mismo valor
            this.swordImg.frameIndex++;
            if (this.swordImg.frameIndex >= this.swordImg.frames) {
                this.swordImg.frameIndex = 3
            }
        }
    }

        collides(enemy,strike){
            const colWX = 
                this.x <= enemy.x + enemy.w - 20 &&  //derecha del player
                this.x + this.w - 20 >= enemy.x;  //el mounstro esta a la izquierda
            const colWY = 
                this.y + this.h >= enemy.y + 20 && //arriba del player
                this.y <= enemy.y + enemy.h -20; //abajo del player
            
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

