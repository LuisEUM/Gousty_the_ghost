class SwordSlime {
    constructor(ctx, x, y, characterIsLookingRigth) {
      // TODO: init player attributes: position, size, v, a, img, audio, score, tick
      this.ctx = ctx
      this.tuck = 0
      this.w = 90;
      this.h = 80;
      this.x =  ctx.canvas.width - this.w;
      this.x =  x || 0;
      this.y = y || ctx.canvas.height - EARTH - this.h - 100;
      this.hitable = true;
      this.vx = 0;
      this.vy = 0;
      this.strength= 1;
      this.tick = 0;
      this.platformscheck;
      this.jump = false
      this.tock = 0;
      this.bounceAttack = 0;
      this.gravity = GRAVITY;
      this.arrswordS = []
  
      this.heartsM = new Hearts(ctx);
      this.heartsM.createlife(1);
  
      this.characterImg = new Image();
      this.characterImg.frames = 6;
      this.characterImg.frameIndex = 0;
      this.characterImg.src;
      this.slashing = false
  
      // hacer saber al juego a donde mira el personaje principal
      this.characterIsLookingRigth = characterIsLookingRigth || false;
    //  this.characterIsLookingLeft = true;
  
      // TODO: init enemy. set x,y randomly top or right.
      // TODO: play fireball audio
    }
  
      draw() {

      this.arrswordS.forEach((swordS) => {
          swordS.draw()
      })


      if(this.hitable === false){
        this.characterImg.frames = 6;
        if(!this.characterIsLookingRigth){   
          this.characterImg.src = SWORDSLIME_CRYING_LOOKING_LEFT
        }
        if(this.characterIsLookingRigth){ 
          this.characterImg.src = SWORDSLIME_CRYING_LOOKING_RIGTH
        }
      } else if(this.slashing){
        this.characterImg.frames = 9;

        if(this.characterIsLookingRigth){
          this.characterImg.src= SWORDSLIME_ATTACKING_RIGTH;
        }else{
          this.characterImg.src= SWORDSLIME_ATTACKING_LEFT;
        }
      } else {
        this.characterImg.frames = 6;

        if(this.characterIsLookingRigth){   
          this.characterImg.src = SWORDSLIME_LOOKING_RIGTH
        }
        if(!this.characterIsLookingRigth){ 
          this.characterImg.src = SWORDSLIME_LOOKING_LEFT
        }
      }
        this.ctx.drawImage(
          this.characterImg,
          (this.characterImg.width * this.characterImg.frameIndex) / this.characterImg.frames , 
          0, 
          this.characterImg.width /  this.characterImg.frames , 
          this.characterImg.height,
          this.x,
          this.y + 10,
          this.w,
          this.h
        )
    }
  
    move(player) {
      this.tick++;
        ///activar la animacion de la espada
        this.arrswordS.forEach((swordS) => {
            swordS.move();
        });

        if(!this.jumpable){
        this.vy += this.gravity;
        }else{
        this.vy = -6;
        this.jumpable = false
        }
        this.y += this.vy;
        this.x += this.vx;
        if (this.tick >= 15) { 
          this.tick = 0;
          this.animate();
          }
          
        this.tock++

        if (this.x + this.w > this.ctx.canvas.width) { //pared de la derecha
        this.x = this.ctx.canvas.width - this.w;
        this.characterIsLookingRigth = false
        }

        if (this.x < 0) {  //pared de la izquierda
        this.x = 0;
        this.characterIsLookingRigth = true
        }

        if(player.y < this.y - 200){
        this.slashing = false
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
        }else{
          this.follow(player);
        }
    }
  
    animate() {
        this.characterImg.frameIndex++;
        if (this.characterImg.frameIndex >= this.characterImg.frames) {
          this.characterImg.frameIndex = 0;
        }
    }

    //sacar arma
      slash() {
          if(this.characterImg.frameIndex === 8 && this.slashing){
            this.tuck++
            if(this.tuck === 1){ 
            const swordS = new SwordS(
              this.ctx,
              this.x + this.w,
              this.y + this.h,
              this.characterIsLookingRigth,
              );
              this.arrswordS.push(swordS);
              this.slashing = false
          }
        }
        console.log(this.arrswordS)
      }
  
    follow(player){
        if(this.hitable && !this.slashing){
          if( player.x  > this.x + 90 ){
            this.characterIsLookingRigth = true
            this.vx = 10
          }else if(player.x  < this.x - 90){
            this.characterIsLookingRigth = false
            this.vx = -10
          }else{
            this.vx = 0
            setTimeout(() => [
              this.slashing = true
            ], 800)   
          }
        }else{
            this.vx = 0
            this.slash() 

            this.animate();

            setTimeout(() => [
              this.tuck = 0,
              this.arrswordS.pop()
            ], 200)      
        }
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
  