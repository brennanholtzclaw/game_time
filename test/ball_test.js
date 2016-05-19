const chai = require('chai')
const assert = chai.assert;
const sinon = require('sinon');
const Ball = require("../lib/ball")

describe("Ball", function(){
  context("with assigned attributes", function(){
    var ball = new Ball(2, 2, 10)

    it("should have an x position", function(){
      assert.equal(ball.x, 2)
    })

    it("should have a y position", function(){
      assert.equal(ball.y, 2)
    })

    it("should have a radius", function(){
      assert.equal(ball.radius, 10)
    })

    it("should not be moving", function(){
      assert.equal(ball.moving, false)
    })
  })
})

describe("move()", function(){
  it("should increase its x and y with no bounce", function(){
    var ball = new Ball(0, 0, 10)
    ball.speed = 1;
    ball.xDirection = 1;
    ball.yDirection = 1;
    sinon.stub(Ball.prototype, "bounceCheck");

    assert.equal(ball.x, 0)
    assert.equal(ball.y, 0)

    ball.move();

    assert.equal(ball.x, 1)
    assert.equal(ball.y, 1)

    ball.xDirection = -1;
    ball.yDirection = 1;

    ball.move();

    assert.equal(ball.x, 0)
    assert.equal(ball.y, 2)
  });

  xit("should have a different direction after a bounce check", function(){
    var obstacleCoords =[[0,0,3,3]]; //a square 3 x 3, starting at 0,0

    var ball = new Ball(0, 0, 4); // ball starting at 0, 1, and radius of 4

    assert.equal(ball.xDirection, 1);
    assert.equal(ball.yDirection, 1);

    ball.bounceCheck();

    assert.equal(ball.xDirection, 1);
    assert.equal(ball.yDirection, -1);

  })
});
