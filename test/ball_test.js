var chai = require('chai')
var assert = chai.assert;
var sinon = require('sinon');
var Ball = require("../lib/ball")
var Hole = require("../lib/hole")

describe("Ball", function(){
  context("with assigned attributes", function(){
    var coords = {x:2, y:2, radius:10}
    var ball = new Ball(coords)

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
    var coords = {x:0, y:0, radius:10}
    var ball = new Ball(coords)

    ball.xSpeed = 4;
    ball.ySpeed = 4;
    ball.xDirection = 1;
    ball.yDirection = 1;
    sinon.stub(Ball.prototype, "collisionCheck");

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
})

describe("checking if it collides with puttHole", function(){
  it("should stop moving when on the same coords as the hole", function(){
    var coords = {x:0, y:0, radius:4}
    var ball = new Ball(coords)
    var puttHole = new Hole(0, 0);

    ball.moving = true;
    assert.isOk(ball.moving);

    ball.holeCheck(puttHole);
    assert.notOk(ball.moving);
  })

  it("should stop moving when it's within its radius of the hole", function(){
    var coords = {x:0, y:0, radius:4}
    var ball = new Ball(coords)

    var puttHole = new Hole(ball.radius, ball.radius);

    ball.moving = true;
    assert.isOk(ball.moving);

    ball.holeCheck(puttHole);
    assert.notOk(ball.moving);
  })
})
