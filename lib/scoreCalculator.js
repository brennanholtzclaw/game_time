module.exports = function(game, stroke, par) {
    if(game.gameOver === false){
       var score = stroke - par
       game.playerScore = game.playerScore + score
    }
       return score
}

