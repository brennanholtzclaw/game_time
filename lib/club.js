var Club = function(context, ball) {
  this.context = context
  this.golfBall = ball
}

Club.prototype.getMousePosition = function(that, event) {
  var rec = that.getBoundingClientRect();

  this.clubToBallSlope({x: event.clientX - rec.left,
                   y: event.clientY - rec.top
                  });

  return {
      x: event.clientX - rec.left,
      y: event.clientY - rec.top
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

  var ballXSpeed = run * -1
  var ballYSpeed = rise * -1

  var squareOfXs = Math.pow((clubX - ballX), 2)
  var squareOfYs = Math.pow((clubY - ballY), 2)
  var clubDistance = Math.sqrt(squareOfXs + squareOfYs)

  console.warn({mousx: clubX, mousy: clubY, ballx: this.golfBall.x, bally: this.golfBall.y, bothSlope: slope})

  this.speedSet(rise, run, ballXSpeed, ballYSpeed, clubDistance, clubX, clubY, slope)
  // speedCheck(rise, run, ballXSpeed, ballYSpeed, clubDistance, clubX, clubY, slope)
};

Club.prototype.speedCheck = function(rise, run, ballXSpeed, ballYSpeed, clubDistance, clubX, clubY, slope){
console.log({xspeed: ballXSpeed, yspeed: ballYSpeed})
  ballXSpeed = ballXSpeed * (clubDistance / 500);
  ballYSpeed = ballYSpeed * (clubDistance / 500);
console.log({xspeed: ballXSpeed, yspeed: ballYSpeed})
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

  console.warn({xSpeed: this.golfBall.xSpeed, ySpeed: this.golfBall.ySpeed, distance: clubDistance})
};

Club.prototype.speedSet= function(rise, run, ballXSpeed, ballYSpeed, clubDistance, clubX, clubY, slope){
  this.speedCheck(rise, run, ballXSpeed, ballYSpeed, clubDistance, clubX, clubY, slope)
};

module.exports = Club;
