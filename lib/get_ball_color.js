var $ = require('./jquery')

var getBallColor = function() {
    var ballColor = $("ball-color").val();
    return ballColor
}

module.exports = getBallColor;
