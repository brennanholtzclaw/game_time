var chai = require('chai')
var assert = chai.assert;
var sinon = require('sinon');
var Ball = require("../lib/ball")
var Hole = require("../lib/hole")
var Club = require("../lib/club")

describe("The club", function(){
  it("should know its positive slope to the ball", function(){
    var coords = {x:5, y:5, radius:5}
    var ball = new Ball(coords)
    var club = new Club(0, ball, 1, 1);

    assert.equal(club.clubToBallSlope({x: 1, y: 1}).bothSlope, 1)
  });

  it("should know its negative slope to the ball", function(){
    var coords = {x:5, y:5, radius:5}
    var ball = new Ball(coords)
    var club = new Club(0, ball, 10, 10);
    var slope = club.clubToBallSlope({x: 0, y: 10}).bothSlope

    assert.equal(slope, -1)
  });

  it("should calculate speed based on slope", function(){
    var coords = {x:5, y:5, radius:5}
    var ball = new Ball(coords)
    var club = new Club(0, ball, 10, 10);
    club.speedCheck(1, 1, 10)

    assert.equal(club.golfBall.xSpeed, 0.02)
    assert.equal(club.golfBall.ySpeed, 0.02)
  });
});

describe("The ball relative to the club", function(){
  context("when it's close or far", function(){
    it("should move less or more", function(){
      var coords = {x:5, y:5, radius:5}
      var ball = new Ball(coords)
      var club = new Club(0, ball, 10, 10);

      club.speedCheck(1, 1, 10) //small distance
      var smallSpeed = ball.xSpeed

      club.speedCheck(1, 1, 100)
      var largeSpeed = ball.xSpeed

      assert.isAbove(largeSpeed, smallSpeed)
    });
  });
});
