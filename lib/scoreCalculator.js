var scoreCalculator = {
    level(stroke, par){
        var score = stroke - par
        return score
    },

    total(game, score) {
        game.playerScore = game.playerScore + score
    }
}

module.exports = scoreCalculator;
