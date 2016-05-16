var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var Ball = function(x, y, radius, context) {
  this.x = x;
  this.y = y;
  this.radius = radius || 10;
  this.startAngle = 0;
  this.endAngle = (Math.PI / 180) * 360;
  this.context = context
  this.speed = 0
}

Ball.prototype.draw = function () {
  context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
  context.fillStyle = "white"
  context.fill();
  return this;
};

Ball.prototype.move = function () {
  if (this.x < canvas.width - this.radius && this.y < canvas.height - this.radius ){
    this.x += this.speed;
    // this.y += this.speed;
  }
  return this;
};

var golfBall = new Ball(350, 450, 5, 0);

requestAnimationFrame(function gameLoop() {
  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.closePath();
  golfBall.draw().move();
  requestAnimationFrame(gameLoop);
});

module.exports = Ball;
