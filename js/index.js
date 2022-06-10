const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);

// TODO: start/stop game on button click
// TODO: change button text based on game interval
game.start()

const swordSprites = new Sprite(ctx, 50, 50,100,100,'/img/GOUSTY/SWORD/OnAir/SWORD_ON_AIR_UP_LOOKING_RIGTH.png')
swordSprites.draw(ctx)