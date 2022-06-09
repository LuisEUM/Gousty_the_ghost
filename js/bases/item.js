class Item {
    constructor(ctx) {
      // TODO: init player attributes: position, size, v, a, img, audio, score, tick
      this.ctx = ctx
  
      this.w = 50
      this.h = 30
      this.x =  ctx.canvas.width - this.w
      this.y = ctx.canvas.height - EARTH - this.h - 100
      this.vx = 0;
      this.vy = 0;
      this.tick = 0;
  
      this.tock = 0;
      this.bounceAttack = 0
      this.gravity = GRAVITY;
  
      this.characterImg = new Image();
      this.characterImg.frames = 6;
      this.characterImg.frameIndex = 0;
      this.characterImg.src = '/img/GOUSTY/Hearts/Gousty_Hearts.png'
  
      // hacer saber al juego a donde mira el personaje principal
      this.characterIsLookingRigth = false;
      this.characterIsLookingLeft = true;
  
      // TODO: init enemy. set x,y randomly top or right.
      // TODO: play fireball audio
    }
  
    draw() {
      if( true){
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
    }
  
    move() {
        this.vy += this.gravity;
        // por si queremos un random de drop this.x += this.vx;
        this.y += this.vy;
        this.tock++
    
        if (this.tock >= 30) {
          this.bounceAttack = Math.floor(Math.random()*10)
            if(this.bounceAttack >= 5){
              this.bigJumpAttack()
            }
          this.tock = 0
        } 
    
        if (this.y >= ctx.canvas.height - EARTH - this.h) {
          this.y = ctx.canvas.height - EARTH - this.h;
          this.vy = -2; // CON ESTO HACEMOS QUE SE MUEVA SALTANDO
        }
        this.characterImg.src = '/img/GOUSTY/Hearts/Gousty_Hearts.png';
  
      if (this.characterIsLookingRigth){
        if(this.hitable){ //CUANDO EL MOUNSTRUO NO  SEA GOLPEABLE
          this.vx = 1 // CON ESTO HACEMOS QUE SE MUEVA A LA DERECHA
        }
        else{ //CUANDO EL MOUNSTRUO NO  SEA GOLPEABLE
          this.vy += 0.1 
        }
        this.characterImg.src = '/img/GOUSTY/Hearts/Gousty_Hearts.png'
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
    }
  
    animate() {
      if (this.vy) {
        this.characterImg.frameIndex++;
  
        if (this.characterImg.frameIndex >= this.characterImg.frames) {
          this.characterImg.frameIndex = 0;
        }
      }
    }
 
    bigJumpAttack(){
      this.vy = -4;
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
  
      if(colX && colY){
      

        return colX && colY
      }
    }

  }