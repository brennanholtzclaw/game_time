var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var Ball = require('./ball');

var golfBall = new Ball(400, 400, 5, context);

requestAnimationFrame(function gameLoop() {
  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.closePath();
  golfBall.draw().move();
  requestAnimationFrame(gameLoop);
});
