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
    this.shadowballsCD = false
    this.isOnAir= false

    //CORAZONES
    this.heart1 = new Heart(ctx, 50, 50,)
    this.heart2 = new Heart(ctx, 100, 50,)
    this.heart3 = new Heart(ctx, 150, 50, )

    this.heartPoints = 2
    this.playerMaxHearts = 3
    this.playerLife = [this.heart1, this.heart2, this.heart3]
    this.playerLife.reverse()
    //HASTA AQUI

    this.previousPositionX = this.x;

    this.gravity = GRAVITY;

    this.characterImg = new Image();
    this.characterImg.frameIndex = 0;
    this.characterImg.src = "/img/GOUSTY/MOVE&STAY/Gousty_Sprite.png";
    this.framesCharacter = 6;
    this.characterImg.frames = 6;

    // hacer saber al juego a donde mira el personaje principal
    this.characterIsLookingRigth = true;
    this.characterIsLookingLeft = false;

    //Shadowballs
    this.shadowballs = [];
    this.audioShadowball = new Audio(
      "/audio/Dark energy blast sound effect.mp3"
    );
    this.audioShadowball.volume = 0.05;
    this.audioShadowball.loop = true;
    this.audioShadowball.currentTime = 1;
    this.hitted = false

    
    //Sword
    this.sword = [];

  }

  draw() {


    if(this.basicAttackMode === false && this.jumpable === true ){ // ANIMACIONES EN EL SUELO
      if(this.characterIsLookingRigth){
        this.characterImg.src = "/img/GOUSTY/MOVE&STAY/Gousty_Sprite.png";
      }
      if(this.characterIsLookingLeft){
        this.characterImg.src = "/img/GOUSTY/MOVE&STAY/Gousty_Sprite_Left.png";
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
    } 

    console.log(this.vy)
    if(this.basicAttackMode === false && this.jumpable === false ){ // ANIMACIONES AL SALTAR Y CAER
      if(this.characterIsLookingRigth && this.vy < 0){
        this.characterImg.src ='/img/GOUSTY/OnAir/GOUSTY_JUMPING_RIGTH.png'
      }
      if(this.characterIsLookingLeft && this.vy < 0){
        this.characterImg.src ='/img/GOUSTY/OnAir/GOUSTY_JUMPING_LEFT.png'
      }

      if(this.characterIsLookingRigth && this.vy > 0){
        this.characterImg.src ='/img/GOUSTY/OnAir/GOUSTY_FALLING_RIGTH.png'
      }
      if(this.characterIsLookingLeft && this.vy > 0){
        this.characterImg.src ='/img/GOUSTY/OnAir/GOUSTY_FALLING_LEFT.png'
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
    }

    if(this.basicAttackMode === false && this.hitable === false){ // ANIMACIONES AL SER GOLPEADO
      if(this.characterIsLookingRigth){
        this.characterImg.src ='/img/GOUSTY/NoHitable/GOUSTY_NO_HITABLE_LOOKING_RIGTH.png'
      }
      if(this.characterIsLookingLeft){
        this.characterImg.src ='/img/GOUSTY/NoHitable/GOUSTY_NO_HITABLE_LOOKING_LEFT.png'
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
    }


    if(this.basicAttackMode === true){
      if(this.characterIsLookingRigth && this.jumpable === false ) {
        this.characterImg.src ='/img/GOUSTY/SWORD/GoustyOnAir/GOUSTY_SWORD_ON_AIR_RIGTH.png'
      }
      if(this.characterIsLookingLeft && this.jumpable === false) {
        this.characterImg.src ='/img/GOUSTY/SWORD/GoustyOnAir/GOUSTY_SWORD_ON_AIR_LEFT.png'
      }
      if(this.characterIsLookingRigth && this.jumpable === true ) {
        this.characterImg.src ='/img/GOUSTY/SWORD/GoustyOnAir/GOUSTY-SWORD-ON_EARTH_LOOKING-RIGTH.png'
      }
      if(this.characterIsLookingLeft && this.jumpable === true) {
        this.characterImg.src ='/img/GOUSTY/SWORD/GoustyOnAir/GOUSTY-SWORD-ON_EARTH_LOOKING-LEFT.png'
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
      }




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
    this.playerLife.forEach((heart) => heart.draw());

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
      if (this.tick  % 6 === 0 ) { //controlamos la velocidad de la animación sin ataques
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

    this.playerLife.forEach((heart) => heart.move());

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
    let lastHeart = this.playerLife.length - 1
    if(this.playerLife[lastHeart].heartPoints === 0){
      return false
    }else {
      return true
    }
  }

  keyDown(key) {
    if (key === KEY_SPACE) {
      if (this.shadowballsCD) {
        let previousImgLookingSide = this.characterImg.src;
        if (this.characterIsLookingRigth) {
          this.characterImg.src =
            "/img/GOUSTY/ShadowBall/Gousty Loading - Loading Shadow Ball (2).png";
  
          this.audioShadowball.play();
        }
        if (this.characterIsLookingLeft) {
          this.characterImg.src =
            "/img/GOUSTY/ShadowBall/Gousty_Loading_Loading_Shadow Ball_LEFT.png";
  
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
        this.shadowballsCD = false;
      }

    }
    
    if (key === KEY_UP) {


      if(this.jumpable){
        // TODO: jump and play jump sound
        this.vy = -14;
        const jumpAudio = new Audio(
          "/audio/Jump sound effect _ No copyright (192kbit_AAC).mp3"
        );
        jumpAudio.volume = 0.01;
        jumpAudio.play();
        this.ykey = true;
        this.shadowballsCD = true
      }
    }
    if(key === KEY_DOWN && this.isOnAir === true){

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
        
        this.characterImg.src = "/img/GOUSTY/MOVE&STAY/Gousty_Sprite.png";
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
        this.characterImg.src = "/img/GOUSTY/MOVE&STAY/Gousty_Sprite_Left.png";
        this.characterIsLookingLeft = true;
        this.characterIsLookingRigth = false;
        this.xkey = false;
      }
    }


    if(key === KEY_CTRL && this.playerCanAttack === true){ /// activar el ataque de la espada al PRESIONAR la tecla 
      this.basicAttackMode = true
      this.playerCanAttack = false
      this.hitable = false

        if(this.basicAttackMode === true && this.characterIsLookingRigth ){
            this.slash(this.characterIsLookingRigth, this.characterIsLookingLeft);
            setTimeout(() => [
              this.playerCanAttack = true, //el jugador puede atacar
              this.basicAttackMode = false, //el jugador esta atando
              this.hitable = true, // puede ser golpeado
              this.characterImg.src = "/img/GOUSTY/MOVE&STAY/Gousty_Sprite.png",
              this.sword.pop(), //eliminamos la espada creada para que siempre sea una sola y se puede dibujar
            ], 200)
        }
        if(this.basicAttackMode === true && this.characterIsLookingLeft){
          this.characterImg.src = "/img/GOUSTY/MOVE&STAY/Gousty_Sprite_Left.png"
          this.slash(this.characterIsLookingRigth, this.characterIsLookingLeft);
          setTimeout(() => [
            this.playerCanAttack = true, //el jugador puede atacar
            this.basicAttackMode = false, //el jugador esta atando
            this.hitable = true, // puede ser golpeado
            this.characterImg.src = "/img/GOUSTY/MOVE&STAY/Gousty_Sprite_Left.png",
            this.sword.pop(), //eliminamos la espada creada para que siempre sea una sola y se puede dibujar
          ], 200) 
        }
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
    
    if (key === KEY_UP) {
      if (this.ykey && this.vy <= 0) {
        this.vy *= .40;
        this.ykey = false
      }
    }

    if (key === KEY_SPACE && this.characterIsLookingRigth) {
      this.tock = 0;
      this.characterImg.src = "/img/GOUSTY/MOVE&STAY/Gousty_Sprite.png";
      this.audioShadowball.pause();
      this.audioShadowball.currentTime = 0;
    }

    if (key === KEY_SPACE && this.characterIsLookingLeft) {
      this.tock = 0;
      this.characterImg.src = "/img/GOUSTY/MOVE&STAY/Gousty_Sprite_Left.png";
      this.audioShadowball.pause();
      this.audioShadowball.currentTime = 0;
    }
  }

  collides(object,type, platforms = false) {

    if (type === "monster") {
      const colX = 
        this.x <= object.x + object.w - 20 &&  //derecha del player
        this.x + this.w - 20 >= object.x;  //el mounstro esta a la izquierda
      const colY = 
        this.y + this.h >= object.y + 20 && //arriba del player
        this.y <= object.y + object.h -20; //abajo del player
      if(colX && colY && this.hitable){
          if( this.x > object.x){
            this.vx += 20
          }
          if(this.x < object.x){
            this.vx -= 20
          }

          this.hitable = false

          setTimeout(() => [
            this.hitable = true,
            this.playerCanAttack = true,
          ], 1000)
          
          return colX && colY
      }
    }
    if (type === "platform") {
        const colX = 
          this.x < object.x + object.w  &&  //derecha del player
          this.x + this.w  > object.x;  //el mounstro esta a la izquierda
        const colY = 
          this.y + this.h >= object.y - 20 &&
          this.y + this.h < object.y + 10; //abajo del player
        const colYBot = 
          this.y + this.h >= object.y - 10 &&
          this.y + this.h < object.y + this.h; //abajo del player
        
        const colRX = 
          this.x < object.x + object.w -10 &&  //derecha del player
          this.x > object.x + object.w -20  //el mounstro esta a la izquierda
        const colLX = 
          this.x + this.w  < object.x + 20 &&
          this.x + this.w  > object.x +10;
        const colH = 
          this.y + this.h >= object.y  && //arriba del player
          this.y <= object.y + object.h ; //abajo del playerx
        //izquierda de la plataforma
        if(colLX && colH){
          this.x = object.x - this.w +10
        }
        if(colYBot && colX){
          this.vy = 0
          this.vy += 2
        }
        if(colY && colX){
          this.y = object.y - 20 - this.h
          this.jumpable = true   
          }else if(!platforms){
            this.jumpable = false
          }
          if(colRX && colH){
            this.x =  object.x + object.w -10
          }
        if (this.jumpable) {
          return true
        }
      }
      
  }

  isAlive() {
    let lastHeart = this.playerLife.length - 1
    if(this.playerLife[lastHeart].heartPoints === 0){
      this.vx = 0
      this.vy = 0
      return false
    }else {
      return true
    }
  }
}
