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

    this.gravity = GRAVITY;

    this.characterImg = new Image();
    this.characterImg.frames = 6;
    this.characterImg.frameIndex = 0;
    this.characterImg.src = '/img/Gousty_Sprite.png'
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
    // TODO: draw player image
    // TODO: draw score
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

  hit() {
    // TODO: decrement score
  }

  isAlive() {
    // TODO: return true if score is > 0
  }

  keyDown(key) {
    if (key === KEY_UP && this.vy === 0) {
      // TODO: jump and play jump sound
      this.vy = -10;
      new Audio('./audio/jump.wav').play()
    }

    if (key === KEY_RIGHT) {
      this.vx = 10
    }

    if (key === KEY_LEFT) {
      this.vx = -10
    }
  }

  keyUp(key) {
    if (key === KEY_RIGHT || key === KEY_LEFT) {
      this.vx = 0
    }
  }
}
