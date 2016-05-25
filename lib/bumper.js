function Bumper(coords, context, color) {
  this.minX = coords.minX;
  this.maxX = coords.maxX;
  this.minY = coords.minY;
  this.maxY = coords.maxY;
  this.context = context;
  this.type = coords.type;
  this.color = coords.color || "white"
};

Bumper.prototype.draw = function() {
  if (this.type == "bumper") {
    this.context.fillStyle = this.color;
  }
  else {
    var image = new Image();
    image.src = "../images/sand2.png"
    var pattern = this.context.createPattern(image, "repeat")
    this.context.fillStyle = pattern;
  }
  this.context.fillRect(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY);
  return this;
};


module.exports = Bumper;
