class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.interval = null;

    this.background = new Background(ctx);
    this.player = new Player(ctx);

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
    this.enemiesForestMap1.forEach((enemy) => enemy.draw());
    this.removeDeathEnemy()

    // TODO: draw everything
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

  checkCollisions() {
      
    this.enemiesForestMap1.forEach((enemy, index) => {
      //checkear todos los enemigos del mapa
      enemy.checkPlayerColisions(this.player);

      if (this.player.collides(enemy)) {
        const playerLife = this.player.playerLife;
        let monstersAlive = playerLife.filter((heart) => heart.heartPoints > 0);
        let index = 0;
        let resultOfTheAttack = 0;
        console.log(this.player.hitable)
        if (this.player.hitable === false) { //si el player no esta en modo de ataque
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


      }

        // if (this.player.basicAttackMode === true) {
        //   this.showMonsterLivesCooldown++;
        //   enemy.monsterLife[0].heartPoints -= 1;
        //   this.hitable = true;
        //   if (enemy.monsterLife[0].heartPoints === 0) {
        //     this.enemiesForestMap1.slice(index,1)
        //   }
        // }
      // CODIGO PARA CHEQUEAR SI ESTAN VIVOS DE FORMA ALTERNA
      // this.player.isAlive()
      // enemy.isAlive()
      // if(enemy.isAlive() === false){
      //   this.enemiesForestMap1.slice(enemy)
      // }
    });

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
