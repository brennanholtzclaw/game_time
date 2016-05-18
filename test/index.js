// require ball js file

//= require ../lib/index.js

describe('ball', function() {

  it('should move each game loop', function() {
    var canvas = function(){
      x = 10,
      y = 10
    }
    var ball = new Ball(25, 25, 5)

    assert(ball.x == 5)
    assert(ball.y == 5)

    for(i=0;i<ball.x;i++) {
      ball.move();
    };

    assert(ball.x == 20)
    assert(ball.y == 20)
  });
});
