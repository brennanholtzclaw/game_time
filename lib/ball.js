var Ball = function(x, y, radius, context) {
  this.x = x;
  this.y = y;
  this.radius = radius || 10;
  this.startAngle = 0;
  this.endAngle = (Math.PI * 2);
  this.context = context
  this.speed = 3
  this.xDirection = 1
  this.yDirection = 1
}

Ball.prototype.draw = function () {
  this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
  this.context.fillStyle = "white"
  this.context.fill();
  return this;
};

Ball.prototype.move = function () {
  this.x = this.x + (this.speed * this.xDirection);
  this.y = this.y + (this.speed * this.yDirection);

  if (this.x < 0) {
    this.xDirection *= -1;
    this.speed *= 0.8
  }
  if (this.y < 0) {
    this.yDirection *= -1;
  }
  return this;
};

module.exports = Ball;
