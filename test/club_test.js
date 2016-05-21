var chai = require('chai')
var assert = chai.assert;
var sinon = require('sinon');
var Ball = require("../lib/ball")
var Hole = require("../lib/hole")
var Club = require("../lib/club")

describe("The club should know locations", function(){
  it("should know it's own location, and the ball location", function(){
    var ball = new Ball(5,5,5);
    var club = new Club(1, 1, ball, context);
    sinon.stub(Club.prototype, "clubToBallSlope")

    assert.equal(club.getMousePosition.x, 1)
    assert.equal(club.getMousePosition.y, 1)
  });
});

// describe("The ball should move slower when club is close", function(){
//   context("club is 100 units away", function(){
//     xit("should ony move a few units", function(){
//
//     });
//   });
// });
