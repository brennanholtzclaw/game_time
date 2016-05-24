var getPar = require('./levels/get-par')
var getBumpers = require('./levels/get-bumpers')
var getHole = require('./levels/get-hole')
var getBall = require('./levels/get-ball')

var Level = function(levelNum, context) {
  return {
    number: levelNum,
    par: getPar(levelNum),
    bumpers: getBumpers(levelNum, context),
    hole: getHole(levelNum, context),
    ball: getBall(levelNum, context)
  }
}

module.exports = Level;
