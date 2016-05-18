var chai = require('chai');
var assert = chai.assert;

var Ball = require('../lib/ball');

describe('Ball', function(){
  context('it should move twice', function(){
    it('should increase x by two', function(){
      var ball = new Ball(2, 2, 5)

      assert.equal(ball.x, 2);
      assert.equal(ball.y, 2);

      ball.move();

      assert.equal(ball.x, 5);
      assert.equal(ball.y, 5);
    })
  })
})
