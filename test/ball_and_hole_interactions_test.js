var chai = require('chai')
var assert = chai.assert;
// var sinon = require('sinon');
var Ball = require("../lib/ball")
var Hole = require("../lib/hole")

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
