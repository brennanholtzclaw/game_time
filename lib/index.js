var $ = require('./jquery')
var canvas = document.getElementById('puts-puts-golf');
var context = canvas.getContext('2d');
var Hole = require('./hole')
var Ball = require("./ball");
var Bumper = require("./bumper");
var domManipulator = require("./dom-manipulator");
var Game = require("./game");
var Club = require("./club")
var endGame = require("./endGame");
var transitionToNextLevel = require("./transitionLevel");
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

$(document).ready(function() {
    $(".a-ball-color").on('click', function(ev) {
        ev.preventDefault;

        var game = new Game(context);
        var playerName = domManipulator.getPlayerName();
        var ballColor = ev.currentTarget.id;
        var player = localStorage
        var strokeCounter = 0
        var totalScore = 0
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
            game.bumpers.forEach(function(bumper) { bumper.draw();})
            game.hole.draw();
            game.ball.draw();

            game.ball.holeCheck(game.hole)
            if(game.ball.moving) {
                game.ball.move(game.bumpers)
            }
            if(game.ball.inHole && game.gameOver === false) {
                requestAnimationFrame(endLevel);
            }
            requestAnimationFrame(gameLoop);
        };

          function endLevel() {
              if(game.currentLevel.number < game.lastLevel) {
                  transitionToNextLevel(context, game, strokeCounter, ballColor)
                  playerClub.golfBall = game.currentLevel.ball;
                  game.ball.color = ballColor;
                  requestAnimationFrame(gameLoop);
                  strokeCounter = 0
              } else {
                  endGame(context, game, strokeCounter)
              }
          }



        canvas.addEventListener('mousedown', function(event) {
            var that = this
            if(game.ball.moving === false) {
                playerClub.getMousePosition(that, event)
                game.ball.moving = true
                if(game.ball.inHole === false) {
                    strokeCounter++;
                    var level = game.currentLevel.number
                    domManipulator.insertStroke(level, strokeCounter);
                }
            }
        }
    , false)

        $("#restart-btn").on('click', function(ev) {
            //ev.preventDefault:
                requestAnimationFrame(startLoop);
        });

    })
})

module.exports = Ball
