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
  this.color = 'white'
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
  this.x = this.x + (this.xSpeed * this.xDirection);
  this.y = this.y + (this.ySpeed * this.yDirection);
  this.collisionCheck(bumpers);
  this.xSpeed  *= 0.989
  this.ySpeed  *= 0.989
  this.stopCheck();

  return this;
}

Ball.prototype.stopCheck = function() {
  if (Math.abs(this.xSpeed) < 0.15 && Math.abs(this.ySpeed) < 0.15) {
    this.xSpeed = 1;
    this.ySpeed = 1;
    this.xDirection = 1;
    this.yDirection = 1;
    this.moving = false;
  }
}

Ball.prototype.holeCheck = function(puttHole) {
  if(Math.abs((puttHole.x - this.x)) <= (this.radius + 2) && Math.abs((puttHole.y - this.y)) <= (this.radius + 2)) {
    this.x = puttHole.x;
    this.y = puttHole.y;
    this.moving = false;
    this.inHole = true;
  }
}

Ball.prototype.collisionCheck = function(bumpers) {
  bumpers.forEach(function (bumper, index) {
    if (this.isCollidingWith(bumper)){
      if (bumper.type == "bumper") {
        this.bounceAgainst(bumper);
      }
      else if (bumper.type == "sand") {
        this.adjustSpeed(0.8);
      }
      else if (bumper.type == 'water') {
        this.adjustSpeed(0.8);
        this.sink();
      }
    }
  }, this);
  return this;
}

Ball.prototype.isCollidingWith = function(bumper) {
  return (this.y + this.radius >= bumper.minY && this.y - this.radius <= bumper.maxY)
  && (this.x + this.radius >= bumper.minX && this.x - this.radius <= bumper.maxX)
}

Ball.prototype.bounceAgainst = function(bumper) {
  var prevX = this.x - this.xSpeed * this.xDirection;
  var prevY = this.y - this.ySpeed * this.yDirection;

  if (this.changeXDirection(bumper.minX, bumper.maxX, prevX, this)){
    this.xDirection *= -1;
  }
  if (this.changeYDirection(bumper.minY, bumper.maxY, prevY, this)){
    this.yDirection *= -1;
  }
  this.adjustSpeed(0.9)
}

Ball.prototype.adjustSpeed = function(multiplier) {
  this.xSpeed *= multiplier;
  this.ySpeed *= multiplier;
}

Ball.prototype.sink = function(){
    this.x = 200;
    this.y = 500;
    this.xSpeed = 0;
    this.ySpeed = 0;
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
