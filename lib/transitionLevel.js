var domManipulator = require("./dom-manipulator");
var calculateScore = require("./scoreCalculator");

module.exports = function(context, game, strokeCounter, ballColor) {
    var currentLevelNumber = game.currentLevel.number
    var currentPar = game.currentLevel.par
    var score = calculateScore.level(strokeCounter, currentPar)
    calculateScore.total(game, score)
    domManipulator.insertScore(currentLevelNumber, score)
    game.updateLevel(context);
    game.ball.color = ballColor
    var nextLevel = game.currentLevel.number
    var nextPar = game.currentLevel.par
    domManipulator.transitionLevel(currentPar, nextLevel, nextPar, score, strokeCounter)
}
