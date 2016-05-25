var $ = require('./jquery');

var calculateScore = {

    levelScore(stroke, par) {
        return stroke - par
    },

    totalScore(score) {
        var levelOneScore = document.getElementById('score1').innerHTML;
        var levelTwoScore = document.getElementById('score2').innerHTML;
        return parseInt(levelOneScore) + parseInt(levelTwoScore) + score
    }
}

module.exports = calculateScore
