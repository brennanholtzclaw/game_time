var Ball = require('../ball');

let ball = {
  "test": {x: 1, y: 1, radius: 5},
  1: {x: 100, y: 400, radius: 6},
};

let GetBall = function(level, context) {
  return new Ball(ball[level], context);
}

module.exports = GetBall;
