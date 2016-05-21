var $ = require('./jquery')

var getPlayerName = function() {
    $("#welcome-card").fadeOut();
    var playerName = $("#player-name").val();
    return playerName
}

module.exports = getPlayerName;

