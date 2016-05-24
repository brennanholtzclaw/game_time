var $ = require('./jquery');
var $playerName = $('#player-name');
var $welcomeCard = $('#welcome-card');
var $scoreCard = $('#score-card');
var $scoreTable = $('#score-table');
var $finishedHoleCard = $('#finished-hole-card');
var $strokeToPar = $('#stroke-to-par');
var $totalScore = $('#total-score');

var domManipulator = {

    getPlayerName() {
        $welcomeCard.fadeOut();
        var playerName = $playerName.val();
        return playerName
    },

    showScoreCard() {
        $scoreCard.show('slow');
    },

    insertStroke(level, stroke) {
        $('#stroke' + level).text(stroke);
    },

    insertScore(level, score) {
        $('#score' + level).text(score);
    },

    insertTableData(level, par, score) {
        $scoreTable.append('<tr><td>' + level + '</td><td>' + par + '</td><td id=stroke' + level + '>0</td><td id=score' + level + '>' + score + '</td></tr>');
    },

    showFinishedHoleCard(par, score) {
        $finishedHoleCard.show('slow');
        if(par > score) {
            var number = par - score;
            if(number > 1) {
               $strokeToPar.text('You were ' + number + ' strokes under par!');
            } else {
               $strokeToPar.text('You were ' + number + ' stroke under par!');
            }
        } else if(par < score) {
            var number = score - par;
            if(number > 1) {
                $strokeToPar.text('You were ' + number + ' strokes over par');
            } else {
                $strokeToPar.text('You were ' + number + ' stroke over par');
            }
        } else {
            $strokeToPar.text('You made par!');
        }
        $totalScore.text('Your score is ' + score + ' !')
        $finishedHoleCard.fadeOut(3000, function() {
            this.hide();
        });
    }
}

module.exports = domManipulator
