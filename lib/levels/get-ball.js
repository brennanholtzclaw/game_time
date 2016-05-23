var Ball = require('../ball');

let ball = {
  1: [100, 400, 6],
};

let GetBall = function(level, context) {
  return new Ball(ball[level][0], ball[level][1], ball[level][2], context);
}

module.exports = GetBall;
