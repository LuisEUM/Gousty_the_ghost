class Sword {
    constructor (ctx, x, y, playerIsLookingRigth, PlayerIsLookingLeft, changeSprite, isOnEarth){
        this.ctx = ctx

        this.w = 182.4574
        this.h = 175.5429
        this.x = x
        this.y = y
        this.playerIsLookingRigth = playerIsLookingRigth
        this.PlayerIsLookingLeft = PlayerIsLookingLeft
        this.vx = 0;
        this.vy = 0;
        this.changeSprite = changeSprite;
        this.tick = 0;
    
        this.gravity = GRAVITY;
    
        this.swordImg = new Image();
        this.swordImg.frames = 3;
        this.swordImg.frameIndex = 0;
        this.swordImg.src
        this.isOnEarth= isOnEarth
    }

    draw() {
        if(this.isOnEarth === true){
            if(this.PlayerIsLookingLeft === true){ //Animacion en tierra
                switch (this.changeSprite) {
                    case 1:
                        this.swordImg.src = SWORD_ON_EARTH_LOOKING_LEFT1 
                        break;
                    case 2:
                        this.swordImg.src = SWORD_ON_EARTH_LOOKING_LEFT2  
                        break;
                    default:
                        this.swordImg.src = SWORD_ON_EARTH_LOOKING_LEFT1
                        break;
                }
            }
            if(this.playerIsLookingRigth === true){
                switch (this.changeSprite) {
                    case 1:
                        this.swordImg.src = SWORD_ON_EARTH_LOOKING_RIGTH1  
                        break;
                    case 2:
                        this.swordImg.src = SWORD_ON_EARTH_LOOKING_RIGTH2  
                        break;
                    default:
                        this.swordImg.src = SWORD_ON_EARTH_LOOKING_RIGTH1
                        break;
                }
            }
        }
        
        if(this.isOnEarth === false){ //Animacion en el aire
            if(this.PlayerIsLookingLeft === true){
                this.swordImg.src = SWORD_ON_AIR_DOWN_LOOKING_RIGTH  
            }
            if(this.playerIsLookingRigth === true){
                this.swordImg.src = SWORD_ON_AIR_DOWN_LOOKING_LEFT  
            }
        }
        
        this.ctx.drawImage(
            this.swordImg,
            (this.swordImg.width * this.swordImg.frameIndex) / this.swordImg.frames , 
            0, 
            this.swordImg.width / this.swordImg.frames, 
            this.swordImg.height,
            this.x,
            this.y,
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

        collides(player,strike){
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

