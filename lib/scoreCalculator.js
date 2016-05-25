var $ = require('./jquery');

var calculateScore = {

    levelScore(stroke, par) {
        return stroke - par
    },

    totalScore() {
        var levelOneScore = document.getElementById('score1').innerHtml;
        //var levelTwoScore = document.getElementById('score2').innerHtml;
        //var levelThreeScore = document.getElementById('score3').innerHtml;
        //return (levelOneScore + levelTwoScore + levelThreeScore)
        return levelOneScore
    }
}

module.exports = calculateScore
