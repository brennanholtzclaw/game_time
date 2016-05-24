var chai = require('chai')
var assert = chai.assert;
var sinon = require('sinon');
var Level = require('../lib/level');
var Hole = require('../lib/hole');
var Ball = require('../lib/ball');
var Bumper = require('../lib/bumper');

describe("Level", function(){
  context("with assigned attributes", function(){
    var level = new Level(0);

    it("should have a level number", function(){
      assert.equal(level.number, 0);
    })
  })

  it("assigns other attributes from external level definitions", function(){
    var level = new Level(0);

    assert.equal(level.par, 10)
    assert.instanceOf(level.hole, Hole)
    assert.equal(level.hole.x, 10)
    assert.equal(level.hole.y, 10)
    assert.equal(level.ball.x, 1)
    assert.instanceOf(level.ball, Ball)
    assert.instanceOf(level.bumpers[0], Bumper)
  })
})
