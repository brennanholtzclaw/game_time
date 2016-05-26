var endGame = require("./endGame");
var transitionToNextLevel = require("./transitionLevel");

module.exports = function(context, game, strokeCounter, playerClub, ballColor) {
    if(game.currentLevel.number < game.lastLevel) {
        transitionToNextLevel(context, game, strokeCounter, ballColor)
        playerClub.golfBall = game.currentLevel.ball;
        game.ball.color = ballColor;
    } else {
        endGame(context, game, strokeCounter)
    }
}
