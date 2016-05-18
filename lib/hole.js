var Hole = function(context, x, y) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.startAngle = 0;
    this.endAngle = (Math.PI * 2);
    this.color = 'black';
};

Hole.prototype.draw = function() {
    this.context.fillStyle = this.color
    this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    this.context.fill();
    return this;
};

module.exports = Hole;
