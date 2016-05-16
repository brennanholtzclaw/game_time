var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var Block = function(x, y, width, height, context, speed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.context = context;
  this.speed = speed || 0;
}

Block.prototype.draw = function () {
  this.context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Block.prototype.move = function () {
  this.x++;
  return this;
};

var firstBlock = new Block(10, 10, 10, 10, context);
var secondBlock = new Block(10, 30, 10, 10, context);
var thirdBlock = new Block(10, 50, 10, 10, context);
var fourthBlock = new Block(10, 70, 10, 10, context);

var blocks = [firstBlock, secondBlock, thirdBlock, fourthBlock]

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  blocks.forEach( function(block, index){
    block.move().draw()
    // block.draw()
    // block.move()
  });
  requestAnimationFrame(gameLoop);
});

module.exports = Block;

// <script   src="https://code.jquery.com/jquery-2.2.3.min.js"   integrity="sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo="   crossorigin="anonymous"></script>
// var direction = "right"
// function Block(direction, x, y, width, height, context) {
//   this.direction = "right"
//   this.x = x;
//   this.y = y;
//   this.width = width;
//   this.height = height;
//   this.context = context;
// }
// ​
// Block.prototype.draw = function () {
//   this.context.fillRect(this.x, this.y, this.width, this.height);
//   move(this, direction);
//   return this;
// }
// ​
// var canvas = document.getElementById('game');
// var context = canvas.getContext('2d');
// ​
// var firstBlock = new Block(50, 50, 10, 10, context);
// ​
// requestAnimationFrame(function gameLoop() {
//   context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas.
//   firstBlock.draw()
//   requestAnimationFrame(gameLoop);
// });
// ​
// $(document).on('keydown', function(key) {
//   if (key.keyCode === 39) {
//     direction = "right";
//   } else if (key.keyCode === 40) {
//     direction = "up";
//   } else if (key.keyCode === 37) {
//     direction = "left";
//   } else if (key.keyCode === 38) {
//     direction = "down";
//   }
// });
// ​
// var move = function(object, direction) {
//   if (direction === "right") {
//     object.x++;
//   } else if (direction === "left") {
//     object.x--;
//   } else if (direction === "down") {
//     object.y--;
//   } else if (direction === "up") {
//     object.y++;
//   }
// }
