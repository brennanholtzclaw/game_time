var $ = require('./jquery');
var $playerName = $('#player-name');
var $welcomeCard = $('#welcome-card');
var $scoreCard = $('#score-card');
var $scoreTable = $('#score-table');

var domManipulator = {

    getPlayerName() {
        $welcomeCard.fadeOut();
        var playerName = $playerName.val();
        return playerName
    },

    showScoreCard() {
        $scoreCard.show('slow');
    },

    insertStroke(stroke) {
        $('#stroke1').text(stroke)
    },

    insertTableData(level, par, score) {
        $scoreTable.append('<tr><td>' + level + '</td><td>' + par + '</td><td>0</td>' + '<td>' + score + '</td></tr>')
    }
}

module.exports = domManipulator
