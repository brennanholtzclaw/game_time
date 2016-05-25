var domManipulator = require('./dom-manipulator');
var calculateScore = require('./scoreCalculator');

module.exports = function(context, game, strokeCounter) {
    var score = calculateScore.levelScore(strokeCounter, game.par);
    domManipulator.insertScore(game.currentLevel.number, score);
    totalScore = calculateScore.totalScore(score);
    domManipulator.endGame(totalScore);
}
