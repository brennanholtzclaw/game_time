const chai = require('chai');
const assert = chai.assert;
const Ball = require("../lib/ball");
const sinon = require('sinon');
const Hole = require("../lib/hole")

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
    ball.xSpeed = 4;
    ball.ySpeed = 4;
    ball.xDirection = 1;
    ball.yDirection = 1;
    sinon.stub(Ball.prototype, "bounceCheck");

    assert.equal(ball.x, 0)
    assert.equal(ball.y, 0)

    ball.move();

    assert.equal(ball.x, 4)
    assert.equal(ball.y, 4)

    ball.xDirection = -1;
    ball.yDirection = 1;
    ball.xSpeed = 2;
    ball.ySpeed = 2;

    ball.move();

    assert.equal(ball.x, 2)
    assert.equal(ball.y, 6)
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

describe("checking if it collides with puttHole", function(){
  it("should stop moving when on the same coords as the hole", function(){
    var ball = new Ball(0, 0, 4);
    var puttHole = new Hole(0, 0);

    ball.moving = true;
    assert.isOk(ball.moving);

    ball.holeCheck(puttHole);
    assert.notOk(ball.moving);
  })

  it("should stop moving when it's within its radius of the hole", function(){
    var ball = new Ball(0, 0, 4);
    var puttHole = new Hole(ball.radius, ball.radius);

    ball.moving = true;
    assert.isOk(ball.moving);

    ball.holeCheck(puttHole);
    assert.notOk(ball.moving);
  })
})
