class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.interval = null;

    this.background = new Background(ctx);
    this.platform = new Platform(ctx);

    this.player = new Player(ctx);

    this.map = [];
    this.items = [];
    this.darkslimes = new DarkSlimes(ctx);
    this.enemiesForestMap1 = [];
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
  }

  start() {
    // TODO: play audio
    // TODO: init game loop: clear, draw, move, check collisions and randomly add enemy based on ticks
    this.interval = setInterval(() => {
      this.draw();
      this.move();

      this.tick++;
      
      if(this.init){
        this.addPlatform(50, 300, 200,40);
        this.addPlatform(750, 300, 200,40);
        //this.addPlatform(375, 400, 200,40);
        this.addItems();
        this.addPlatform(0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR);
        this.init = false
      }

      if (this.tick > 100) {
        if (this.enemiesForestMap1.length < 2) {
          ///aqui agregamoos a los mounstruos
          this.tick = 0;
          this.addEnemy();
        }
      }
    }, 1000 / FPS);
  }

  stop() {
    this.audio.pause();
    clearInterval(this.interval);
    this.interval = null;
  }

  clear() {
    // this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // this.enemiesForestMap1 = this.enemiesForestMap1.filter((e) => e.isVisible());
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.checkCollisions();
    this.items.forEach((item) => item.draw());
    this.map.forEach((platform) => platform.draw());
    this.enemiesForestMap1.forEach((enemy) => enemy.draw());
    this.removeObjects()
  }

  move() {
    this.background.move();
    this.player.move();
    this.enemiesForestMap1.forEach((enemy) => enemy.move());
    this.items.forEach((item) => item.move());
  }

  addEnemy() {
    const darkslimes = new DarkSlimes(this.ctx);
    this.enemiesForestMap1.push(darkslimes);
  }

  removeObjects(){ 
    this.enemiesForestMap1.forEach(
      (monster, index) => {
        if(monster.isAlive() === false){
          this.enemiesForestMap1.splice(index,1)
        }
      }
    );
  }

  addPlatform(x,y,w,h,src) {
    const platform = new Platform(this.ctx,x,y,w,h,src);
    this.map.push(platform);
  }

  addItems() {
    const item = new Item(this.ctx);
    this.items.push(item);
  }

  checkCollisions() {
    this.enemiesForestMap1.forEach((enemy) => {
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

    //this.enemiesForestMap1 = [];
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
