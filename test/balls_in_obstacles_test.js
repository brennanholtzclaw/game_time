var chai = require('chai')
var assert = chai.assert;
var sinon = require('sinon');
var Ball = require("../lib/ball")
var Bumper = require("../lib/bumper")

describe('Collisions checks', function(){
  it("returns true if ball and bumper overlap", function(){
    var sand = new Bumper({minX: 0, minY: 0, maxX: 1, maxY: 1, type: "sand"})
    var collidingBall = new Ball({x:0, y: 0})

    assert.isOk(collidingBall.isCollidingWith(sand))
  })

  it("returns false if ball and bumper don't overlap", function(){
    var sand = new Bumper({minX: 0, minY: 0, maxX: 10, maxY: 10, type: "sand"})
    var noncollidingBall = new Ball({x:20, y: 20, radius: 3})

    assert.isNotOk(noncollidingBall.isCollidingWith(sand))
  })

  it("in sand hits the slows down function", function(){
    var sand = new Bumper({minX: 0, minY: 0, maxX: 10, maxY: 10, type: "sand"})
    var ball = new Ball({x:0, y: 0, radius:3})

    var spy = sinon.spy(ball, "slowDownAgainst")
    ball.collisionCheck([sand])

    assert(spy.calledOnce, "slowDownAgainst method was not called on ball")
    assert(spy.calledWith(sand), 'slowDownAgainst was called with unexpected arguments')
  })

  xit("in sand the ball slows down", function() {
    var ball = new Ball({x:2, y: 2, radius: 3}) // ball not in sand
    var obstacles = []
    var sand = new Bumper({minX: 0, minY: 0, maxX: 1, maxY: 1, type: "sand"})
    obstacles << sand

    ball.collisionCheck([obstacles])
    var XSpeed = ball.xSpeed
    var YSpeed = ball.ySpeed

    ball.x = 0
    ball.y = 0 // move ball in sand

    ball.collisionCheck([obstacles])
    var sandXSpeed = ball.xSpeed
    var sandYSpeed = ball.ySpeed

    assert.isAbove(XSpeed, sandXSpeed, "x speed on grass is greater than speed on sand")
    assert.isAbove(YSpeed, sandYSpeed, "y speed on grass is greater than speed on sand")
  })

  xit("should have a different direction after a bounce", function(){
    // var bumper = new Bumper({minX:})
    var ball = new Ball(0, 0, 4); // ball starting at 0, 0, and radius of 4

    assert.equal(ball.xDirection, 1);
    assert.equal(ball.yDirection, 1);

    ball.collisionCheck([bumper]);

    assert.equal(ball.xDirection, 1);
    assert.equal(ball.yDirection, -1);
  })
})
