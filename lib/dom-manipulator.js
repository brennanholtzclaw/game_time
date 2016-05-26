var $ = require('./jquery');
var $playerName = $('#player-name');
var $welcomeCard = $('#welcome-card');
var $scoreCard = $('#score-card');
var $scoreTable = $('#score-table');
var $finishedHoleCard = $('#finished-hole-card');
var $strokeToPar = $('#stroke-to-par');
var $score = $('#level-score');
var $endGameCard = $('#end-game-card');
var $totalScore = $('#total-score');

var domManipulator = {

    getPlayerName() {
        $welcomeCard.fadeOut();
        var playerName = $playerName.val();
        return playerName
    },

    insertPlayerName(name) {
        $('#welcome-player-div').append('<h6 id=welcome-player>Welcome to Puts-Puts ' + name + '</h6>').fadeIn(2000)
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
        $scoreTable.append('<tr class=tableRow><td>' + level + '</td><td>'
                           + par + '</td><td id=stroke'
                           + level + '>0</td><td class=scores id=score'
                           + level + '>0</td></tr>');
    },

    showEndOfLevelCard(par, stroke, score) {
        $finishedHoleCard.show('slow');
        if(par > stroke) {
            var number = par - stroke;
            if(number > 1) {
               $strokeToPar.text('You were ' + number + ' strokes under par!');
            } else {
               $strokeToPar.text('You were ' + number + ' stroke under par!');
            }
        } else if(par < stroke) {
            var number = stroke - par;
            if(number > 1) {
                $strokeToPar.text('You were ' + number + ' strokes over par');
            } else {
                $strokeToPar.text('You were ' + number + ' stroke over par');
            }
        } else {
            $strokeToPar.text('You made par!');
        }
        $score.text('Your score for this hole: ' + score)
        $finishedHoleCard.fadeOut(4000);
    },

    transitionLevel(currentPar, nextLevel, nextLevelPar, score, stroke) {
        this.showEndOfLevelCard(currentPar, stroke, score);
        this.insertTableData(nextLevel, nextLevelPar)
    },

    endGame(totalScore) {
        $endGameCard.show('slow');
        if(totalScore === 1 || totalScore === -1) {
            $totalScore.text(totalScore + ' point');
        } else {
            $totalScore.text(totalScore + ' points');
        }
    },

    reset() {
        $('#end-game-card').hide();
        $('.tableRow').remove();
        $('#stroke1').text(0);
        $('#score1').text(0);
    }
}

module.exports = domManipulator
