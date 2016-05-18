var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var Hole = require('./hole')

canvas.addEventListener('mousedown', function(event) {
    var that = this
    var mousePos = getMousePosition(that, event)
    moveBall(mousePos)
    console.log(mousePos)
}
, false)

var Ball = function(context, x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius || 10;
  this.startAngle = 0;
  this.moving = false
  this.endAngle = (Math.PI * 2);
  this.context = context
  this.speed = 1
  this.xDirection = 1
  this.yDirection = 1
  this.color = 'white'
}

var Bumper = function(minX, minY, maxX, maxY, color) {
  this.minX = minX;
  this.maxX = maxX;
  this.minY = minY;
  this.maxY = maxY;
  this.context = context;
  this.color = color || "white"
};

Bumper.prototype.draw = function() {
  obstacles.forEach(function (obstacle, index) {
    context.fillStyle = obstacle.color
    context.fillRect(obstacle.minX, obstacle.minY, obstacle.maxX - obstacle.minX, obstacle.maxY - obstacle.minY);
  });
  return this;
};

Ball.prototype.draw = function () {
    this.context.fillStyle = this.color
    this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    this.context.fill();
    return this;
};


var obstacleOne = new Bumper(50, 50, 250, 60);
var obstacleTwo = new Bumper(50, 450, 250, 460);
var obstacleThree = new Bumper(50, 50, 60, 450);
var obstacleFour = new Bumper(250, 50, 260, 460);
var bumperOne = new Bumper(150, 170, 155, 220, "blue");
var obstacles = [obstacleOne, obstacleTwo, obstacleThree, obstacleFour, bumperOne]

var golfBall = new Ball(context, 100, 100, 6);
var puttHole = new Hole(context, 150, 100);

Ball.prototype.move = function () {
  this.bounceCheck();

  this.x = this.x + (this.speed * this.xDirection);
  this.y = this.y + (this.speed * this.yDirection);

  return this;
}

var obstacleCoords = [[50, 50, 250, 60], [50, 450, 250, 460], [50, 50, 60, 450], [250, 50, 260, 460], [150, 170, 155, 220]]

Ball.prototype.bounceCheck = function() {
  obstacleCoords.forEach(function (obstacle, index) {
    var xMin = obstacle[0];
    var yMin = obstacle[1];
    var xMax = obstacle[2];
    var yMax = obstacle[3];
    if ((this.y + this.radius >= yMin && this.y - this.radius <= yMax) && (this.x + this.radius >= xMin && this.x - this.radius <= xMax) ) {

      var prevX = this.x - this.speed * this.xDirection;
      var prevY = this.y - this.speed * this.yDirection;
      if ((prevY - this.radius > yMax &&  this.y - this.radius <= yMax) || // check for collision in y direction on bottom
          (prevY + this.radius < yMin && this.y + this.radius >= yMin)){  // check for collision in y direction on top

        this.yDirection *= -1;
      }

      if ((prevX - this.radius > xMax &&  this.x - this.radius <= xMax) || // check for collision in x direction on right
          (prevX + this.radius < xMin && this.x + this.radius >= xMin)) {  // check for collision in x direction on left

        this.xDirection *= -1;
      }
      this.speed *= 0.8;
    }
  }, this);
  return this;
}

function getMousePosition(that, event) {
    var rec = that.getBoundingClientRect();
    return {
        x: event.clientX - rec.left,
        y: event.clientY - rec.top
    };
}

function moveBall(mousePos) {
    if(mousePos.x <= golfBall.x + golfBall.radius && mousePos.x >= golfBall.x - golfBall.radius && mousePos.y <= golfBall.y + golfBall.radius && mousePos.y >= golfBall.y - golfBall.radius)
        golfBall.moving = true
}

requestAnimationFrame(function gameLoop() {
  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.closePath();
  golfBall.draw()
  puttHole.draw();
  if(golfBall.moving) {
      golfBall.move()
  }
 requestAnimationFrame(gameLoop);
  obstacles.forEach(function(obstacle) { obstacle.draw();})
});

module.exports = Ball;
