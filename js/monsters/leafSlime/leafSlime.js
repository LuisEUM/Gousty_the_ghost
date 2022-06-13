class LeafSlime {
    constructor(ctx, x, y, characterIsLookingRigth) {
      // TODO: init player attributes: position, size, v, a, img, audio, score, tick
      this.ctx = ctx
  
      this.w = 80;
      this.h = 70;
      this.x =  ctx.canvas.width - this.w;
      this.x =  x;
      this.y = y;
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
      this.heartsM.createlife(1);
      this.leafs = [];
      this.playerIsLookingRigth;
  
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
        //LEAF dibujado de proyectiles
        this.leafs.forEach((leaf) => {
            leaf.draw();
          });
    if(this.hitable == false){
      if(this.characterIsLookingRigth){   
        this.characterImg.src = DARKSLIME_CRYING_LOOKING_LEFT
      }
      if(!this.characterIsLookingRigth){ 
        this.characterImg.src = DARKSLIME_CRYING_LOOKING_RIGTH
      }
    }else{
      if(this.characterIsLookingRigth){   
        this.characterImg.src = DARKSLIME_LOOKING_RIGTH
      }
      if(!this.characterIsLookingRigth){ 
        this.characterImg.src = DARKSLIME_LOOKING_LEFT
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
        //Movimiendo del slime de un lado a otro
        this.follow(player);

        //tiempo de recarga del disparo
        this.tock++
        if (this.tock >= 150) {
            this.bounceAttack = Math.floor(Math.random()*10)
            if(this.bounceAttack >= 5){
                this.shoot(player)
            }
            this.tock = 0
        } 

        //LEAF movimiento de proyectiles 
        this.leafs.forEach((leaf) => {
        leaf.move();
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


        if(this.hitable){ //CUANDO EL MOUNSTRUO NO  SEA GOLPEABLE
        this.vx = 0 // CON ESTO HACEMOS QUE SE MUEVA A LA DERECHA
        }
        else{ //CUANDO EL MOUNSTRUO NO  SEA GOLPEABLE
        this.vy += 0.1 
        }

        this.tick++;

        if (this.tick >= 30) { 
        this.tick = 0;
        this.animate();
        }

        if (this.x + this.w > this.ctx.canvas.width) { //pared de la derecha
        this.x = this.ctx.canvas.width - this.w;
        }

        if (this.x < 0) {  //pared de la izquierda
        this.x = 0;
        }
    }
  
    animate() {

        this.characterImg.frameIndex++;
        if (this.characterImg.frameIndex >= this.characterImg.frames) {
          this.characterImg.frameIndex = 0;
        }
    }

    //seguir al personaje 

    follow(player){
        if(this.hitable){
          if(player.x  > this.x + 20 ){
            this.characterIsLookingRigth = true
          }else if(player.x  < this.x - 20){
            this.characterIsLookingRigth = false
          }else{
            this.vx = 0
          }
        }
    }
  
    
    //disparo de proyectiles
    shoot(player) {
        const leaf = new Leaf(
        this.ctx,
        player,
        this.x + this.w,
        this.y + this.h
        );

        this.leafs.push(leaf);
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
  