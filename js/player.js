class Player {
  constructor(ctx) {
    // TODO: init player attributes: position, size, v, a, img, audio, score, tick
    this.ctx = ctx;

    this.w = 100;
    this.h = 100;
    this.x = 50;
    this.y = ctx.canvas.height - EARTH - this.h;

    this.vx = 0;
    this.vy = 0;

    this.tick = 0;
    this.tock = 0;
    this.tack = 0;
    this.teck = 0;

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

  hit() {
    // TODO: decrement score
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

    if (key === KEY_UP && this.vy === 0) {
      // TODO: jump and play jump sound
      this.vy = -10;
      const jumpAudio = new Audio(
        "/audio/Jump sound effect _ No copyright (192kbit_AAC).mp3"
      );
      jumpAudio.volume = 0.01;
      jumpAudio.play();
    }

    if (key === KEY_RIGHT) {
      this.vx += 3;
      this.characterImg.src = "/img/Gousty_Sprite.png";
      this.characterIsLookingRigth = true;
      this.characterIsLookingLeft = false;
      if (this.vx >= 6) {
        this.vx = 6;
      }
    }

    if (key === KEY_LEFT) {
      this.vx -= 6;
      this.characterImg.src = "/img/Gousty_Sprite_Left.png";
      this.characterIsLookingLeft = true;
      this.characterIsLookingRigth = false;
      if (this.vx <= -6) {
        this.vx = -6;
      }
    }

    if (key === KEY_CTRL && this.vx === 0) {
      this.characterImg.frameIndex = 0;
      this.tack++;
      this.teck++;

      console.log(this.teck);


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
      this.vx = 0;
      this.previousPositionX = this.x;
    }

    if (key === KEY_RIGHT) {
      this.characterImg.src = "/img/Gousty_Sprite.png";
    }

    if (key === KEY_LEFT) {
      this.characterImg.src = "/img/Gousty_Sprite_Left.png";
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
}
