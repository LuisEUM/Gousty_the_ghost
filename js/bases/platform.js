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

      collider(object){
          const colX = 
          object.x < this.x + this.w  &&  //derecha del player
          object.x + object.w  > this.x;  //el mounstro esta a la izquierda
          const colY = 
          object.y + object.h >= this.y - 20 &&
          object.y + object.h < this.y + 10; //abajo del player
          const colYBot = 
          object.y >= this.y - 10 &&
          object.y < this.y + object.h; //abajo del player
          
          const colRX = 
          object.x < this.x + this.w -10 &&  //derecha del player
          object.x > this.x + this.w -20  //el mounstro esta a la izquierda
          const colLX = 
          object.x + object.w  < this.x + 20 &&
          object.x + object.w  > this.x +10;
          const colH = 
          object.y + object.h >= this.y  && //arriba del player
          object.y <= this.y + this.h ; //abajo del playerx
          
          //izquierda de la plataforma
          if(colLX && colH){
            object.x = this.x - object.w +10
          }
          if(colYBot && colX){
            object.vy = 0
            object.vy += 2
          }
          if(colY && colX){
            object.y = this.y - 20 - object.h
            object.jumpable = true   
            }else{
              object.jumpable = false
            }
            if(colRX && colH){
              object.x =  this.x + this.w -10
            }
      }
}