// class Sprite {
//     constructor (ctx, x, y, width, height, src, changeSprite){
//         this.ctx = ctx
//         this.x = x,
//         this.y = y,
//         this.w = width
//         this.h = height

//         this.img = new Image();
//         this.img.src = src
//         this.img.frames = 6;
//         this.img.frameIndex = 0;

//         this.changeSprite = changeSprite;
//         this.tick = 0;
//     }

//     draw(){
//         this.ctx.drawImage(
//             this.img,
//             (this.img.width * this.img.frameIndex) / this.img.frames , 
//             0, 
//             this.img.width / this.img.frames, 
//             this.img.height,
//             this.x,
//             this.y,
//             this.w,
//             this.h
//         )
//     }

//     updateDraw(){
//         this.draw()
//     }
// }    