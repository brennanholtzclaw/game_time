var chai = require('chai')
var assert = chai.assert;
var sinon = require('sinon');
var Ball = require("../lib/ball")
var Club = require("../lib/club")

describe('Checking ball direction', function(){
  it("goes in the right direction", function(){
    var clubX = 1
    var clubY = 1
    var ballX = 5
    var ballY = 5

    var ball = new Ball({x: ballX, y: ballY, radius: 6})
    var club = new Club(0, ball, clubX, clubY);
    var slopeDeets = club.clubToBallSlope({x: clubX, y: clubY});
    assert(slopeDeets.bothSlope > 0, 'the slope is ' + slopeDeets.bothSlope);
    assert(ball.xSpeed > 0, 'xSpeed less than zero')
  })

  it("direction reverts to positive after stop", function(){
    var clubX = 1
    var clubY = 1
    var ballX = 5
    var ballY = 5

    var ball = new Ball({x: ballX, y: ballY, radius: 6})
    var club = new Club(0, ball, clubX, clubY);

    ball.xSpeed = -.01
    ball.ySpeed = -.01

    ball.move()
    // at the end of the move function the ball should encounter stopCheck which should flip direction back to positive

    assert(ball.xSpeed > 0, "ball x speed less than 0")
    assert(ball.ySpeed > 0, "ball y speed less than 0")
  })
})
