class Platform{
    constructor(ctx,x = 10,y = 330,w = 300,h = 40, src = undefined, frames = 1) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    
        this.animateBackground = true;
        this.tick = 0;
        this.platformImg = new Image();
        this.platformImg.frames = frames;
        this.platformImg.frameIndex = 0;
        this.platformImg.src = src || PLATFORMS_FOREST_PLATFORM_2; 
      }

      draw() {

        this.ctx.drawImage(
          this.platformImg,
          (this.platformImg.width * this.platformImg.frameIndex) / this.platformImg.frames , 
          0, 
          this.platformImg.width / this.platformImg.frames, 
          this.platformImg.height,
          this.x,
          this.y,
          this.w,
          this.h
        )
      }

      collider(object, platformscheck = false){
          const colX = 
          object.x < this.x + this.w  &&  //derecha del player
          object.x + object.w  > this.x;  //el mounstro esta a la izquierda
          const colY = 
          object.y + object.h >= this.y - 20 &&
          object.y + object.h < this.y + 20; //abajo del player
          
          //izquierda de la plataforma

          if(colY && colX){    
            object.y = this.y - 20 - object.h          
            object.jumpable = true       
            }else if(!platformscheck){
              object.jumpable = false 
            }   if (object.jumpable) {
              return true
            } 
      }
}