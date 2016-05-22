var Hole = function(x, y, context) {
  this.context = context;
  this.x = x;
  this.y = y;
  this.radius = 10;
  this.startAngle = 0;
  this.endAngle = (Math.PI * 2);
  this.color = 'black';
};

Hole.prototype.draw = function() {
  this.context.beginPath();
  this.context.fillStyle = this.color
  this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
  this.context.closePath();
  this.context.fill();
};

module.exports = Hole;
