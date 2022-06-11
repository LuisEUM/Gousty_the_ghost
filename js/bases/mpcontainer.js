class MpContainer {
    constructor(ctx){
        this.mpContainers = []
        this.ctx = ctx
        this.maxhp
        this.xmonsterpixel =10;
    }

    createlife(hpmax){
        this.maxhp = hpmax;
        if(hpmax > 0) {
            for (let index = 0; index < hpmax; index++) {
                this.lifeup(index)
            }
        }
    }

    lifeup(position){
        const mpContainers = new Mp(this.ctx, 45 * position);
        this.mpContainers.push(mpContainers)
    }

    healup(number){
        try {
            let arrmpContainers = this.mpContainers.filter(heart => heart.heartPoints < 3);
            while(arrmpContainers && number){ 
                arrmpContainers[0].heartPoints += 1;
                number -= 1
                arrmpContainers = this.mpContainers.filter(heart => heart.heartPoints < 3);
            } 
        } catch (error) {
            console.log("vida maxima")
        }

    }

    loselife(number){
        try {
            let arrmpContainers = this.mpContainers.filter(heart => heart.heartPoints > 0).reverse();
            while(arrmpContainers && number){   
                arrmpContainers[0].heartPoints -= 1;
                number -= 1
                arrmpContainers = this.mpContainers.filter(heart => heart.heartPoints > 0).reverse();
            } 
        } catch (error) {
            console.log("muerto")
        }
    }

    isAvailable(){
        
        if(this.mpContainers.filter(heart => heart.heartPoints === 3).length){
            this.loselife(3)
            return true
        }else{
            return false
        }
    }

    draw(x = undefined,y = undefined, w = undefined, h = undefined){
        this.mpContainers.forEach(heart => {
            heart.draw(x,y,w,h)
        });
    }
    
    move(){
        this.mpContainers.forEach(heart => {
            heart.move()
        });
    }
}