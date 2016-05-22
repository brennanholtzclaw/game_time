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

    insertStroke(stroke) {
        $('#stroke1').text(stroke)
    },

    showScoreCard() {
        $scoreCard.toggleClass('show');
    }



}

module.exports = domManipulator
