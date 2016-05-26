var $ = require('./jquery')
var canvas = document.getElementById('puts-puts-golf');
var context = canvas.getContext('2d');
var Hole = require('./hole')
var Ball = require("./ball");
var Bumper = require("./bumper");
var domManipulator = require("./dom-manipulator");
var Game = require("./game");
var Club = require("./club")
var endLevel = require('./endLevel');

$('.instruction-link').on('click', function(ev) {
    $('#instruction-section').toggle();
});

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
      domManipulator.insertPlayerName(player.getItem('name'))

      domManipulator.showScoreCard()

      requestAnimationFrame(startLoop);

      function startLoop() {
        game = new Game(context);
        totalScore = 0
        strokeCounter = 0
        playerClub = new Club(context, game.ball);
        game.ball.color = ballColor
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
          endLevel(context, game, strokeCounter, playerClub, ballColor)
          strokeCounter = 0
        }
        requestAnimationFrame(gameLoop);
      };

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
          ev.preventDefault;
          $('#end-game-card').hide();
          domManipulator.reset();
          requestAnimationFrame(startLoop);
      });


  })
})

module.exports = Ball
