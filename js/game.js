class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.interval = null;

    this.background = new Background(ctx);
    this.platform = new Platform(ctx);

    this.player = new Player(ctx);



    this.darkslimes = new DarkSlimes(ctx)
    this.enemies = [];

    this.map = [];

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

      if(this.tick++ == 1){
        this.addPlatform();
      }
      if (this.tick > Math.random() * 200 + 100) {
        if(this.enemies.length < 1){
          this.tick = 0;
          this.addEnemy();
        }
      }

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
    this.background.draw();
    this.player.draw();
    this.checkCollisions();
    this.enemies.forEach((enemy) => enemy.draw());
    this.map.forEach((platform) => platform.draw());
    // TODO: draw everything
  }

  move() {
    this.background.move()
    this.player.move()
    this.enemies.forEach((enemy) => enemy.move());
  }

  addEnemy() {
    const darkslimes = new DarkSlimes(this.ctx);
    this.enemies.push(darkslimes);
  }

  addPlatform() {
    const platform = new Platform(this.ctx);
    this.map.push(platform);
  }

  checkCollisions() {
    //estas coliciones debemos cambiarlas a un documento aparte y separarlas en una carpeta por cada uno 
    //es mucho codigo para estar en el game 
    this.enemies.forEach((enemy) => {
      if (this.player.collides(enemy,"monster")) {
      const playerLife = this.player.playerLife
      let currentLive = playerLife.filter(heart => heart.heartPoints)
      let index = 0
      let keepResting = true
      let resultOfTheAttack = 0

            console.log(currentLive)
          if(currentLive[index].heartPoints >= 0) {
            currentLive[index].heartPoints -= enemy.strength //restar el daño del enemigo 
            resultOfTheAttack = currentLive[index].heartPoints // guardar el sobrante del daño
            while (resultOfTheAttack < 0) {  // restar el sobrante del daño al resto de corazones
                currentLive[index].heartPoints = 0
                currentLive[index+1].heartPoints += resultOfTheAttack
                resultOfTheAttack  = currentLive[index+1].heartPoints
                index++
            }
          }
      }
    })

    this.map.forEach((platform,) => {
      this.player.collides(platform, "platform")
    })
  }

  gameOver() {
    
    this.stop();
    this.ctx.fillText("GAME OVER", 270, 300);

    //this.enemies = [];
    this.player = new Player(ctx);
  }

  setListeners() {
    document.addEventListener('keydown', (event) => this.player.keyDown(event.key))
    document.addEventListener('keyup', (event) => this.player.keyUp(event.key))
  }
}
//probando