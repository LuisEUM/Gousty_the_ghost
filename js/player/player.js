class Player {
  constructor(ctx) {
    // TODO: init player attributes: position, size, v, a, img, audio, score, tick
    this.ctx = ctx;
    this.w = 100;
    this.h = 100;
    this.x = 50;
    this.y = ctx.canvas.height - EARTH - this.h;
    this.hitable = true
    this.vx = 0;
    this.vy = 0;
    this.tick = 0;
    this.tock = 0;
    this.tack = 0;
    this.f = false
    this.moving = true
    this.xkey = true
    this.changeSwordSprite = 0 
    this.playerCanAttack = true 
    this.basicAttackMode = false
    this.attackModeCooldowm = 0
    this.resetAnimationBasicAttack = 0;

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
    this.characterImg.src = "/img/Gousty_Sprite.png";
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
    if(this.basicAttackMode === false){
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

    if(this.basicAttackMode === false && this.hitable === false && this.characterIsLookingRigth === true){
      this.characterImg.src ='/img/GOUSTY/GOUSTY_NO_HITABLE_LOOKING_RIGTH.png'
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
    if(this.basicAttackMode === false && this.hitable === false && this.characterIsLookingLeft === true){
      this.characterImg.src ='/img/GOUSTY/GOUSTY_NO_HITABLE_LOOKING_LEFT.png'
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

    if(this.basicAttackMode === true && this.characterIsLookingRigth === true){
      this.characterImg.src ='/img/GOUSTY/GOUSTY-SWORD-ATTACK-RIGTH.png'
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

      if(this.basicAttackMode === true && this.characterIsLookingLeft === true){
        this.characterImg.src ='/img/GOUSTY/GOUSTY-SWORD-ATTACK-LEFT.png'
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
    this.tick++;

    if (this.tick && this.basicAttackMode === false) { // Animacion de player en estado normal
      if (this.tick  % 12 === 0 ) { //controlamos la velocidad de la animación sin ataques
      this.characterImg.frameIndex++;
        if (this.characterImg.frameIndex >= this.characterImg.frames) {
          this.characterImg.frameIndex = 0;
        }
      }
    }

    if(this.tick % 6 === 0 && this.basicAttackMode === true) {  // Animacion de player en estado de ataque con espada 
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

    this.vy += this.gravity;

    this.x += this.vx;
    this.y += this.vy;

    if (this.y >= ctx.canvas.height - EARTH - this.h) {
      this.y = ctx.canvas.height - EARTH - this.h;
      this.vy = 0;
    }



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
    console.log(this.changeSwordSprite)


    if (playerIsLookingRigth) {
      const sword = new Sword(
        this.ctx,
        this.x + 24.3199,
        this.y + this.h - 137.8201,
        playerIsLookingRigth,
        PlayerIsLookingLeft,
        this.changeSwordSprite
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
        this.changeSwordSprite
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
      this.tock++;
      let previousImgLookingSide = this.characterImg.src;
      if (this.characterIsLookingRigth) {
        this.characterImg.src =
          "/img/Gousty Loading - Loading Shadow Ball (2).png";

        this.audioShadowball.play();
      }
      if (this.characterIsLookingLeft) {
        this.characterImg.src =
          "/img/Gousty_Loading_Loading_Shadow Ball_LEFT.png";

        this.audioShadowball.play();
      }
      if (this.tock >= 30 && this.characterIsLookingRigth) {
        this.characterIsLookingLeft = false;
        this.shoot(this.characterIsLookingRigth, this.characterIsLookingLeft);
        this.tock = 15;
        this.characterImg.src = previousImgLookingSide;

        this.audioShadowball.currentTime = 2;
      }

      if (this.tock >= 28 && this.characterIsLookingLeft) {
        this.characterIsLookingRigth = false;
        this.shoot(this.characterIsLookingRigth, this.characterIsLookingLeft);
        this.tock = 14;
        this.characterImg.src = previousImgLookingSide;

        this.audioShadowball.currentTime = 2;

        if (this.vx > 0) {
          this.audioShadowball.pause();
        }
      }
    }

    if (key === KEY_UP && this.vy === 0) {
      // TODO: jump and play jump sound
      this.vy = -10;
      const jumpAudio = new Audio(
        "/audio/Jump sound effect _ No copyright (192kbit_AAC).mp3"
      );
      jumpAudio.volume = 0.01;
      jumpAudio.play();
    }

    if (key === KEY_RIGHT || key === KEY_LEFT) { //movimiento horizontal

      this.f = false
      if (key === KEY_RIGHT) {
        this.vx = 7;  //Velocidad 
        this.characterImg.src = "/img/Gousty_Sprite.png";
        this.characterIsLookingRigth = true;
        this.characterIsLookingLeft = false
        this.xkey = true;
      }

      if (key === KEY_LEFT) {
        this.vx = -7;  //Velocidad 
        this.characterImg.src = "/img/Gousty_Sprite_Left.png";
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
              this.characterImg.src = "/img/Gousty_Sprite.png",
              this.sword.pop(), //eliminamos la espada creada para que siempre sea una sola y se puede dibujar
            ], 200)
        }
        if(this.basicAttackMode === true && this.characterIsLookingLeft){
          this.characterImg.src = "/img/Gousty_Sprite_Left.png"
          this.slash(this.characterIsLookingRigth, this.characterIsLookingLeft);
          setTimeout(() => [
            this.playerCanAttack = true, //el jugador puede atacar
            this.basicAttackMode = false, //el jugador esta atando
            this.hitable = true, // puede ser golpeado
            this.characterImg.src = "/img/Gousty_Sprite_Left.png",
            this.sword.pop(), //eliminamos la espada creada para que siempre sea una sola y se puede dibujar
          ], 200) 
        }

    }


    // if (key === KEY_CTRL && this.vx === 0) {
    //   this.characterImg.frameIndex = 0;
    //   this.tack++;
    //   this.teck++;
      
    //   //console.log(this.teck); PEDRO

    //   if (this.tack >= 1) {

    //     if (this.characterIsLookingRigth) {
    //       this.characterImg.src = "/img/Gousty_Head_Attack_RIGTH.png";
    //       this.vx += 0.5;
    //       this.x += 50;
    //       this.previousPositionX = this.x;
    //       //this.audioShadowball.play()
    //     }

    //     if (this.characterIsLookingLeft) {
    //       this.characterImg.src = "/img/Gousty_Head_Attack_LEFT.png";
    //       this.vx -= 0.5;
    //       this.x -= 50;
    //       this.previousPositionX = this.x;
    //       //this.audioShadowball.play()
    //     }

    //     if (this.vx >= 1 || this.vx <= -1) {
    //       this.vx = 0;
    //     }
    //   }
    // }

    // if (key === KEY_CTRL) {
    //   this.teck++;
    //   this.basicAttackMode = true
    //   this.attackModeCooldowm++
      

    //   if (this.attackModeCooldowm >= 5) {
    //     this.basicAttackMode = false
    //     this.attackModeCooldowm = 0
    //   }

    //   if (this.teck === 5) {
    //     this.teck = 0;
    //     if (this.characterIsLookingRigth) {
    //       this.characterImg.src = "/img/Gousty_Head_Attack_RIGTH.png";
    //       this.vx += 1.2;
    //       this.previousPositionX = this.x;
    //     }
    //     if (this.characterIsLookingLeft) {
    //       this.characterImg.src = "/img/Gousty_Head_Attack_LEFT.png";
    //       this.vx -= 1.2;
    //       this.previousPositionX = this.x;
    //     }
    //   }
    // }
  }

  keyUp(key) {
    if (key === KEY_RIGHT || key === KEY_LEFT) {
      this.previousPositionX = this.x;
      setTimeout(() => { //frenado con friccion
        if((this.xkey && key === KEY_RIGHT) || (!(this.xkey) && key === KEY_LEFT)){
          this.f = true;
        }
      }, 50)
    }

    if (key === KEY_SPACE && this.characterIsLookingRigth) {
      this.tock = 0;
      this.characterImg.src = "/img/Gousty_Sprite.png";
      this.audioShadowball.pause();
      this.audioShadowball.currentTime = 0;
    }

    if (key === KEY_SPACE && this.characterIsLookingLeft) {
      this.tock = 0;
      this.characterImg.src = "/img/Gousty_Sprite_Left.png";
      this.audioShadowball.pause();
      this.audioShadowball.currentTime = 0;
    }


    // if (key === KEY_CTRL && this.characterIsLookingRigth) {
    //   this.characterImg.src = "/img/Gousty_Sprite.png";
    //   this.vx = 0;
    //   this.characterImg.frames = 6;
    //   this.x = this.previousPositionX;
    //   this.tack = 0;
    //   this.teck = 0;
    //   this.basicAttackMode = false
    // }

    // if (key === KEY_CTRL && this.characterIsLookingLeft) {
    //   this.characterImg.src = "/img/Gousty_Sprite_Left.png";
    //   this.vx = 0;
    //   this.characterImg.frames = 6;
    //   this.x = this.previousPositionX;
    //   this.tack = 0;
    //   this.teck = 0;
    //   this.basicAttackMode = false
    // }

  }

  collides(monster) {
    const colX = 
      this.x <= monster.x + monster.w - 20 &&  //derecha del player
      this.x + this.w - 20 >= monster.x;  //el mounstro esta a la izquierda
    const colY = 
      this.y + this.h >= monster.y + 20 && //arriba del player
      this.y <= monster.y + monster.h -20; //abajo del player

    if(colX && colY && this.hitable){
      this.playerCanAttack = false 

        if( this.x > monster.x){
          this.vx += 20
        }
        if(this.x < monster.x){
          this.vx -= 20
        }
        this.f = true;
        this.hitable = false

        setTimeout(() => [
          this.hitable = true,
          this.playerCanAttack = true, 
        ], 1000)

        return colX && colY

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
