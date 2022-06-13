class Item {
    constructor(ctx,x = 200,y = 20, type = false /*type de 1 a 4 media vida de 5 a 7 mana de 8 a 9 vida completa y 10 te recupera toda la vida*/) {
      // TODO: init player attributes: position, size, v, a, img, audio, score, tick
      this.ctx = ctx
  
      this.w = 50
      this.h = 50
      this.x = x
      this.y = y
      this.vx = 0;
      this.vy = -6;
      this.tick = 0;
      
      this.tock = 0;
      this.bounceAttack = 0
      this.gravity = GRAVITY;
  
      this.characterImg = new Image();
      this.characterImg.frames = 5;
      this.characterImg.frameIndex = 0;

      this.rn;
      //rng de tipos de poscion
      if(!type){
        this.rn = Math.floor((Math.random() * 10) + 1);
      }else{
        this.rn = type
      }
      //if para indicarle el tipo a las posiones
      if(this.rn <= 4){
        this.characterImg.src = '/img/ITEMS/POTIONS/POTION_HALF_HEART.png'
      }else if(this.rn <= 7){
        this.characterImg.src = '/img/ITEMS/POTIONS/POTION_FULL_HEART.png'
      }else if(this.rn <= 9){
        this.characterImg.src = '/img/ITEMS/POTIONS/POTION_POWER_UP.png'
      }else{
        this.characterImg.src = '/img/ITEMS/POTIONS/POTION_FULL_LIFE.png'
      }

  

    }
  
    draw() {
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
          this.vy = -4; // CON ESTO HACEMOS QUE SE MUEVA SALTANDO
        }
  
  
      this.tick++;
  
      if (this.tick >= 15) { 
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
        this.characterImg.frameIndex++;
  
        if (this.characterImg.frameIndex >= this.characterImg.frames) {
          this.characterImg.frameIndex = 0;
        }
    }
 
    bigJumpAttack(){
      this.vy += -2;
    }
    
    collides(player) {
      const colX = 
        player.x <= this.x + this.w - 20 &&  //derecha del player
        player.x + player.w - 20 >= this.x;  //el mounstro esta a la izquierda
      const colY = 
        player.y + player.h >= this.y + 20 && //arriba del player
        player.y <= this.y + this.h -20; //abajo del player

      if(colX && colY){
        if(this.rn <= 4){
          player.hearts.healup(1);
        }else if(this.rn <= 7){
          player.hearts.healup(2);
        }else if(this.rn <= 9){
          player.MpContainer.winMp(player.MpContainer.maxmp * 2);
        }else{
          player.hearts.healup(player.hearts.maxhp * 2);
        }
      }

      return colX && colY
    }
  }