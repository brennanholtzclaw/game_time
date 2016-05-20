var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var Hole = require('./hole')
var Ball = require("./ball");
var Bumper = require("./bumper");
var $ = require('./jquery')
var getPlayerName = require('./get_player_name');
var getBallColor = require('./get_ball_color');
var Player = require('./player');

$(document).ready(function() {
    $("#start-button").on('click', function(ev) {
        ev.prventDefault;
        var playerName = getPlayerName()
        var ballColor = getBallColor();
        var player = new Player(playerName, ballColor)
    })
});

var golfBall = new Ball(100, 100, 6, context);
var obstacleOne = new Bumper(50, 50, 250, 60, context);
var obstacleTwo = new Bumper(50, 450, 250, 460, context);
var obstacleThree = new Bumper(50, 50, 60, 450, context);
var obstacleFour = new Bumper(250, 50, 260, 460, context);
var bumperOne = new Bumper(150, 170, 155, 220, context, "blue");
var obstacles = [obstacleOne, obstacleTwo, obstacleThree, obstacleFour, bumperOne]
var puttHole = new Hole(context, 150, 100)

requestAnimationFrame(function gameLoop() {
  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.closePath();
  puttHole.draw();
  golfBall.draw();
  golfBall.holeCheck(puttHole)
  if(golfBall.moving) {
      golfBall.move()
  }
 requestAnimationFrame(gameLoop);
  obstacles.forEach(function(obstacle) { obstacle.draw();})
});

canvas.addEventListener('mousedown', function(event) {
    var that = this
    var mousePos = getMousePosition(that, event)
    moveBall(mousePos)
    console.log(mousePos)
}
, false)

function getMousePosition(that, event) {
    var rec = that.getBoundingClientRect();
    return {
        x: event.clientX - rec.left,
        y: event.clientY - rec.top
    };
}

function moveBall(mousePos) {
    if(mousePos.x <= golfBall.x + golfBall.radius && mousePos.x >= golfBall.x - golfBall.radius && mousePos.y <= golfBall.y + golfBall.radius && mousePos.y >= golfBall.y - golfBall.radius)
        golfBall.moving = true
}

module.exports = Ball;
