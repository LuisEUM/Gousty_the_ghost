class Platform{
    constructor(ctx,x,y,w,h, src = BACKGROUND_FOREST_WITH_STARS) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    
        this.animateBackground = true;
        this.tick = 0;
        this.platformImg = new Image();
        this.platformImg.frames = 1;
        this.platformImg.frameIndex = 0;
        this.platformImg.src = src; 
      }

      draw() {

        this.ctx.drawImage(
          this.platformImg,
          (this.platformImg.width * this.platformImg.frameIndex) / this.platformImg.frames , 
          0, 
          this.platformImg.width / 1, 
          this.platformImg.height,
          this.x,
          this.y,
          this.w,
          this.h
        )
      }
}