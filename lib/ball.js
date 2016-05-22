var Ball = function(x, y, radius, context) {
  this.x = x;
  this.y = y;
  this.radius = radius || 10;
  this.startAngle = 0;
  this.moving = false
  this.endAngle = (Math.PI * 2);
  this.context = context
  this.xSpeed = 5
  this.ySpeed = 5
  this.xDirection = 1
  this.yDirection = 1
}

Ball.prototype.draw = function () {
  this.context.beginPath();
  this.context.fillStyle = "white";
  this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
  this.context.closePath();
  this.context.fill();
  return this;
};

Ball.prototype.move = function () {
  this.bounceCheck();

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

// var obstacleCoords = [[50, 50, 250, 60], [50, 450, 250, 460], [50, 50, 60, 450], [250, 50, 260, 460], [150, 170, 155, 220]]

Ball.prototype.holeCheck = function(puttHole) {
  if(Math.abs((puttHole.x - this.x)) < (puttHole.radius + this.radius) && Math.abs((puttHole.y - this.y)) < (puttHole.radius + this.radius)) {
    this.x = puttHole.x
    this.y = puttHole.y
    this.moving = false
  }
}

Ball.prototype.bounceCheck = function(bumpers) {
  bumpers.forEach(function (bumper, index) {
    var xMin = obstacle[0];
    var yMin = obstacle[1];
    var xMax = obstacle[2];
    var yMax = obstacle[3];
    if ((this.y + this.radius >= bumper.minY && this.y - this.radius <= bumper.maxY) && (this.x + this.radius >= bumper.minX && this.x - this.radius <= bumper.maxX) ) {

      var prevX = this.x - this.xSpeed * this.xDirection;
      var prevY = this.y - this.ySpeed * this.yDirection;
      // var prevX = this.x - this.speed * this.xDirection;
      // var prevY = this.y - this.speed * this.yDirection;

      if (this.changeXDirection(bumper.minX, bumper.maxX, prevX, this)){
        this.xDirection *= -1;
      }
      if (this.changeYDirection(bumper.minY, bumper.maxY, prevY, this)){
        this.yDirection *= -1;
      }
      this.xSpeed *= 0.8;
      this.ySpeed *= 0.8;
      // this.speed *= 0.8;
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
