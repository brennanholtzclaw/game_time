function Bumper(coords, context, color) {
  this.minX = coords.minX;
  this.maxX = coords.maxX;
  this.minY = coords.minY;
  this.maxY = coords.maxY;
  this.context = context;
  this.color = color || "white"
};

Bumper.prototype.draw = function() {
  this.context.fillStyle = this.color
  this.context.fillRect(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY);
  return this;
};


module.exports = Bumper;
