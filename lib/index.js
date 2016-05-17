var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var Ball = function(x, y, radius, context) {
  this.x = x;
  this.y = y;
  this.radius = radius || 10;
  this.startAngle = 0;
  this.endAngle = (Math.PI * 2);
  this.context = context
  this.speed = 1
  this.xDirection = 1
  this.yDirection = 1
}

var Bumper = function(x, y, height, width, context) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.context = context
};

Bumper.prototype.draw = function() {
  obstacles.forEach(function (obstacle, index) {
    context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    // return obstacle;
  });
  return this;
};

Ball.prototype.draw = function () {
    context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    context.fillStyle = "white"
    context.fill();
    return this;
};

// Hole Obstacles x-y-height-width
var obstacle = new Bumper(50, 50, 10, 200);
var obstacleTwo = new Bumper(50, 450, 10, 200);
var obstacleThree = new Bumper(50, 50, 400, 10);
var obstacleFour = new Bumper(250, 50, 410, 10);
var obstacles = [obstacle, obstacleTwo, obstacleThree, obstacleFour]

var golfBall = new Ball(175, 425, 6);

Ball.prototype.move = function () {

  if(this.xDirection == 1) {
    this.posXBounce();
  }
  else {
    this.negXBounce();
  }

  if (this.yDirection == 1) {
    this.posYBounce();
  }
  else {
    this.negYBounce();
  }

  this.x = this.x + (this.speed * this.xDirection);
  this.y = this.y + (this.speed * this.yDirection);

  return this;
}

Ball.prototype.posXBounce = function() {
  if (this.x + this.radius >= canvas.width || (this.x + this.radius == obstacle.x && this.y + this.radius <= obstacle.y + obstacle.height && this.y + this.radius >= obstacle.y)) {
    // debugger;
    this.xDirection = -1;
    this.speed *= 0.8
  }
}

Ball.prototype.negXBounce = function() {
  if (this.x - this.radius < 0 || (this.x - this.radius == obstacle.x + obstacle.width && this.y + this.radius <= obstacle.y + obstacle.height && this.y + this.radius >= obstacle.y)) {
    // debugger;
    this.xDirection = 1;
    this.speed *= 0.8
  }
}

Ball.prototype.posYBounce = function() {
  if (this.y >= canvas.height - this.radius || this.y + this.radius == obstacle.y && this.x + this.radius <= obstacle.x + obstacle.width && this.x - this.radius >= obstacle.x) {
    // debugger;
    this.yDirection = -1;
  }
}

Ball.prototype.negYBounce = function() {
  if (this.y - this.radius < 0 || (this.y - this.radius == obstacle.y + obstacle.height && this.x + this.radius <= obstacle.x + obstacle.width && this.x - this.radius >= obstacle.x)){
    // debugger;
    this.yDirection = 1;
  }
}
// Ball.prototype.move = function () {
//   this.x = this.x + (this.speed * this.xDirection);
//   this.y = this.y + (this.speed * this.yDirection);
//
//   if (this.x >= canvas.width - this.radius || this.x < 0 || this.x == obstacle.x - this.radius) {
//     this.xDirection *= -1;
//     this.speed *= 0.8
//   }
//   if (this.y >= canvas.height - this.radius || this.y < 0|| this.y == obstacle.y - this.radius) {
//     this.yDirection *= -1;
//   }
//   return this;
// };

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

// Bottom Obstacle
// var obstacle = new Bumper(50, 550, 10, 400);
// var golfBall = new Ball(50, 570, 6, 0);
//
// var obstacles = [obstacle]
// var obstacles = [obstacle, obstacleTwo, obstacleThree]
// var obstacleTwo = new Bumper(50, 450, 10, 400);

requestAnimationFrame(function gameLoop() {
  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.closePath();
  obstacle.draw();
  golfBall.draw().move();
  requestAnimationFrame(gameLoop);
});

module.exports = Ball;
