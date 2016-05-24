var canvas = document.getElementById('puts-puts-golf');
var context = canvas.getContext('2d');
var Hole = require('./hole')
var Ball = require("./ball");
var Bumper = require("./bumper");
var Game = require("./game");

var game = new Game(context);

requestAnimationFrame(startLoop);

var Club = require("./club")

var playerClub = new Club(context, game.ball);

function startLoop() {
  var newGame = new Game(context);
  requestAnimationFrame(gameLoop)
};

function gameLoop() {
  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.closePath();
  game.hole.draw();
  game.ball.draw();
  game.ball.holeCheck(game.hole)
  game.bumpers.forEach(function(bumper) { bumper.draw();})

  if(game.ball.moving) {
      game.ball.move(game.bumpers)
  }
  if(game.ball.inHole){
    requestAnimationFrame(endLevel);
  }
  requestAnimationFrame(gameLoop);
};

function endLevel() {
  // increment score
  // display score
  if(game.currentLevel.number < game.lastLevel) {
    game.updateLevel();
    requestAnimationFrame(gameLoop);
  } else {
    requestAnimationFrame(endGame);
  }
}

function endGame() {
  //
}

canvas.addEventListener('mousedown', function(event) {
    var that = this
    var mousePos = playerClub.getMousePosition(that, event)
    moveBall(mousePos)
    console.log(mousePos)
}
, false)

function moveBall(mousePos) {
  game.ball.moving = true
}

module.exports = Ball;
