var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var Ball = require("./ball");
var Bumper = require("./bumper");

var golfBall = new Ball(100, 100, 6, context);
var obstacleOne = new Bumper(50, 50, 250, 60, context);
var obstacleTwo = new Bumper(50, 450, 250, 460, context);
var obstacleThree = new Bumper(50, 50, 60, 450, context);
var obstacleFour = new Bumper(250, 50, 260, 460, context);
var bumperOne = new Bumper(150, 170, 155, 220, context, "blue");
var obstacles = [obstacleOne, obstacleTwo, obstacleThree, obstacleFour, bumperOne]


requestAnimationFrame(function gameLoop() {
  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.closePath();
  // debugger;
  golfBall.draw();
  if(golfBall.moving) {
      golfBall.move()
  }
 requestAnimationFrame(gameLoop);
  obstacles.forEach(function(obstacle) { obstacle.draw();})
});

canvas.addEventListener('mousedown', function(event) {
    var that = this
    var mousePos = getMousePosition(that, event)
    moveBall(mousePos)
    console.log(mousePos)
}
, false)

function getMousePosition(that, event) {
  // debugger;
  // debugger
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
  var ballX = golfBall.x
  var ballY = golfBall.y

  var clubX = input.x
  var clubY = input.y

  var rise = clubY - ballY;
  var run = clubX - ballX

  var slope = rise / run

  var ballXSpeed = slope * Math.cos(slope);

  var ballYSpeed = slope * Math.sin(slope);

  // console.warn({X: ballXSpeed, y: ballYSpeed})

  golfBall.xSpeed = ballXSpeed;
  golfBall.ySpeed = ballYSpeed;

  // Convert the rise and run to the same units and then divide the rise by the run.
  // Multiply this number by 100 and you have the percentage slope.
  // For instance, 3" rise divided by 36" run = .083 x 100 = an 8.3% slope.

};

function moveBall(mousePos) {
  // if(mousePos.x <= golfBall.x + golfBall.radius && mousePos.x >= golfBall.x - golfBall.radius && mousePos.y <= golfBall.y + golfBall.radius && mousePos.y >= golfBall.y - golfBall.radius)
  golfBall.moving = true
}
