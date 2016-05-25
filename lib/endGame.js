var domManipulator = require('./dom-manipulator');
var calculateScore = require('./scoreCalculator');

module.exports = function(context, game, strokeCounter) {
    if(game.ball.inHole) {
        var score = calculateScore.levelScore(strokeCounter, game.par);
        domManipulator.insertScore(game.currentLevel.number, score);
        var totalScore = calculateScore.totalScore(score);
        domManipulator.endGame(totalScore);
    }
}
