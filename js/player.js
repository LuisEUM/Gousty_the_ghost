class Player {
  constructor(ctx) {
    // TODO: init player attributes: position, size, v, a, img, audio, score, tick
    this.ctx = ctx

    this.w = 100
    this.h = 100
    this.x = 50
    this.y = ctx.canvas.height - EARTH - this.h

    this.vx = 0;
    this.vy = 0;

    this.tick = 0;
    this.tock = 0;

    this.gravity = GRAVITY;

    this.characterImg = new Image();
    this.characterImg.frames = 6;
    this.characterImg.frameIndex = 0;
    this.characterImg.src = '/img/Gousty_Sprite.png'
    this.shadowballs = []

    // hacer saber al juego a donde mira el personaje principal
    this.characterIsLookingRigth = true;
    this.characterIsLookingLeft = false;
  }

  draw() {
    this.ctx.drawImage(
      this.characterImg,
      (this.characterImg.width * this.characterImg.frameIndex) / this.characterImg.frames , 
      0, 
      this.characterImg.width / 6, 
      this.characterImg.height,
      this.x,
      this.y,
      this.w,
      this.h
    )

    this.shadowballs.forEach(shadowball => {
      shadowball.draw()
    })
  }

  move() {
    this.vy += this.gravity

    this.x += this.vx
    this.y += this.vy

    if (this.y >= ctx.canvas.height - EARTH - this.h) {
      this.y = ctx.canvas.height - EARTH - this.h
      this.vy = 0;
    }

    this.tick++

    if (this.tick >= 10){
      this.tick = 0
      this.animate();
    }

    if (this.x + this.w > this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.w
      this.vx = 0;
    }

    if (this.x < 0) {
      this.x = 0
      this.vx = 0;
    }

    this.shadowballs.forEach(shadowball => {
      shadowball.move()
    })

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

if(playerIsLookingRigth) {
  const shadowball = new Shadowball(
    this.ctx,
    // this.x + this.w - 10,
    // this.y + this.h - 60,
    this.x + this.w - 50,
    this.y + this.h - 40,
    playerIsLookingRigth,
    PlayerIsLookingLeft
  )
  
  this.shadowballs.push(shadowball)
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
  )
  
  this.shadowballs.push(shadowball)
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
      this.tock++
      let previousImgLookingSide = this.characterImg.src
      if (this.characterIsLookingRigth){
        this.characterImg.src = '/img/Gousty Loading - Loading Shadow Ball (2).png'
        console.log(this.tock)
      }
      if (this.characterIsLookingLeft){
        this.characterImg.src = '/img/Gousty_Loading_Loading_Shadow Ball_LEFT.png'
        console.log(this.tock)
      }

      if (this.tock >= 30 && this.characterIsLookingRigth){
        this.characterIsLookingLeft = false
        this.shoot(this.characterIsLookingRigth, this.characterIsLookingLeft);
        this.tock = 15; 
        this.characterImg.src = previousImgLookingSide 
    }

    if (this.tock >= 30 && this.characterIsLookingLeft){
      this.characterIsLookingRigth = false
      this.shoot(this.characterIsLookingRigth, this.characterIsLookingLeft);
      this.tock = 15; 
      this.characterImg.src = previousImgLookingSide 
  }
    }


    if (key === KEY_UP && this.vy === 0) {
      // TODO: jump and play jump sound
      this.vy = -10;
      new Audio('/audio/Jump sound effect _ No copyright (192kbit_AAC).mp3').play();
    }

    if (key === KEY_RIGHT) {
      this.vx = 10
      this.characterImg.src = '/img/Gousty_Sprite.png'
      this.characterIsLookingRigth = true;
      this.characterIsLookingLeft = false;
    }

    if (key === KEY_LEFT) {
      this.vx = -10
      this.characterImg.src = '/img/Gousty_Sprite_Left.png'
      this.characterIsLookingLeft = true;
      this.characterIsLookingRigth = false;
    }



  }

  keyUp(key) {
    if (key === KEY_RIGHT || key === KEY_LEFT) {
      this.vx = 0
    }
    if (key === KEY_RIGHT) {
      this.characterImg.src = '/img/Gousty_Sprite.png'
    }
    if (key === KEY_LEFT) {
      this.characterImg.src = '/img/Gousty_Sprite_Left.png'
    }
    if (key === KEY_SPACE && this.characterIsLookingRigth) {
      this.tock = 0
      this.characterImg.src = '/img/Gousty_Sprite.png'
    }
    if (key === KEY_SPACE && this.characterIsLookingLeft) {
      this.tock = 0
      this.characterImg.src = '/img/Gousty_Sprite_Left.png'
    }
  }
}
