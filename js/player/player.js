class Player {
  constructor(ctx) {
    // TODO: init player attributes: position, size, v, a, img, audio, score, tick
    this.ctx = ctx;
    this.w = 100;
    this.h = 100;
    this.x = 50;
    this.y = 0;
    this.hitable = true
    this.vx = 0;
    this.vy = 0;
    this.tick = 0;
    this.tock = 0;
    this.tack = 0;
    this.teck = 0;
    this.tuck = 0;
    this.f = false
    this.moving = true
    this.xkey = true
    this.ykey = false;
    this.jumpable = false
    this.i = 0
    this.f = false
    this.moving = true
    this.changeSwordSprite = 0 
    this.playerCanAttack = true 
    this.basicAttackMode = false
    this.attackModeCooldowm = 0
    this.resetAnimationBasicAttack = 0;
    this.isOnAir= false
    this.dash = false

    //CORAZONES
    this.life = new Hearts(ctx);

    this.life.createlife(3);
    this.lastHeart = this.life.length - 1

    //HASTA AQUI
    //MANA
    this.MpContainer = new MpContainer(ctx);

    this.MpContainer.createlife(3);
    //HASTA AQUI

    this.previousPositionX = this.x;

    this.gravity = GRAVITY;

    this.characterImg = new Image();
    this.characterImg.frameIndex = 0;
    this.characterImg.src = GOUSTY_WALKING_RIGTH;
    this.framesCharacter = 6;
    this.characterImg.frames = 6;

    // hacer saber al juego a donde mira el personaje principal
    this.characterIsLookingRigth = true;
    this.characterIsLookingLeft = false;

    //Shadowballs
    this.shadowballs = [];
    this.audioShadowball = new Audio(SHADOWBALL_AUDIO);
    this.audioShadowball.volume = 0.05;
    this.audioShadowball.loop = true;
    this.audioShadowball.currentTime = 1;
    this.hitted = false

    
    //Sword
    this.sword = [];

    //weapons sword + shadowballs
    this.weapons = [];
  }

  draw() {


    if(this.basicAttackMode === false && this.jumpable === true){ // ANIMACIONES EN EL SUELO
      if(this.characterIsLookingRigth){
        this.characterImg.src = GOUSTY_WALKING_RIGTH;
      }
      if(this.characterIsLookingLeft){
        this.characterImg.src = GOUSTY_WALKING_LEFT;
      }
    } 

    if(this.basicAttackMode === false && this.jumpable === false ){ // ANIMACIONES AL SALTAR Y CAER
      if(this.characterIsLookingRigth && this.vy < 0){
        this.characterImg.src = GOUSTY_JUMPING_RIGTH
      }
      if(this.characterIsLookingLeft && this.vy < 0){
        this.characterImg.src = GOUSTY_JUMPING_LEFT
      }

      if(this.characterIsLookingRigth && this.vy > 0){
        this.characterImg.src = GOUSTY_FALLING_RIGTH
      }
      if(this.characterIsLookingLeft && this.vy > 0){
        this.characterImg.src = GOUSTY_FALLING_LEFT
      }
    }

    if(this.hitable === false){ // ANIMACIONES AL SER GOLPEADO
      if(this.characterIsLookingRigth){
        this.characterImg.src = GOUSTY_CRYING_RIGTH
      }
      if(this.characterIsLookingLeft){
        this.characterImg.src = GOUSTY_CRYING_LEFT
      }
    }

    if(this.basicAttackMode === true){//animacion de personaje con la espada
      if(this.characterIsLookingRigth && this.jumpable === false ) {
        this.characterImg.src = GOUSTY_SWORD_ON_AIR_RIGTH
      }
      if(this.characterIsLookingLeft && this.jumpable === false) {
        this.characterImg.src = GOUSTY_SWORD_ON_AIR_LEFT
      }
      if(this.characterIsLookingRigth && this.jumpable === true ) {
        this.characterImg.src = GOUSTY_SWORD_ON_EARTH_LOOKING_RIGTH
      }
      if(this.characterIsLookingLeft && this.jumpable === true) {
        this.characterImg.src = GOUSTY_SWORD_ON_EARTH_LOOKING_LEFT
      }
    }



    this.ctx.drawImage(
      this.characterImg,
      (this.characterImg.width * this.characterImg.frameIndex) /
        this.characterImg.frames,
      0,
      this.characterImg.width / this.characterImg.frames,
      this.characterImg.height,
      this.x,
      this.y,
      this.w,
      this.h
    );



    ///activar que aparezcan las shadow ball
    this.shadowballs.forEach((shadowball) => {
      shadowball.draw();
    });

    ///activar que aparezca SOLO una espada
    if(this.sword.length <= 1){
      this.sword.forEach((sword) => {
        sword.draw();
      });
    }

    ///activar que aparezca la vida
    this.life.draw()
    ///activar que aparezca el mana
    this.MpContainer.draw()

    //friccion
    //ahora para frenar ponemos un coeficiente de friccion que frenara poco a poco el personaje
    //console.log(this.f)
    if(this.vy === 0){
      if(this.f) {
        this.vx *= 0.85;
      }
    }
  }

  move() {
    if(!this.jumpable){
      this.vy += this.gravity;
    }
    
    this.tick++;


    if (this.tick && this.basicAttackMode === false) { // Animacion de player en estado normal
      if (this.tick  % 12 === 0 ) { //controlamos la velocidad de la animación sin ataques
      this.characterImg.frameIndex++;
        if (this.characterImg.frameIndex >= this.characterImg.frames) {
          this.characterImg.frameIndex = 0;
        }
      }
    }
    if(this.tick % 12 === 0 && this.basicAttackMode === true) {  // Animacion de player en estado de ataque con espada 
      this.characterImg.frameIndex++; 
      if (this.characterImg.frameIndex >= this.characterImg.frames) {
        this.characterImg.frameIndex = 0;
      }
    } 

    if (this.tick && this.basicAttackMode === false && this.hitable === false) { // Animacion de player golpeado
      if (this.tick  % 12 === 0 ) { //controlamos la velocidad de la animación sin ataques
      this.characterImg.frameIndex++;
        if (this.characterImg.frameIndex >= this.characterImg.frames) {
          this.characterImg.frameIndex = 0;
        }
      }
    }

    //friccion
    //ahora para frenar ponemos un coeficiente de friccion que frenara poco a poco el personaje
    //console.log(this.f)

    if(this.f) {
      this.vx *= 0.85;
    }
    
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + this.w > this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.w;
      this.vx = 0;
    }

    if (this.x < 0) {
      this.x = 0;
      this.vx = 0;
    }


    ///activar la animacion de cada shadowball
    this.shadowballs.forEach((shadowball) => {
      shadowball.move();
    });

    ///activar la animacion de la espada
    this.sword.forEach((sword) => {
      sword.move();
    });



    //Guardar constantemente la poisión anterior para regresar al personaje
    this.previousPositionX = this.x;
    // TODO: move player. v + a, position + v
    // TODO: check if floor to stop falling
    // TODO: animate based on tick
    // TODO: move score

    this.life.move()
    this.MpContainer.move()
  }


  shoot(playerIsLookingRigth, PlayerIsLookingLeft) {
    if (playerIsLookingRigth) {
      const shadowball = new Shadowball(
        this.ctx,
        // this.x + this.w - 10,
        // this.y + this.h - 60,
        this.x + this.w - 50,
        this.y + this.h - 40,
        playerIsLookingRigth,
        PlayerIsLookingLeft
      );

      this.shadowballs.push(shadowball);
    }

    if (PlayerIsLookingLeft) {
      const shadowball = new Shadowball(
        this.ctx,
        // this.x + this.w - 10,
        // this.y + this.h - 60,
        this.x + this.w - 110,
        this.y + this.h - 40,
        playerIsLookingRigth,
        PlayerIsLookingLeft
      );

      this.shadowballs.push(shadowball);
    }

  }


  slash(playerIsLookingRigth, PlayerIsLookingLeft) {
    this.changeSwordSprite++ 

    if (playerIsLookingRigth) {
      const sword = new Sword(
        this.ctx,
        this.x + 24.3199,
        this.y + this.h - 137.8201,
        playerIsLookingRigth,
        PlayerIsLookingLeft,
        this.changeSwordSprite,
        this.jumpable
      );

      this.sword.push(sword);
    }

    if (PlayerIsLookingLeft) {
      const sword = new Sword(
        this.ctx,
        // this.x + this.w - 10,
        // this.y + this.h - 60,
        this.x - 105.9133,
        this.y + this.h - 137.8201,
        playerIsLookingRigth,
        PlayerIsLookingLeft,
        this.changeSwordSprite,
        this.jumpable,
      );

      this.sword.push(sword);
    }
    
    if(this.changeSwordSprite >= 2 ){
      this.changeSwordSprite = 0
    }
  }



  isAlive() {
    if(this.playerLife[this.lastHeart].heartPoints === 0){
      return false
    }else {
      return true
    }
  }

  keyDown(key) {
    if (key.toUpperCase() === KEY_V && this.MpContainer.isAvailable()) {
        let previousImgLookingSide = this.characterImg.src;
        if (this.characterIsLookingRigth) {
          this.characterImg.src = GOUSTY_LOADING_RIGTH;
  
          this.audioShadowball.play();
        }
        if (this.characterIsLookingLeft) {
          this.characterImg.src = GOUSTY_LOADING_LEFT;
          this.audioShadowball.play();
        }
        if (this.characterIsLookingRigth) {
          this.characterIsLookingLeft = false;
          this.shoot(this.characterIsLookingRigth, this.characterIsLookingLeft);
          this.tock = 15;
          this.characterImg.src = previousImgLookingSide;
  
          this.audioShadowball.currentTime = 2;
        }
  
        if (this.characterIsLookingLeft) {
          this.characterIsLookingRigth = false;
          this.shoot(this.characterIsLookingRigth, this.characterIsLookingLeft);
          this.characterImg.src = previousImgLookingSide;
          this.audioShadowball.currentTime = 2;
  
          if (this.vx > 0) {
            this.audioShadowball.pause();
          }
        }
    }
    
    if (key.toUpperCase() === KEY_Z) {

      if(this.jumpable){
        // TODO: jump and play jump sound
        this.vy = -14;
        
        const jumpAudio = new Audio(JUMP);
        jumpAudio.volume = 0.01;
        jumpAudio.play();
        this.ykey = true;
        this.jumpable = false
      }
    }

    if (key === KEY_RIGHT || key === KEY_LEFT) { //movimiento horizontal

      this.f = false

      if (key === KEY_RIGHT) {
        if(!this.xkey && this.vx < 0 && this.jumpable){
          setTimeout(() => { //cambiando de direccion
            this.vx = 7;  //Velocidad 
          }, 50)
        }else{
          this.vx = 7;  //Velocidad 
        }
        
        this.characterImg.src = GOUSTY_WALKING_RIGTH;
        this.characterIsLookingRigth = true;
        this.characterIsLookingLeft = false
        this.xkey = true;
      }

      if (key === KEY_LEFT) {
        if(this.xkey && this.vx > 0 && this.jumpable){
          setTimeout(() => { //cambiando de direccion
            this.vx = -7;  //Velocidad 
          }, 50)
        }else{
          this.vx = -7;  //Velocidad 
        }
        this.characterImg.src = GOUSTY_WALKING_LEFT;
        this.characterIsLookingLeft = true;
        this.characterIsLookingRigth = false;
        this.xkey = false;
      }
    }
    if(key.toUpperCase() === KEY_C){
      if (!this.dash) {
        this.dash = true;

        if(this.characterIsLookingRigth){
          this.vx = 50
        }else{
          this.vx = -50
        }
        this.hitable = false
        setTimeout(() => { //frenado con friccion
          if(this.characterIsLookingRigth){
            this.vx = 7
          }else{
            this.vx = -7
          }
          this.hitable = true
  
        }, 100)
        setTimeout(() => { //frenado con friccion
          this.dash = false
        }, 300)
      }

    }

    if(key.toUpperCase() === KEY_X && this.playerCanAttack === true){ /// activar el ataque de la espada al PRESIONAR la tecla 
      this.basicAttackMode = true
      this.playerCanAttack = false
      this.slash(this.characterIsLookingRigth, this.characterIsLookingLeft);
      setTimeout(() => [
        this.playerCanAttack = true, //el jugador puede atacar
        this.basicAttackMode = false, //el jugador esta atando
        this.sword.pop(), //eliminamos la espada creada para que siempre sea una sola y se puede dibujar
      ], 200)      
    }
  }

  keyUp(key) {
    if (key === KEY_RIGHT || key === KEY_LEFT) {
      this.previousPositionX = this.x;
      setTimeout(() => { //frenado con friccion
        if((this.xkey && key === KEY_RIGHT) || (!(this.xkey) && key === KEY_LEFT)){
          this.f = true;
        }
      }, 40)
    }
    
    if (key.toUpperCase() === KEY_Z) {
      if (this.ykey && this.vy <= 0) {
        this.vy *= .40;
        this.ykey = false
      }
    }

    if (key.toUpperCase() === KEY_V ) {
      this.tock = 0;
      this.audioShadowball.pause();
      this.audioShadowball.currentTime = 0;
    }

  }

  collides(object, player) {
      const colX = 
        this.x <= object.x + object.w - 20 &&  //derecha del player
        this.x + this.w - 20 >= object.x;  //el mounstro esta a la izquierda
      const colY = 
        this.y + this.h >= object.y + 20 && //arriba del player
        this.y <= object.y + object.h -20; //abajo del player
        
        let hit = false
        //golpe con proyectiles
        if(object.leafs !== undefined)
          object.leafs.forEach((leaf) => {
            hit = leaf.collides(player, hit)
          });
        if(object.arrswordS !== undefined)
          object.arrswordS.forEach((sword) => {
            hit = sword.collides(player, hit)
          });
          if(object.fires !== undefined)
          object.fires.forEach((fire) => {
            hit = fire.collides(player, hit)
          });

        if(colX && colY || hit){//condicional del mounstrue        
          if (this.hitable) {
        
            if( this.x > object.x){
              this.vx += 17
            }
            if(this.x < object.x){
              this.vx -= 17
            }
  
            this.hitable = false
            this.life.loselife(object.strength)
            setTimeout(() => [
              this.hitable = true,
            ], 1500)
          }  
      }

       //monster
      if (object.hitable) {  
        let strike = false
        this.sword.forEach((slash) => {
          strike = slash.collides(object, strike)
        });
        if(strike){
          this.MpContainer.winMp(1)
        }
        this.shadowballs.forEach((shadowball) => {
          strike = shadowball.collides(object, strike)
        });

        if (strike) {
          if (this.x > object.x) {
            object.vx = -2
            object.x += this.vx
            object.characterIsLookingRigth = true
            object.characterIsLookingLeft = false
            object.hitable = false
          }
          if (this.x < object.x) {
            object.vx = 2
            object.x += object.vx
            object.characterIsLookingRigth = false
            object.characterIsLookingLeft = true
            object.hitable = false
          }
          
          object.heartsM.loselife(1)
          object.hitable = false
          setTimeout(() => [
            object.hitable = true,
          ], 1000)
        }
      return colX && colY
    }
      
  }

}
