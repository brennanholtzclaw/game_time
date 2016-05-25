var $ = require('./jquery')
var canvas = document.getElementById('puts-puts-golf');
debugger;
var context = canvas.getContext('2d');
var Hole = require('./hole')
var Ball = require("./ball");
var Bumper = require("./bumper");
var domManipulator = require("./dom-manipulator");
var Game = require("./game");
var Club = require("./club")
var calculateScore = require("./scoreCalculator");
var endLevel = require("./end-level");
var transitionToNextLevel = require("./transitionLevel");

$(document).ready(function() {
    $(".a-ball-color").on('click', function(ev) {
        ev.prventDefault;

        var game = new Game(context);
        var playerName = domManipulator.getPlayerName();
        var ballColor = ev.currentTarget.id;
        var player = localStorage
        var strokeCounter = 0
        var playerClub = new Club(context, game.ball);
        game.ball.color = ballColor

        // local storage
        player.setItem('name', playerName); //sets player name
        player.setItem('score', 0); //sets player score to zero
        //player.setItem('ballColor', ballColor); //set ballColor

        domManipulator.showScoreCard()

        requestAnimationFrame(startLoop);

        function startLoop() {
            var newGame = new Game(context);
            requestAnimationFrame(gameLoop)
        };

        function gameLoop() {
            context.beginPath();
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.closePath();
            game.ball.draw();
            game.hole.draw();

            game.ball.holeCheck(game.hole)
            game.bumpers.forEach(function(bumper) { bumper.draw();})
            if(game.ball.moving) {
                game.ball.move(game.bumpers)
            }
            if(game.ball.inHole) {
                requestAnimationFrame(endLevel);
            }
            requestAnimationFrame(gameLoop);
          };

          function endLevel() {
              if(game.currentLevel.number < game.lastLevel) {
                  transitionToNextLevel(context, game, strokeCounter)
                  playerClub.golfBall = game.currentLevel.ball;
                  requestAnimationFrame(gameLoop);
              } else {
                  requestAnimationFrame(endGame);
              }
              strokeCounter = 0
          }

          function endGame() {
          }

        canvas.addEventListener('mousedown', function(event) {
            var that = this
            if(game.ball.moving === false) {
                var mousePos = playerClub.getMousePosition(that, event)
                moveBall(mousePos)
                if(game.ball.inHole === false) {
                    strokeCounter++;
                    var level = game.currentLevel.number
                    domManipulator.insertStroke(level, strokeCounter);
                }
            }
        }
    , false)

function moveBall(mousePos) {
    game.ball.moving = true
}
    })
})

module.exports = Ball
