class FireSlime {
    constructor(ctx, x, y, characterIsLookingRigth) {
      // TODO: init player attributes: position, size, v, a, img, audio, score, tick
      this.ctx = ctx
  
      this.w = 72;
      this.h = 90;
      this.x =  ctx.canvas.width - this.w;
      this.x =  x || 0;
      this.y = y || ctx.canvas.height - EARTH - this.h - 100;
      this.hitable = true;
      this.vx = 0;
      this.vy = 0;
      this.strength= 1;
      this.tick = 0;
      this.tock = 0;
      this.bounceAttack = 0;
      this.gravity = GRAVITY;
      this.platformscheck;
      this.jumpable = false
      this.heartsM = new Hearts(ctx);
      this.heartsM.createlife(2);
      this.fires = [];
      this.charge = false
  
      this.characterImg = new Image();
      this.characterImg.frames = 6;
      this.characterImg.frameIndex = 0;
      this.characterImg.src;
  
      // hacer saber al juego a donde mira el personaje principal
      this.characterIsLookingRigth = characterIsLookingRigth || false;
    //  this.characterIsLookingLeft = true;
  
      // TODO: init enemy. set x,y randomly top or right.
      // TODO: play fireball audio
    }
  
    draw() {
      this.fires.forEach((fire) => {
        fire.draw();
      });

      if(this.hitable == false){
        if(this.characterIsLookingRigth){   
          this.characterImg.src = FIRESLIME_CRYING_LOOKING_RIGTH
        }
        if(!this.characterIsLookingRigth){ 
          this.characterImg.src = FIRESLIME_CRYING_LOOKING_LEFT
        }
      }else if (this.charge){
        if(this.characterIsLookingRigth){   
          this.characterImg.src = FIRESLIME_ATTACKING_RIGTH
        }
        if(!this.characterIsLookingRigth){ 
          this.characterImg.src = FIRESLIME_ATTACKING_LEFT
        }
      }else{
        if(this.characterIsLookingRigth){   
          this.characterImg.src = FIRESLIME_LOOKING_RIGTH
        }
        if(!this.characterIsLookingRigth){ 
          this.characterImg.src = FIRESLIME_LOOKING_LEFT
        }
      }
        this.ctx.drawImage(
          this.characterImg,
          (this.characterImg.width * this.characterImg.frameIndex) / this.characterImg.frames , 
          0, 
          this.characterImg.width / 6, 
          this.characterImg.height,
          this.x,
          this.y + 10,
          this.w,
          this.h
        )
    }
  
    move() {
      this.fires.forEach((fire) => {
        fire.move();
      });
      if(!this.jumpable){
        this.vy += this.gravity;
      }else{
        this.vy = -6;
        this.jumpable = false
      }
  
      this.x += this.vx;
      this.y += this.vy;
      this.tock++
  
      if (this.tock >= 120) {
        this.bounceAttack = Math.floor(Math.random()*10)
          if(this.bounceAttack >= 2){
            this.bigJumpAttack()
          }
        this.tock = 0
      } 
  
      if (!this.characterIsLookingRigth){
        if(this.hitable){ //CUANDO EL MOUNSTRUO SEA GOLPEABLE
          this.vx = -1 // CON ESTO HACEMOS QUE SE MUEVA A LA IZQUIERDA
        }
        else{//CUANDO EL MOUNSTRUO NO  SEA GOLPEABLE
          this.vy += 0.1
        }
  
      }
  
      if (this.characterIsLookingRigth){
        if(this.hitable){ //CUANDO EL MOUNSTRUO NO  SEA GOLPEABLE
          this.vx = 1 // CON ESTO HACEMOS QUE SE MUEVA A LA DERECHA
        }
        else{ //CUANDO EL MOUNSTRUO NO  SEA GOLPEABLE
          this.vy += 0.1 
        }
      }
  
      this.tick++;
  
      if (this.tick >= 15 && this.y >= ctx.canvas.height - EARTH - this.h) { 
        this.tick = 0;
        this.animate();
      }
  
      if (this.x + this.w > this.ctx.canvas.width) { //pared de la derecha
        this.x = this.ctx.canvas.width - this.w;
        this.characterIsLookingRigth = false
      }
  
      if (this.x < 0) {  //pared de la izquierda
        this.x = 0;
        this.characterIsLookingRigth = true
      }
      
      
      this.heartsM.move();
  
    }
  
    animate() {
      if (this.vy) {
        this.characterImg.frameIndex++;
  
        if (this.characterImg.frameIndex >= this.characterImg.frames) {
          this.characterImg.frameIndex = 0;
        }
      }
    }
  
    isVisible() {
      // TODO: return if enemy is inside the canvas based on x and y
    }
  
    bigJumpAttack(){
      this.vy = -16;
      this.charge = true;
    }

    shoot(lado) {
        const fire = new Fire(
        this.ctx,
        lado,
        this.x,
        this.y
        );

        this.fires.push(fire);

        setTimeout(() => [
          this.fires = [],
        ], 800)
    }
    
    isAlive() {
      if(this.heartsM.isAlive()){
        return true
      }else {
        this.vx = 0
        this.vy = 0
        return false
      }
    }
  }  