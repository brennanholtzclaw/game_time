function endLevel(game) {
    var currentLevel = game.currentLevel.number
    var currentPar = game.currentLevel.par
    var score = calculateScore(currentPar, strokeCounter)

    if(game.currentLevel.number < game.lastLevel) {
        game.updateLevel(context);
        var nextLevel = game.currentLevel.number
        var nextPar = game.currentLevel.par
        strokeCounter = 0
        domManipulator.transitionLevel(currentLevel, currentPar, nextLevel, nextPar, score)
        requestAnimationFrame(gameLoop);
    } else {
        requestAnimationFrame(endGame);
    }
}

module.exports = endLevel
