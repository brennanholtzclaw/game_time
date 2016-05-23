var Ball = function(coords, context) {
  this.x = coords.x;
  this.y = coords.y;
  this.radius = coords.radius || 10;;
  this.moving = false
  this.context = context
  this.xSpeed = 5
  this.ySpeed = 5
  this.xDirection = 1
  this.yDirection = 1
  this.color = "white"
  this.inHole = false
}

Ball.prototype.draw = function () {
  this.context.beginPath();
  this.context.fillStyle = this.color;
  this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  this.context.closePath();
  this.context.fill();
  return this;
};

Ball.prototype.move = function (bumpers) {
  this.bounceCheck(bumpers);

  this.x = this.x + (this.xSpeed * this.xDirection);
  this.y = this.y + (this.ySpeed * this.yDirection);
  this.xSpeed  *= 0.989
  this.ySpeed  *= 0.989
  this.stopCheck();

  return this;
}

Ball.prototype.stopCheck = function() {
  if (Math.abs(this.xSpeed) < 0.01 && Math.abs(this.ySpeed) < 0.01) {
    this.xSpeed = 5;
    this.ySpeed = 5;
    this.moving = false;
  }
}

Ball.prototype.holeCheck = function(puttHole) {
  if(Math.abs((puttHole.x - this.x)) < (this.radius) && Math.abs((puttHole.y - this.y)) < (this.radius)) {
    this.x = puttHole.x;
    this.y = puttHole.y;
    this.moving = false;
    this.inHole = true;
  }
}

Ball.prototype.bounceCheck = function(bumpers) {
  bumpers.forEach(function (bumper, index) {
    if ((this.y + this.radius >= bumper.minY && this.y - this.radius <= bumper.maxY) && (this.x + this.radius >= bumper.minX && this.x - this.radius <= bumper.maxX) ) {

      var prevX = this.x - this.xSpeed * this.xDirection;
      var prevY = this.y - this.ySpeed * this.yDirection;

      if (this.changeXDirection(bumper.minX, bumper.maxX, prevX, this)){
        this.xDirection *= -1;
      }
      if (this.changeYDirection(bumper.minY, bumper.maxY, prevY, this)){
        this.yDirection *= -1;
      }
      this.xSpeed *= 0.8;
      this.ySpeed *= 0.8;
    }
  }, this);
  return this;
}

Ball.prototype.changeXDirection = function(xMin, xMax, prevX, that){
  return (prevX - that.radius > xMax &&  that.x - that.radius <= xMax) || // check for collision in x direction on right
  (prevX + that.radius < xMin && that.x + that.radius >= xMin)  // check for collision in x direction on left
}

Ball.prototype.changeYDirection = function(yMin, yMax, prevY, that){
  return (prevY - that.radius > yMax &&  that.y - that.radius <= yMax) || // check for collision in y direction on bottom
  (prevY + that.radius < yMin && that.y + that.radius >= yMin)  // check for collision in y direction on top
}

module.exports = Ball;
