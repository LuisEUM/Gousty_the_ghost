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
    this.platform = false
    this.jumpable = false

    //CORAZONES
    this.heart1 = new Heart(ctx, 50)
    this.heart2 = new Heart(ctx, 100)
    this.heart3 = new Heart(ctx, 150)

    this.heartPoints = 1
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
  }

  draw() {
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
    this.shadowballs.forEach((shadowball) => {
      shadowball.draw();
    });

    //friccion
    //ahora para frenar ponemos un coeficiente de friccion que frenara poco a poco el personaje
    //console.log(this.f)

      if(this.f) {
        this.vx *= 0.85;
      }
    

    this.playerLife.forEach((heart) => heart.draw());
  }

  move() {
    
    if(this.platform &&  this.tuck == 0){
      this.vy = 0
      this.tuck = 1;
    }else if(!this.platform){
      this.vy += this.gravity;
    }
    
    this.x += this.vx;
    this.y += this.vy;

    this.tick++;

    if (this.tick >= 10) {
      this.tick = 0;
      this.animate();
    }

    if (this.x + this.w > this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.w;
      this.vx = 0;
    }

    if (this.x < 0) {
      this.x = 0;
      this.vx = 0;
    }

    this.shadowballs.forEach((shadowball) => {
      shadowball.move();
    });
    this.previousPositionX = this.x;

    // TODO: move player. v + a, position + v
    // TODO: check if floor to stop falling
    // TODO: animate based on tick
    // TODO: move score

    this.playerLife.forEach((heart) => heart.move()); 
  }

  animate() {
    if (this.vy === 0) {
      this.characterImg.frameIndex++;

      if (this.characterImg.frameIndex >= this.characterImg.frames) {
        this.characterImg.frameIndex = 0;
      }
    }
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


  isAlive() {
    // TODO: return true if score is > 0
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
    
    if (key === KEY_UP && this.platform) {
      // TODO: jump and play jump sound
      this.vy = -14;
      this.tuck = 0;
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

    if (key === KEY_CTRL && this.vx === 0) {
      this.characterImg.frameIndex = 0;
      this.tack++;
      this.teck++;

      //console.log(this.teck); PEDRO


      if (this.tack >= 1) {
        console.log("hasta aqui", this.teck);

        if (this.characterIsLookingRigth) {
          this.characterImg.src = "/img/Gousty_Head_Attack_RIGTH.png";
          this.vx += 0.5;
          this.x += 50;
          this.previousPositionX = this.x;
          //this.audioShadowball.play()
        }

        if (this.characterIsLookingLeft) {
          this.characterImg.src = "/img/Gousty_Head_Attack_LEFT.png";
          this.vx -= 0.5;
          this.x -= 50;
          this.previousPositionX = this.x;
          //this.audioShadowball.play()
        }

        if (this.vx >= 1 || this.vx <= -1) {
          this.vx = 0;
        }
      }
    }

    if (key === KEY_CTRL) {
      console.log(this.teck);
      this.teck++;

      if (this.teck === 5) {
        console.log("llego");
        this.teck = 0;
        if (this.characterIsLookingRigth) {
          this.characterImg.src = "/img/Gousty_Head_Attack_RIGTH.png";
          this.vx += 1.2;
          this.previousPositionX = this.x;
        }
        if (this.characterIsLookingLeft) {
          this.characterImg.src = "/img/Gousty_Head_Attack_LEFT.png";
          this.vx -= 1.2;
          this.previousPositionX = this.x;
        }
      }
    }
  }

  keyUp(key) {
    if (key === KEY_RIGHT || key === KEY_LEFT) {

      this.previousPositionX = this.x;

      setTimeout(() => { //frenado con friccion
        if((this.xkey && key === KEY_RIGHT) || (!(this.xkey) && key === KEY_LEFT)){
          console.log("entrando")
          this.f = true;
        }
      }, 10)

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

    if (key === KEY_CTRL && this.characterIsLookingRigth) {
      this.characterImg.src = "/img/Gousty_Sprite.png";
      this.vx = 0;
      this.characterImg.frames = 6;
      this.x = this.previousPositionX;
      this.tack = 0;
      this.teck = 0;
    }

    if (key === KEY_CTRL && this.characterIsLookingLeft) {
      this.characterImg.src = "/img/Gousty_Sprite_Left.png";
      this.vx = 0;
      this.characterImg.frames = 6;
      this.x = this.previousPositionX;
      this.tack = 0;
      this.teck = 0;
    }
  }

  collides(object,type) {

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
          if(this.vx <= -10 || this.vx >= 10){
            setTimeout(()=>{
              this.vx = 0
            },200)
          }

          this.hitable = false

          setTimeout(() => [
            this.hitable = true
          ], 1000)
          
          return colX && colY
      }
    }
    if (type === "platform") {
      const colX = 
        this.x <= object.x + object.w  &&  //derecha del player
        this.x + this.w  >= object.x;  //el mounstro esta a la izquierda
      const colY = 
        this.y + this.h >= object.y - 20 && //arriba del player
        this.y <= object.y + object.h +20; //abajo del player

      if(colY){
          this.platform = true
          if(this.tuck == 1){
            this.tuck = 0
          }
        }else{
          this.platform = false
        }
        if(colX){
          this.vx = 0;
        }
      }
  }

  addHearts(){
    //TODO CUANDO EL PERSONAJE TOQUE UN CORAZON DENTRO DEL MAPA SE LE AGREGARA UNA VIDA 
  }
}
