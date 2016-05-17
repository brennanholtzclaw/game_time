var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
canvas.addEventListener('mousedown', function(event) {
    var that = this
    var mousePos = getMousePosition(that, event)
    moveBall(mousePos)
    console.log(mousePos)
}
, false)

var Ball = function(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius || 10;
  this.startAngle = 0;
  this.endAngle = (Math.PI / 180) * 360;
  this.speed = 3
  this.moving = false
}

Ball.prototype.draw = function () {
  context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
  context.fillStyle = "white"
  context.fill();
  return this;
};

Ball.prototype.move = function () {
  if (this.x < canvas.width - this.radius && this.y < canvas.height - this.radius ){
      //this.x += this.speed;
      this.y -= this.speed;
    console.log('ballx= ' + this.x + 'bally= ' + this.y)
  }
  return this;
};

function getMousePosition(that, event) {
    return event.clientX - that.offsetLeft
}

function moveBall(mousePos) {
    if(mousePos <= ballPos.x + ballPos.radius && mousePos >= ballPos.x - ballPos.radius)
        golfBall.moving = true
}


var golfBall = new Ball(350, 450, 5);
var ballPos = golfBall.draw()

requestAnimationFrame(function gameLoop() {
  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.closePath();
  golfBall.draw()
  if(golfBall.moving) {
      golfBall.move()
  }
 requestAnimationFrame(gameLoop);
});

module.exports = Ball;
