class Enemy {
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

    // TODO: init enemy. set x,y randomly top or right.
    // TODO: play fireball audio
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
    // TODO: move, add a to v and v to position
  }

  isVisible() {
    // TODO: return if enemy is inside the canvas based on x and y
  }

  collides(p) {
    const colX = false; // TODO: check X collision between this and p
    const colY = false; // TODO: check Y collision between this and p

    return colX && colY;
  }
}
