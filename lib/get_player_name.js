var $ = require('./jquery')

var getPlayerName = function() {
    $("#welcome-card").hide();
    var playerName = $("#player-name").val();
    return playerName
}

module.exports = getPlayerName;

