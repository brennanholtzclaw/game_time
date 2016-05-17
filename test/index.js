// require ball js file

describe('ball', function() {

  it('should move each game loop', function() {
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
