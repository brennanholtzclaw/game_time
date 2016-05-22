var chai = require('chai')
var assert = chai.assert;
var sinon = require('sinon');
var Ball = require("../lib/ball")
var Hole = require("../lib/hole")
var Club = require("../lib/club")

describe("The club should know locations", function(){
  it("should know it's positive slope to the ball", function(){
    var ball = new Ball(5,5,5);
    var club = new Club(0, ball, 1, 1);

    assert.equal(club.clubToBallSlope({x: 1, y: 1}).bothSlope, 1)
  });

  it("should know it's negative slope to the ball", function(){
    var ball = new Ball(5,5,5);
    var club = new Club(0, ball, 10, 10);
    var slope = club.clubToBallSlope({x: 0, y: 10}).bothSlope

    assert.equal(slope, -1)
  });

  it("should calculate speed based on slope", function(){
    var ball = new Ball(5,5,5);
    var club = new Club(0, ball, 10, 10);
    club.speedCheck(1, 1, 1, 1, 10, 11, 11, 1)

    assert.equal(club.golfBall.xSpeed, 0.02)
    assert.equal(club.golfBall.ySpeed, 0.02)
  });
});

// describe("The ball should move slower when club is close", function(){
//   context("club is 100 units away", function(){
//     xit("should ony move a few units", function(){
//
//     });
//   });
// });
