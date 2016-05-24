var domManipulator = require("./dom-manipulator")
var calculateScore = require("./scoreCalculator")

module.exports = function(context, game, strokeCounter) {
    var currentLevel = game.currentLevel.number
    var currentPar = game.currentLevel.par
    var score = calculateScore(currentPar, strokeCounter)
    game.updateLevel(context);
    var nextLevel = game.currentLevel.number
    var nextPar = game.currentLevel.par
    domManipulator.transitionLevel(currentLevel, currentPar, nextLevel, nextPar, score)
}
