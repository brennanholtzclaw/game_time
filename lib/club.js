var Club = function(context, ball, x, y) {
  this.context = context
  this.golfBall = ball
  this.x = x || null
  this.y = y || null
}

Club.prototype.getMousePosition = function(that, event) {
  var rec = that.getBoundingClientRect();

  this.clubToBallSlope({x: event.clientX - rec.left,
                        y: event.clientY - rec.top
                      });

  if(this.x && this.y) {
    return {
        x: this.x - rec.left,
        y: this.y - rec.top}
   } else {
      return { x: event.clientX - rec.left,
               y: event.clientY - rec.top
              }
      };
}

Club.prototype.clubToBallSlope = function(input) {
  var ballX = this.golfBall.x
  var ballY = this.golfBall.y

  var clubX = input.x
  var clubY = input.y

  var rise = clubY - ballY;
  var run = clubX - ballX

  var slope = rise / run

  console.log({cbX: clubX, cbY: clubY, blX: ballX, blY: ballY, slp: slope})
  var ballXSpeed = run * -1
  var ballYSpeed = rise * -1

  var squareOfXs = Math.pow((clubX - ballX), 2)
  var squareOfYs = Math.pow((clubY - ballY), 2)
  var clubDistance = Math.sqrt(squareOfXs + squareOfYs)

  this.speedCheck(ballXSpeed, ballYSpeed, clubDistance)

  return {bothSlope: slope}
};

Club.prototype.speedCheck = function(ballXSpeed, ballYSpeed, clubDistance){
  var ballXSpeed = ballXSpeed * (clubDistance / 500);
  var ballYSpeed = ballYSpeed * (clubDistance / 500);

  if (ballXSpeed > 10) {
    ballXSpeed = 10;
  }
  else if (ballXSpeed < -10) {
    ballXSpeed = -10;
  }
  if (ballYSpeed > 10) {
    ballYSpeed = 10;
  }
  else if (ballYSpeed < -10) {
    ballYSpeed = -10;
  }

  this.golfBall.xSpeed = ballXSpeed
  this.golfBall.ySpeed = ballYSpeed
};

module.exports = Club;
