const chai = require('chai')
const assert = chai.assert;
const sinon = require('sinon/pkg/sinon');
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

  context("when moving", function(){
    var ball = new Ball(2, 2, 10)

    xit("should increase its x and y with no bounce", sinon.test(function(){
      ball = Ball.new(0, 0, 10)
      ball.speed = 1;
      ball.xDirection = 1;
      ball.yDirection = 1;

      var noBounce = sinon.stub(Ball, "bounceCheck");
      noBounce.yields(null, this)

      ball.move();
      nobounce.restore();

    }))
  })
})
