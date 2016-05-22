var canvas = document.getElementById('puts-puts-golf');
var context = canvas.getContext('2d');
var Hole = require('./hole')
var Ball = require("./ball");
var Bumper = require("./bumper");
var Game = require("./game");

var game = new Game(context);

requestAnimationFrame(startLoop);

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
  if(game.ball.moving) {
      game.ball.move()
  }
 requestAnimationFrame(gameLoop);
  game.bumpers.forEach(function(obstacle) { obstacle.draw();})
};

canvas.addEventListener('mousedown', function(event) {
    var that = this
    var mousePos = getMousePosition(that, event)
    moveBall(mousePos)
    console.log(mousePos)
}
, false)

function getMousePosition(that, event) {
  var rec = that.getBoundingClientRect();

  clubToBallSlope({x: event.clientX - rec.left,
                   y: event.clientY - rec.top
                  });

  return {
      x: event.clientX - rec.left,
      y: event.clientY - rec.top
  };
}

function clubToBallSlope(input) {
  var ballX = game.ball.x
  var ballY = game.ball.y

  var clubX = input.x
  var clubY = input.y

  // var rise = ballY - clubY;
  // var run = ballX - clubX;
  var rise = clubY - ballY;
  var run = clubX - ballX

  var slope = rise / run
  // var gradient = slope * 100

  var ballXSpeed = run * -1
  var ballYSpeed = rise * -1
  // var ballXSpeed = rise
  // var ballYSpeed = run
  // var ballXSpeed = (slope * Math.cos(slope));
  // var ballYSpeed = (slope * Math.sin(slope));
  if (ballXSpeed > 10) {
    ballXSpeed = 10;
  }
  else if (ballXSpeed < -10) {
    ballXSpeed = -10;
  }
  if (ballYSpeed > 10) {
    ballYSpeed = 10;
  }
  else if (ballYSpeed < -10) {
    ballYSpeed = -10;
  }

  game.ball.xSpeed = ballXSpeed;
  game.ball.ySpeed = ballYSpeed;

  var squareOfXs = Math.pow((clubX - ballX), 2)
  var squareOfYs = Math.pow((clubY - ballY), 2)
  var clubDistance = Math.sqrt(squareOfXs + squareOfYs)

  // console.warn({speedX: ballXSpeed, speedY: ballYSpeed, dist: clubDistance, bothSlope: slope})
  console.warn({mousx: clubX, mousy: clubY, ballx: game.ball.x, bally: game.ball.y, bothSlope: slope, speedX: ballXSpeed, speedY: ballYSpeed})
};

function moveBall(mousePos) {
  // debugger
  // if(mousePos.x <= game.ball.x + game.ball.radius && mousePos.x >= game.ball.x - game.ball.radius && mousePos.y <= game.ball.y + game.ball.radius && mousePos.y >= game.ball.y - game.ball.radius)
  game.ball.moving = true
}

module.exports = Ball;
