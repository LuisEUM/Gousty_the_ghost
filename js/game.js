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
  }

  start() {
    // TODO: play audio
    // TODO: init game loop: clear, draw, move, check collisions and randomly add enemy based on ticks
    this.interval = setInterval(() => {
      this.draw();
      this.move();
      this.tick++;

      if(this.tick == 1){
        this.addItems();
      }

      if(this.tick++ == 1){
        this.addPlatform(60, 200, 200, 40, PLATFORMS_FOREST_PLATFORM_2);
        this.addPlatform(740, 200, 200,40, PLATFORMS_FOREST_PLATFORM_2);
        this.addPlatform(380, 360, 200,40, PLATFORMS_FOREST_PLATFORM_2);
        this.addPlatform(0, 540 ,this.ctx.canvas.width, 60, PLATFORMS_FOREST_FLOOR);
      }       
    }, 1000 / FPS);
  }

  stop() {               
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.checkCollisions();
    this.items.forEach((item) => item.draw());
    this.map.forEach((platform) => platform.draw());
    this.enemiesForestMap1.forEach((enemy) => enemy.draw());
    this.removeDeathEnemy()
  }

  move() {
    this.background.move();
    this.player.move();
    this.enemiesForestMap1.forEach((enemy) => enemy.move());
  }

  addEnemy() {
    const darkslimes = new DarkSlimes(this.ctx);
    this.enemiesForestMap1.push(darkslimes);
  }

  removeDeathEnemy(){ 
    this.teck++
    this.enemiesForestMap1.forEach(
      (monster, index) => {
        if(monster.isAlive() === false){
          if(this.teck >= 90){
            this.enemiesForestMap1.splice(index,1)
            this.teck = 0
          }
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
      //console.log(this.player.collides(enemy, "monster"))
      if (this.player.collides(enemy, "monster")) {

        const playerLife = this.player.playerLife;
        let monstersAlive = playerLife.filter((heart) => heart.heartPoints > 0);
        let index = 0;
        let resultOfTheAttack = 0;

        console.log(this.player.hitable, monstersAlive[index].heartPoints >= 0)
        if (monstersAlive[index].heartPoints >= 0) {
          monstersAlive[index].heartPoints -= enemy.strength; //restar el daño del enemigo al player
          resultOfTheAttack = monstersAlive[index].heartPoints; // guardar el sobrante del daño del enemigo
          while (resultOfTheAttack < 0) {
            // restar el sobrante del daño al resto de corazones del player
            monstersAlive[index].heartPoints = 0;
            monstersAlive[index + 1].heartPoints += resultOfTheAttack;
            resultOfTheAttack = monstersAlive[index + 1].heartPoints;
            index++;
          }
        }
      }
    })
    let vida = null
    this.map.forEach((platform) => {   
      vida = this.player.collides(platform, "platform", vida)
    })



  }

  gameOver() {
    this.stop();
    this.ctx.fillText("GAME OVER", 270, 300);

    //this.enemiesForestMap1 = [];
    this.player = new Player(ctx);
  }

  setListeners() {
    let keysPressed = {};

    document.addEventListener("keydown", (event) => {
      keysPressed[event.key] = true;
      this.player.keyDown(event.key);
      
      if (keysPressed['z']) {
        console.log(keysPressed)
        this.player.swordAtack(keysPressed)
      }
    }     
    );
    document.addEventListener("keyup", (event) => {
      this.player.keyUp(event.key);

      delete keysPressed[event.key];

      // delete  this.keysPressed[event.key];
    });
  }
}
//probando
