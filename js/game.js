class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.interval = null;

    this.background = new Background(ctx);
    this.player = new Player(ctx);

    this.heart1 = new Heart(ctx, 50)
    this.heart2 = new Heart(ctx, 100)
    this.heart3 = new Heart(ctx, 150)

    this.heartPoints = 1
    this.playerMaxHearts = 3
    this.playerLife = [this.heart1, this.heart2, this.heart3]

    this.darkslimes = new DarkSlimes(ctx)
    this.enemies = [];

    this.tick = 0;
    this.origanlColor = this.ctx.fillStyle = "white";

    this.audio = new Audio("audio/theme.mp3");
    this.gameOverAudio = new Audio("audio/game-over.mp3");
    this.ctx.font = "80px Poppins";
    this.setListeners();
  }

  start() {
    // TODO: play audio
    // TODO: init game loop: clear, draw, move, check collisions and randomly add enemy based on ticks
    this.interval = setInterval(() => {
      this.draw();
      this.move();

      this.tick++;

      if (this.tick > Math.random() * 200 + 100) {
        if(this.enemies.length < 2){
          this.tick = 0;
          this.addEnemy();
        }
      }


      
    
    //this.addHearts()

    }, 1000 / FPS)

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
    this.background.draw()
    this.player.draw()
    this.checkCollisions();
    this.enemies.forEach((enemy) => enemy.draw());
    this.playerLife.forEach((heart) => heart.draw());

    // TODO: draw everything
  }

  move() {
    this.background.move()
    this.player.move()
    this.enemies.forEach((enemy) => enemy.move());
    this.playerLife.forEach((heart) => heart.move()); 

  }

  addHearts(){
  }

  addEnemy() {
    const darkslimes = new DarkSlimes(this.ctx);
    this.enemies.push(darkslimes);
  }

  checkCollisions() {
    this.enemies.forEach((darkSlime) => {
      if (darkSlime.collides(this.player)) {
        this.playerLife.pop()  
      }
    });
  }

  gameOver() {
    
    this.stop();
    this.ctx.fillText("GAME OVER", 270, 300);

    //this.enemies = [];
    this.player = new Player(ctx);
  }

  setListeners() {
    document.addEventListener('keydown', (event) => this.player.keyDown(event.keyCode))
    document.addEventListener('keyup', (event) => this.player.keyUp(event.keyCode))
  }
}
