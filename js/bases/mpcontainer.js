class MpContainer {
    constructor(ctx){
        this.mpContainers = []
        this.ctx = ctx
        this.maxmp
        this.xmonsterpixel =10;
    }

    createlife(mpmax){
        this.maxmp = mpmax;
        if(mpmax > 0) {
            for (let index = 0; index < mpmax; index++) {
                this.MpUp(index)
            }
        }
    }

    MpUp(position){
        const mpContainers = new Mp(this.ctx, 45 * position);
        this.mpContainers.push(mpContainers)
    }

    winMp(number){
        try {
            let arrmpContainers = this.mpContainers.filter(mps => mps.mp < 3);
            while(arrmpContainers && number){ 
                arrmpContainers[0].mp += 1;
                number -= 1
                arrmpContainers = this.mpContainers.filter(mps => mps.mp < 3);
            } 
        } catch (error) {
            console.log("vida maxima")
        }

    }

    loseMp(number){
        try {
            let arrmpContainers = this.mpContainers.filter(mps => mps.mp> 0).reverse();
            while(arrmpContainers && number){   
                arrmpContainers[0].mp -= 1;
                number -= 1
                arrmpContainers = this.mpContainers.filter(mps => mps.mp > 0).reverse();
            } 
        } catch (error) {
            console.log("muerto")
        }
    }

    isAvailable(){
        if(this.mpContainers.filter(mps => mps.mp === 3).length){
            this.loseMp(3)
            return true
        }else{
            return false
        }
    }

    draw(x = undefined,y = undefined, w = undefined, h = undefined){
        this.mpContainers.forEach(mp => {
            mp.draw(x,y,w,h)
        });
    }
    
    move(){
        this.mpContainers.forEach(mp => {
            mp.move()
        });
    }
}