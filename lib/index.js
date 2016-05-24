var $ = require('./jquery')
var canvas = document.getElementById('puts-puts-golf');
var context = canvas.getContext('2d');
var Hole = require('./hole')
var Ball = require("./ball");
var Bumper = require("./bumper");
var domManipulator = require('./dom-manipulator');
var Game = require("./game");
var Club = require("./club")

$(document).ready(function() {

    $(".a-ball-color").on('click', function(ev) {
        ev.prventDefault;

        var game = new Game(context);
        var playerName = domManipulator.getPlayerName();
        var player = localStorage
        var strokeCounter = 1
        var playerClub = new Club(context, game.ball);
        game.ball.color = ev.currentTarget.id;

        // session storage
        player.setItem('name', playerName) //sets player name to a session

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
            game.hole.draw();
            game.ball.draw();
            game.ball.holeCheck(game.hole)
            game.bumpers.forEach(function(bumper) { bumper.draw();})
            if(game.ball.moving) {
                game.ball.move(game.bumpers)
            }
            if(game.ball.inHole){
              requestAnimationFrame(endLevel);
            }
            requestAnimationFrame(gameLoop);
          };

          function endLevel() {
            // increment score
            // display score
            if(game.currentLevel.number < game.lastLevel) {
              game.updateLevel();
              requestAnimationFrame(gameLoop);
            } else {
              requestAnimationFrame(endGame);
            }
          }

          function endGame() {
            //
          }

        canvas.addEventListener('mousedown', function(event) {
            var that = this
            var mousePos = playerClub.getMousePosition(that, event)
            moveBall(mousePos)
            if(game.ball.inHole === false) {
                var stroke = strokeCounter++
                    domManipulator.insertStroke(stroke);
                    // possobly store the stroke count in a player session
            }
            console.log(mousePos)
        }
    , false)

function moveBall(mousePos) {
    game.ball.moving = true
}
    })
})

module.exports = Ball
