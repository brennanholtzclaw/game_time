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

  it("returns true on a corner of a bumper", function (){
    // ball and bumper only have a shared corner at 2,2 with no other overlap
    var sand = new Bumper({minX: 2, minY: 2, maxX: 4, maxY: 4, type: "sand"})
    var collidingBall = new Ball({x:1, y: 1, radius: 1})

    assert.isOk(collidingBall.isCollidingWith(sand))
  })


  it("in sand the ball slows down", function() {
    var sand = new Bumper({minX: 0, minY: 0, maxX: 3, maxY: 3, type: "sand"})
    var ball = new Ball({x:10, y: 10, radius: 3}) // ball not in sand

    ball.collisionCheck([sand])
    var XSpeed = ball.xSpeed
    var YSpeed = ball.ySpeed

    ball.x = 1
    ball.y = 1 // move ball in sand

    ball.collisionCheck([sand])

    var sandXSpeed = ball.xSpeed
    var sandYSpeed = ball.ySpeed

    assert.isAbove(XSpeed, sandXSpeed, "x speed on grass is greater than speed on sand")
    assert.isAbove(YSpeed, sandYSpeed, "y speed on grass is greater than speed on sand")
  })

  it("should have a different x direction after a horizontal bounce", function(){
    var ball = new Ball({x:5, y: 5, radius: 2}) //already on Bumper
    var bumper = new Bumper({minX: 5, minY: 0, maxX: 10, maxY: 10, type: "bumper"})

    assert.equal(ball.xDirection, 1);
    assert.equal(ball.yDirection, 1);

    ball.collisionCheck([bumper]);

    assert.equal(ball.xDirection, -1);
    assert.equal(ball.yDirection, 1);
  })

  it("should have a different y direction after a vertical bounce", function(){
    var ball = new Ball({x:5, y: 5, radius: 2}) //already on Bumper
    var bumper = new Bumper({minX: 0, minY: 5, maxX: 10, maxY: 10, type: "bumper"})

    assert.equal(ball.xDirection, 1);
    assert.equal(ball.yDirection, 1);

    ball.collisionCheck([bumper]);

    assert.equal(ball.xDirection, 1);
    assert.equal(ball.yDirection, -1);
  })


  it("in sand triggers the adjust speed function with proper speed adjustment", sinon.test(function(){
    var sand = new Bumper({minX: 0, minY: 0, maxX: 10, maxY: 10, type: "sand"})
    var ball = new Ball({x:3, y: 3, radius:3})

    var spy = sinon.spy(ball, "adjustSpeed")
    ball.collisionCheck([sand])

    assert(spy.calledOnce, "adjustSpeed method was not called on ball")
    assert(spy.calledWith(0.8), 'adjustSpeed was called with unexpected arguments')
  }))

  it("hitting a bumper triggers the adjust speed function with proper speed adjustment", sinon.test(function(){
    var bumper = new Bumper({minX: 0, minY: 0, maxX: 10, maxY: 10, type: "bumper"})
    var ball = new Ball({x:3, y: 3, radius:3})

    var spy = sinon.spy(ball, "adjustSpeed")
    ball.collisionCheck([bumper])

    assert(spy.calledOnce, "adjustSpeed method was not called on ball")
    assert(spy.calledWith(0.9), 'adjustSpeed was called with unexpected arguments')
  }))
})
