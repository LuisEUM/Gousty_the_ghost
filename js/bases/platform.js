class Platform{
    constructor(ctx,x = 10,y = 330,w = 300,h = 40 , src = 'BACKGROUND - FOREST WITH STARS.png') {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    
        this.animateBackground = true;
        this.tick = 0;
        this.platformImg = new Image();
        this.platformImg.frames = 10;
        this.platformImg.frameIndex = 0;
        this.platformImg.src = "/img/BACKGROUND/" + src; 
        console.log()
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