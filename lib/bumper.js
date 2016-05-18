function Bumper(minX, minY, maxX, maxY, context, color) {
  this.minX = minX;
  this.maxX = maxX;
  this.minY = minY;
  this.maxY = maxY;
  this.context = context;
  this.color = color || "white"
};

Bumper.prototype.draw = function() {
  this.context.fillStyle = this.color
  this.context.fillRect(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY);
  return this;
};


module.exports = Bumper;
