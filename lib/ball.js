function Ball(x, y, radius, context) {
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
}

Ball.prototype.draw = function () {
    this.context.fillStyle = "white"
    this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    this.context.fill();
    return this;
};

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

      if (this.changeXDirection(xMin, xMax, prevX, this)){
        this.xDirection *= -1;
      }
      if (this.changeYDirection(yMin, yMax, prevY, this)){
        this.yDirection *= -1;
      }
      this.speed *= 0.8;
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
