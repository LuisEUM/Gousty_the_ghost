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
    this.teck = 0;
    this.f = false
    this.moving = true
    this.xkey = true
    this.attackMode = false
    this.attackModeCooldowm = 0
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
  }

  draw() {
    console.log(this.attackMode)
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
    if(this.vy === 0){
      if(this.f) {
        this.vx *= 0.85;
      }
    }

    this.playerLife.forEach((heart) => heart.draw());
  }

  move() {
    this.vy += this.gravity;

    this.x += this.vx;
    this.y += this.vy;

    if (this.y >= ctx.canvas.height - EARTH - this.h) {
      this.y = ctx.canvas.height - EARTH - this.h;
      this.vy = 0;
    }

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

    if (key === KEY_CTRL && this.vx === 0) {
      this.characterImg.frameIndex = 0;
      this.tack++;
      this.teck++;
      
      //console.log(this.teck); PEDRO

      if (this.tack >= 1) {

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
      this.teck++;
      this.attackMode = true
      this.attackModeCooldowm++
      

      if (this.attackModeCooldowm >= 5) {
        this.attackMode = false
        this.attackModeCooldowm = 0
      }

      if (this.teck === 5) {
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

    if (key === KEY_CTRL && this.characterIsLookingRigth) {
      this.characterImg.src = "/img/Gousty_Sprite.png";
      this.vx = 0;
      this.characterImg.frames = 6;
      this.x = this.previousPositionX;
      this.tack = 0;
      this.teck = 0;
      this.attackMode = false

    }

    if (key === KEY_CTRL && this.characterIsLookingLeft) {
      this.characterImg.src = "/img/Gousty_Sprite_Left.png";
      this.vx = 0;
      this.characterImg.frames = 6;
      this.x = this.previousPositionX;
      this.tack = 0;
      this.teck = 0;
      this.attackMode = false

    }
  }

  collides(monster) {
    const colX = 
      this.x <= monster.x + monster.w - 20 &&  //derecha del player
      this.x + this.w - 20 >= monster.x;  //el mounstro esta a la izquierda
    const colY = 
      this.y + this.h >= monster.y + 20 && //arriba del player
      this.y <= monster.y + monster.h -20; //abajo del player

    if(colX && colY && this.hitable){
        if( this.x > monster.x){
          this.vx += 20
        }
        if(this.x < monster.x){
          this.vx -= 20
        }
        this.f = true;
        this.hitable = false

        setTimeout(() => [
          this.hitable = true
        ], 1000)

        return colX && colY

    }
  }

  addHearts(){
    //TODO CUANDO EL PERSONAJE TOQUE UN CORAZON DENTRO DEL MAPA SE LE AGREGARA UNA VIDA 
  }
}
