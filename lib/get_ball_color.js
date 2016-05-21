var $ = require('./jquery')


var getBallColor = function() {
    var ballColor = $("ball-color").val();
    return ballColor || 'white'
}

module.exports = getBallColor;
