var chai = require('chai')
var assert = chai.assert;
var sinon = require('sinon');
var Ball = require("../lib/ball")
var Bumper = require("../lib/bumper")

describe("Ball interactions", sinon.test(function() {
  context("in sand", function() {
    var sand = new Bumper({minX: 0, minY: 0, maxX: 10, maxY: 10, type: "sand"})
    var ball = new Ball({x:0, y: 0})

    var spy = sinon.spy(ball, "slowDownAgainst")
    ball.collisionCheck([sand])

    assert(spy.calledOnce, "slowDownAgainst method was not called on ball")
    assert(spy.calledWith(sand), 'slowDownAgainst was called with unexpected arguments')
  })
}))
