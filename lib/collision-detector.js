var collisionDetector = function(game) {
  return game
}



// collisionDetector.prototype.bounceCheck = function() {
//   debugger;
//   game.bumpers.forEach(function (bumper) {
//     if ((ball.y + ball.radius >= bumper.minY && ball.y - ball.radius <= bumper.maxY) && (ball.x + ball.radius >= bumper.minX && ball.x - ball.radius <= bumper.maxX) ) {
//
//       var prevX = ball.x - ball.xSpeed * ball.xDirection;
//       var prevY = ball.y - ball.ySpeed * ball.yDirection;
//
//       if (ball.changeXDirection(bumper.minX, bumper.maxX, prevX, ball)){
//         ball.xDirection *= -1;
//       }
//       if (ball.changeYDirection(bumper.minY, bumper.maxY, prevY, ball)){
//         ball.yDirection *= -1;
//       }
//       ball.xSpeed *= 0.8;
//       ball.ySpeed *= 0.8;
//     }
//   }, ball);
//   return game;
// }

module.exports = collisionDetector;
