

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.interval = null;
    this.background = null;

    this.player = new Player(ctx);
    this.level = 0
    this.map = [];
    this.items = [];

    this.enemies = [];
    
    this.deleteEnemy = false;
    this.showMonsterLivesCooldown = 0;
    this.tick = 0;
    this.teck = 0
    this.origanlColor = this.ctx.fillStyle = "white";
    this.audio = new Audio("audio/theme.mp3");
    this.gameOverAudio = new Audio("audio/game-over.mp3");
    this.ctx.font = "80px Poppins";
    this.setListeners();
    this.init = true
    this.stages = [
      {                                //0 estas son las olas Wavess
          map: [
            new Platform(this.ctx,50, 300, 200,40),
            new Platform(this.ctx,750, 300, 200,40), 
            new Platform(this.ctx, 0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR)
          ],
          items:[ new Item(this.ctx)],
          enemies:[new DarkSlimes(this.ctx, 940, null, true), new DarkSlimes(this.ctx)],
          background: new Background(this.ctx)
      }
      // nextlevel
    ]
    this.setupLevel()
  }

  start() {
    // TODO: play audio
    // TODO: init game loop: clear, draw, move, check collisions and randomly add enemy based on ticks
    this.interval = setInterval(() => {
      this.draw();
      this.move();

      this.tick++;

      if (this.tick > 100) {
        if (this.enemies.length < 2) {
          ///aqui agregamoos a los mounstruos
          this.tick = 0;
          this.addEnemy();
        }
      }
      if(this.enemies.length === 0 && this.stages.length !== this.level + 1){ // &&  si me quedan mas niveles avanzar al siguiente nivel 
        this.nextLevel()
      }
      /// TODO implentar el ENDGAME
    }, 1000 / FPS);
  }

  stop() {
    this.audio.pause();
    clearInterval(this.interval);
    this.interval = null;
  }

  clear() {
    // this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // this.enemies = this.enemies.filter((e) => e.isVisible());
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.checkCollisions();
    this.items.forEach((item) => item.draw());
    this.map.forEach((platform) => platform.draw());
    this.enemies.forEach((enemy) => enemy.draw());
    this.removeObjects()
  }

  setupLevel(){
    this.map = this.stages[this.level].map
    this.enemies = this.stages[this.level].enemies
    this.items = this.stages[this.level].items
    this.background = this.stages[this.level].background
  }

  nextLevel(){
    this.level++
    this.setupLevel()
  }

  move() {
    this.background.move();
    this.player.move();
    this.enemies.forEach((enemy) => enemy.move());
    this.items.forEach((item) => item.move());
  }


  removeObjects(){ 
    this.enemies.forEach(
      (monster, index) => {
        if(monster.isAlive() === false){
          this.enemies.splice(index,1)
        }
      }
    );
  }



  checkCollisions() {
    this.enemies.forEach((enemy) => {
      //checkear todos los enemigos del mapa
      if (this.player.collides(enemy, "monster")){
        
      }
    })
    //platform check
    this.map.forEach((platform) => {   
      platform.collider(this.player)
    })
    //items check
    this.items.forEach((item,index) => {   
      if(item.collides(this.player)){
        
        this.player.hearts.healup(2);
        this.items.splice(index,1);
      }
    })


  }

  gameOver() {
    this.stop();
    this.ctx.fillText("GAME OVER", 270, 300);

    //this.enemies = [];
    this.player = new Player(ctx);
  }

  setListeners() {
    document.addEventListener("keydown", (event) =>
      this.player.keyDown(event.key)
    );
    document.addEventListener("keyup", (event) => this.player.keyUp(event.key));
  }
}
//probando
