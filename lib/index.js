var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

canvas.addEventListener('mousedown', function(event) {
    var that = this
    var mousePos = getMousePosition(that, event)
    moveBall(mousePos)
    console.log(mousePos)
}
, false)

var Ball = function(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius || 10;
  this.startAngle = 0;
  this.moving = false
  this.endAngle = (Math.PI * 2);
  this.context = context
  // this.speed = 5
  this.xSpeed = 5
  this.ySpeed = 5
  this.xDirection = 1
  this.yDirection = 1
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
    context.fillStyle = "white"
    context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    context.fill();
    return this;
};

// Hole Obstacles minX minY maxX maxY
// var obstacle = new Bumper(0, 0, 10, 200);
var obstacleOne = new Bumper(50, 50, 250, 60);
var obstacleTwo = new Bumper(50, 450, 250, 460);
var obstacleThree = new Bumper(50, 50, 60, 450);
var obstacleFour = new Bumper(250, 50, 260, 460);
var bumperOne = new Bumper(150, 170, 155, 220, "blue");
var obstacles = [obstacleOne, obstacleTwo, obstacleThree, obstacleFour, bumperOne]
// var obstacles = [obstacle]

var golfBall = new Ball(100, 100, 6);

Ball.prototype.move = function () {
  this.bounceCheck();

  // this.x = this.x + (this.speed * this.xDirection);
  // this.y = this.y + (this.speed * this.yDirection);
  this.x = this.x + (this.xSpeed * this.xDirection);
  this.y = this.y + (this.ySpeed * this.yDirection);

  // this.speed  -= 0.01
  this.xSpeed  -= 0.01
  this.ySpeed  -= 0.01
  this.stopCheck();

  return this;
}

Ball.prototype.stopCheck = function() {
//   if (this.speed < 0.01) {
//     this.speed = 5;
//     this.moving = false;
//   }
// }
  if (this.xSpeed < 0.01 && this.ySpeed < 0.01) {
    this.xSpeed = 5;
    this.ySpeed = 5;
    this.moving = false;
  }
}

var obstacleCoords = [[50, 50, 250, 60], [50, 450, 250, 460], [50, 50, 60, 450], [250, 50, 260, 460], [150, 170, 155, 220]]

Ball.prototype.bounceCheck = function() {
  obstacleCoords.forEach(function (obstacle, index) {
    var xMin = obstacle[0];
    var yMin = obstacle[1];
    var xMax = obstacle[2];
    var yMax = obstacle[3];
    if ((this.y + this.radius >= yMin && this.y - this.radius <= yMax) && (this.x + this.radius >= xMin && this.x - this.radius <= xMax) ) {

      // var prevX = this.x - this.speed * this.xDirection;
      // var prevY = this.y - this.speed * this.yDirection;
      var prevX = this.x - this.xSpeed * this.xDirection;
      var prevY = this.y - this.ySpeed * this.yDirection;
      if ((prevY - this.radius > yMax &&  this.y - this.radius <= yMax) || // check for collision in y direction on bottom
          (prevY + this.radius < yMin && this.y + this.radius >= yMin)){  // check for collision in y direction on top

        this.yDirection *= -1;
      }

      if ((prevX - this.radius > xMax &&  this.x - this.radius <= xMax) || // check for collision in x direction on right
          (prevX + this.radius < xMin && this.x + this.radius >= xMin)) {  // check for collision in x direction on left

        this.xDirection *= -1;
      }
      // this.speed *= 0.8;
      this.xSpeed *= 0.8;
      this.ySpeed *= 0.8;
    }
  }, this);
  return this;
}


// X Bounce Obstacles!!
//left side
// var obstacle = new Bumper(50, 20, 500, 10);
// var golfBall = new Ball(10, 10, 6, 0);

// right side
// var obstacle = new Bumper(650, 20, 500, 10);
// var golfBall = new Ball(670, 10, 6, 0);
// var obstacles = [obstacle]

// var obstacleTwo = new Bumper(50, 450, 10, 400);
// var obstacles = [obstacle, obstacleTwo]

// Y Bounce Obstacles!!

// Top obstacle
// var obstacle = new Bumper(50, 50, 10, 400);
// var golfBall = new Ball(50, 30, 6, 0);

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
  if(golfBall.moving) {
      golfBall.move()
  }
 requestAnimationFrame(gameLoop);
  obstacles.forEach(function(obstacle) { obstacle.draw();})
});

module.exports = Ball;
