class FastSlimes {
  constructor(ctx, x, y, characterIsLookingRigth) {
    // TODO: init player attributes: position, size, v, a, img, audio, score, tick
    this.ctx = ctx

    this.w = 40;
    this.h = 35;
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

    this.heartsM = new Hearts(ctx);
    this.heartsM.createlife(1);

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
    if(this.hitable == false){
      if(!this.characterIsLookingRigth){   
        this.characterImg.src = FASTSLIME_CRYING_LOOKING_RIGTH
      }
      if(this.characterIsLookingRigth){ 
        this.characterImg.src = FASTSLIME_CRYING_LOOKING_LEFT
      }
    } else {
      if(this.characterIsLookingRigth){   
        this.characterImg.src = FASTSLIME_LOOKING_RIGTH
      }
      if(!this.characterIsLookingRigth){ 
        this.characterImg.src = FASTSLIME_LOOKING_LEFT
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

  move(player) {
    if(!this.jumpable){
      this.vy += this.gravity;
    }else{
      this.vy = -6;
      this.jumpable = false
    }
    this.x += this.vx;
    this.y += this.vy;
    this.tock++

    if (this.x + this.w > this.ctx.canvas.width) { //pared de la derecha
      this.x = this.ctx.canvas.width - this.w;
      this.characterIsLookingRigth = false
    }

    if (this.x < 0) {  //pared de la izquierda
      this.x = 0;
      this.characterIsLookingRigth = true
    }

    this.tick++;

    if (this.tick >= 15 && this.y >= ctx.canvas.height - EARTH - this.h) { 
      this.tick = 0;
      this.animate();
    }

    
    if(player.y < this.y - 200){
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

  follow(player){
      if(this.hitable){
        if(player.x  > this.x + 20 ){
          this.characterIsLookingRigth = true
          this.vx = 4
        }else if(player.x  < this.x - 20){
          this.characterIsLookingRigth = false
          this.vx = -4
        }else{
          this.vx = 0
        }
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
