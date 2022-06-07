class Platform{
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 10;
        this.y = 350;
        this.w = 300;
        this.h = 40;
    
        this.animateBackground = true;
        this.tick = 0;
        this.platformImg = new Image();
        this.platformImg.frames = 10;
        this.platformImg.frameIndex = 0;
        this.platformImg.src = '/img/BACKGROUND - FOREST WITH STARS.png'; 
      }

      draw() {

        this.ctx.drawImage(
          this.platformImg,
          (this.platformImg.width * this.platformImg.frameIndex) / this.platformImg.frames , 
          0, 
          this.platformImg.width / 10, 
          this.platformImg.height,
          this.x,
          this.y,
          this.w,
          this.h
        )
      }
}