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
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Ball.prototype.draw = function () {
  context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
  context.fillStyle = "white"
  context.fill();
  return this;
};

var obstacle = new Bumper(350, 500, 5, 200);

Ball.prototype.move = function () {
  this.x = this.x + (this.speed * this.xDirection);
  this.y = this.y + (this.speed * this.yDirection);

  if (this.x >= canvas.width - this.radius || this.x < 0 || this.x == obstacle.x) {
    this.xDirection *= -1;
    this.speed *= 0.8
  }
  if (this.y >= canvas.height - this.radius || this.y < 0|| this.y == obstacle.y) {
    this.yDirection *= -1;
  }
  return this;
};

var golfBall = new Ball(400, 400, 5, 0);

requestAnimationFrame(function gameLoop() {
  debugger
  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.closePath();
  obstacle.draw();
  golfBall.draw().move();
  requestAnimationFrame(gameLoop);
});

module.exports = Ball;
