var Hole = require('../hole');

var hole = {
  1: [150, 100],
}

var GetHole = function(level, context) {
  return new Hole(hole[level][0], hole[level][1], context);
}

module.exports = GetHole;