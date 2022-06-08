class DarkSlimes {
  constructor(ctx) {
    // TODO: init player attributes: position, size, v, a, img, audio, score, tick
    this.ctx = ctx

    this.w = 80
    this.h = 70
    this.x =  ctx.canvas.width - this.w
    this.x =  0
    this.y = ctx.canvas.height - EARTH - this.h - 100
    this.hitable = true
    this.vx = 0;
    this.vy = 0;
    this.strength= 1
    this.tick = 0;

    this.tock = 0;
    this.bounceAttack = 0
    this.gravity = GRAVITY;

    this.heart1 = new Heart(ctx, this.x, this.y)
    this.monsterLife = [this.heart1]

    this.characterImg = new Image();
    this.characterImg.frames = 6;
    this.characterImg.frameIndex = 0;
    this.characterImg.src = '/img/Dark_Slimes_Basic_Looking_LEFT.png'

    // hacer saber al juego a donde mira el personaje principal
    this.characterIsLookingRigth = false;
    this.characterIsLookingLeft = true;

    // TODO: init enemy. set x,y randomly top or right.
    // TODO: play fireball audio
  }

  draw() {
    if(this.hitable){
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
    if(!this.hitable && this.vx >= -1){
      // if(!this.hitable && this.characterIsLookingRigth){
      //   this.characterImg.src = '/img/Dark_Slime_Vulnerable_LookingRigth.png'
      // }
          
      // if(!this.hitable && this.characterIsLookingLeft){
         this.characterImg.src = '/img/Dark_Slime_Vulnerable_LookingLeft.png'
      // }
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
    if(!this.hitable && this.vx < -1){
      // if(!this.hitable && this.characterIsLookingRigth){
      //   this.characterImg.src = '/img/Dark_Slime_Vulnerable_LookingRigth.png'
      // }
          
      // if(!this.hitable && this.characterIsLookingLeft){
         this.characterImg.src = '/img/Dark_Slime_Vulnerable_LookingRigth.png'
      // }
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

    let showlivesOnX = this.x + 20
    let showlivesOnY = this.y - 50 
    if(this.hitable === true){
      this.monsterLife[0].draw(showlivesOnX, showlivesOnY, 0.1, 0.1)
    }
    else if (this.hitable === false){
      this.monsterLife[0].draw(showlivesOnX, showlivesOnY, 30, 30)
    }

    //this.monsterLife.forEach((heart) => heart.draw());


  }

  move() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.tock++

    if (this.tock >= 120) {
      this.bounceAttack = Math.floor(Math.random()*10)
        if(this.bounceAttack >= 5){
          this.bigJumpAttack()
        }
      this.tock = 0
    } 

    if (this.y >= ctx.canvas.height - EARTH - this.h) {
      this.y = ctx.canvas.height - EARTH - this.h;
      this.vy = -6; // CON ESTO HACEMOS QUE SE MUEVA SALTANDO
    }

    if (this.characterIsLookingLeft){
      if(this.hitable){ //CUANDO EL MOUNSTRUO SEA GOLPEABLE
        this.vx = -1 // CON ESTO HACEMOS QUE SE MUEVA A LA IZQUIERDA
      }
      else{//CUANDO EL MOUNSTRUO NO  SEA GOLPEABLE
        this.vy += 0.1
      }

      this.characterImg.src = '/img/Dark_Slimes_Basic_Looking_LEFT.png'
    }

    if (this.characterIsLookingRigth){
      if(this.hitable){ //CUANDO EL MOUNSTRUO NO  SEA GOLPEABLE
        this.vx = 1 // CON ESTO HACEMOS QUE SE MUEVA A LA DERECHA
      }
      else{ //CUANDO EL MOUNSTRUO NO  SEA GOLPEABLE
        this.vy += 0.1 
      }
      this.characterImg.src = '/img/Dark_Slimes_Basic_Looking_RIGTH.png'
    }

    this.tick++;

    if (this.tick >= 15 && this.y >= ctx.canvas.height - EARTH - this.h) { 
      this.tick = 0;
      this.animate();
    }

    if (this.x + this.w > this.ctx.canvas.width) { //pared de la derecha
      this.x = this.ctx.canvas.width - this.w;
      this.vx = 0;
      this.characterIsLookingRigth = false
      this.characterIsLookingLeft = true
    }

    if (this.x < 0) {  //pared de la izquierda
      this.x = 0;
      this.vx = 0;
      this.characterIsLookingRigth = true
      this.characterIsLookingLeft = false
    }
    
    
    this.monsterLife.forEach((heart) => heart.move());

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
    this.vy = -7;
  }


  checkPlayerColisions(player){
    this.collides(player) 
  }
  
  collides(player) {
    const colX = 
    player.x <= this.x + this.w - 20 &&  //derecha del player
    player.x + player.w - 20 >= this.x;  //el mounstro esta a la izquierda
    const colY = 
    player.y + player.h >= this.y + 20 && //arriba del player
    player.y <= this.y + this.h -20; //abajo del player

    if(colX && colY && this.hitable){

        if(player.x > this.x && player.basicAttackMode === true){ //mounstruo a la izquierda del player
           console.log('IZQUIERDA DEL PLAYER')
           this.vx = -0.5
           this.x += this.vx
           this.characterIsLookingRigth = true
           this.characterIsLookingLeft = false
           this.hitable = false
           this.characterImg.src = '/img/Dark_Slime_Vulnerable_LookingRigth.png'
        }

        if(player.x < this.x && player.basicAttackMode === true){ //mounstruo a la derecha del player
           console.log('DERECHA DEL PLAYER')
           this.vx = 0.5
           this.x += this.vx
           this.characterIsLookingRigth = false
           this.characterIsLookingLeft = true
           this.hitable = false
        }
        if(this.isAlive() === true){
          setTimeout(() => [
            this.hitable = true
          ], 6000)
        }

        return colX && colY

    }
  }

  isAlive() {
    let lastHeart = this.monsterLife.length - 1
    if(this.monsterLife[lastHeart].heartPoints === 0){
      this.vx = 0
      this.vy = 0
      return false
    }else {
      return true
    }
  }

}
