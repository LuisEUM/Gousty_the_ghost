class Transition {
    constructor(ctx){
        this.ctx = ctx
        this.w = 100
        this.h = 100
        this.x = 1000
        this.y = 600
        this.tick = 0;

        this.mpImg = new Image();
        this.mpImg.src = CIRCLE
        this.mpImg.frames = 1;
        this.mpImg.frameIndex = 0;
    }

    draw() {
        this.mpImg.src = CIRCLE
        this.ctx.drawImage(
            this.mpImg,
            (this.mpImg.width * this.mpImg.frameIndex) / this.mpImg.frames , 
            0, 
            this.mpImg.width / 1, 
            this.mpImg.height,
            this.x,
            this.y,
            this.w,
            this.h
        )
    }
    
    move(dark ,transitions) {
        this.tick++
        if(this.tick == 2 && !dark){
            this.x += 100
            this.y += 100
            this.w -= 200
            this.h -= 300
            this.tick = 0
        }else{
            if(this.tick == 2){
                this.x -= 200
                this.y += 200
                if (this.w < 0 ){
                    this.w += 200
                    this.h += 300
                }else{
                    this.w = 0
                    this.h = 0
                }
                this.tick = 0
            }

            setTimeout(() => {
                transitions.pop()         
              }, 2000);
            
        }

    }

    
}