var Ball = require('../ball');

var ball = {
  1: {x: 100, y: 400, radius: 6},
  2: {x: 150, y: 100, radius: 6},
};

var GetBall = function(level, context) {
  return new Ball(ball[level], context);
}

module.exports = GetBall;
