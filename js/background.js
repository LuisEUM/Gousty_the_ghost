class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.w = ctx.canvas.width;
    this.h = ctx.canvas.height;

    this.animateBackground = true;
    this.tick = 0;
    this.backgroundImg = new Image();
    this.backgroundImg.frames = 10;
    this.backgroundImg.frameIndex = 0;
    this.backgroundImg.src = '/img/BACKGROUND - FOREST WITH STARS.png';
    new Audio('/audio/MapleStory Piano - Eternal Swamp Background.mp3').play()

  }

  draw() {

    this.ctx.drawImage(
      this.backgroundImg,
      (this.backgroundImg.width * this.backgroundImg.frameIndex) / this.backgroundImg.frames , 
      0, 
      this.backgroundImg.width / 10, 
      this.backgroundImg.height,
      this.x,
      this.y,
      this.w,
      this.h
    )

    this.tick++

    if (this.animateBackground && this.tick % 30 === 0) {
      this.backgroundImg.frameIndex++;

      if (this.backgroundImg.frameIndex >= this.backgroundImg.frames) {
        this.backgroundImg.frameIndex = 0;
      }
    }
  }

  move() {
    // this.x += this.vx
    // if (this.x + this.w <= 0) {
    //   this.x = 0;
    // }
  }
}
