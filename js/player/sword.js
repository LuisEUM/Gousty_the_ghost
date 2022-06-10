class Sword {
    constructor (ctx, x, y, playerIsLookingRigth, PlayerIsLookingLeft, changeSprite, isOnEarth, attackUpOnTheGround = false){
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
        this.attackUpOnTheGround = attackUpOnTheGround
    }

    draw() {
        if(this.isOnEarth === true){
            console.log('esta en el suelo', this.attackUpOnTheGround)
           if(this.PlayerIsLookingLeft === true && this.attackUpOnTheGround === false){ //Animacion en tierra
                    switch (this.changeSprite) {
                        case 1:
                            this.swordImg.src = '/img/GOUSTY/SWORD/OnEarth/SWORD-ON_EARTH_LOOKING_LEFT1.png'  
                            break;
                        case 2:
                            this.swordImg.src = '/img/GOUSTY/SWORD/OnEarth/SWORD-ON_EARTH_LOOKING_LEFT2.png'  
                            break;
                        default:
                            this.swordImg.src = '/img/GOUSTY/SWORD/OnEarth/SWORD-ON_EARTH_LOOKING_LEFT1.png'
                            break;
                }

            }
            else if (this.playerIsLookingRigth === true && this.attackUpOnTheGround === false){
                    switch (this.changeSprite) {
                        case 1:
                            this.swordImg.src = '/img/GOUSTY/SWORD/OnEarth/SWORD-ATTACK-RIGTH2_3FPS.png'  
                            break;
                        case 2:
                            this.swordImg.src = '/img/GOUSTY/SWORD/OnEarth/SWORD-ATTACK-RIGTH1_3FPS.png'  
                            break;
                        default:
                            this.swordImg.src = '/img/GOUSTY/SWORD/OnEarth/SWORD-ATTACK-RIGTH2_3FPS.png'
                            break;
                    }  
            }
            else if(this.attackUpOnTheGround === true){
                console.log('ataque de arriba')
                if(this.PlayerIsLookingLeft === true){
                    this.swordImg.src = '/img/GOUSTY/SWORD/OnAir/SWORD_ON_AIR_LEFT.png'  
                }
                if(this.playerIsLookingRigth === true){
                    this.swordImg.src = '/img/GOUSTY/SWORD/OnAir/SWORD_ON_AIR_RIGTH.png'  
                }
            }
        }
        
        else if(this.isOnEarth === false){ //Animacion en el aire
            console.log('en el aire')
            if(this.PlayerIsLookingLeft === true){
                this.swordImg.src = '/img/GOUSTY/SWORD/OnAir/SWORD_ON_AIR_LEFT.png'  
            }
            if(this.playerIsLookingRigth === true){
                this.swordImg.src = '/img/GOUSTY/SWORD/OnAir/SWORD_ON_AIR_RIGTH.png'  
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
        if ((this.tick >= 3)) { //velocidad de la animación, recuerda cambiar a la vez la velocidad de la animación en el personaje con el mismo valor
            this.swordImg.frameIndex++;
            this.tick = 0
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

