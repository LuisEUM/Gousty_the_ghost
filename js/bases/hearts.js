class Hearts {
    constructor(ctx){
        this.hearts = []
        this.ctx = ctx
        this.maxhp
        this.hp
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
        const hearts = new Heart(this.ctx, 45 * position);
        this.hearts.push(hearts)
    }

    healup(number){
        try {
            let arrHearts = this.hearts.filter(heart => heart.heartPoints < 2);
            while(arrHearts && number){ 
                arrHearts[0].heartPoints += 1;
                number -= 1
                arrHearts = this.hearts.filter(heart => heart.heartPoints < 2);
            } 
        } catch (error) {
            console.log("vida maxima")
        }

    }

    loselife(number){
        try {
            let arrHearts = this.hearts.filter(heart => heart.heartPoints > 0).reverse();
            while(arrHearts && number){   
                arrHearts[0].heartPoints -= 1;
                number -= 1
                arrHearts = this.hearts.filter(heart => heart.heartPoints > 0).reverse();
            } 
        } catch (error) {
            console.log("muerto")
        }
    }

    isAlive(){
        
        if(this.hearts.filter(heart => heart.heartPoints > 0).length){
            return true
        }else{
            return false
        }
    }

    draw(x = undefined,y = undefined, w = undefined, h = undefined){
        this.hearts.forEach(heart => {
            heart.draw(x,y,w,h)
        });
    }
    
    move(){
        this.hearts.forEach(heart => {
            heart.move()
        });
    }
}