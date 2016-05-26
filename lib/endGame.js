var domManipulator = require('./dom-manipulator');
var calculateScore = require('./scoreCalculator');

module.exports = function(context, game, strokeCounter) {
  if(game.ball.inHole) {
    var score = calculateScore.level(strokeCounter, game.par);
    calculateScore.total(game, score)
    domManipulator.insertScore(game.currentLevel.number, score);
    domManipulator.endGame(game.playerScore);
    game.gameOver = true
    game.ball.inHole = false
  }
}
