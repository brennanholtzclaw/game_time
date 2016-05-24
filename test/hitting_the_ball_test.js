var chai = require('chai')
var assert = chai.assert;
var sinon = require('sinon');
var Ball = require("../lib/ball")
var Club = require("../lib/club")

// hit the ball once - make sure its where it should be
//
// hit the ball again - same check

describe('Hitting the ball a second time', function(){
  xit("goes in the right direction", function(){
    var clX = 118
    var clY = 309
    var bllX =  119.93382034811994
    var bllY = 380.9117913908383

    var ball = new Ball( bllX,
                        bllY,
                        6)
    var club = new Club(0, ball, clX, clY);
    var slopeDeets = club.clubToBallSlope({x: clX, y: clY});
    assert(slopeDeets.bothSlope > 0, 'the slope is ' + slopeDeets.bothSlope);
    assert(ball.xSpeed < 0, 'xSpeed greater than zero')
    // var slopeDeets = club.clubToBallSlope({x: clX, y: clY});
    // assert(slopeDeets.bothSlope > 0, 'the slope is ' + slopeDeets.bothSlope);
    // assert(ball.xSpeed > 0 && ball.xDirection > 0, 'this direction should be positive');
  })
})
