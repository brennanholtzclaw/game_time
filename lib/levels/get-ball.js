var Ball = require('../ball');

var ball = {
  0: {x: 1, y: 1, radius: 5},
  1: {x: 355, y: 400, radius: 6},
  2: {x: 75, y: 440, radius: 6},
  3: {x: 550, y: 500, radius: 6},
  4: {x: 200, y: 500, radius: 6},
};
var GetBall = function(level, context) {
  return new Ball(ball[level], context);
}

module.exports = GetBall;
