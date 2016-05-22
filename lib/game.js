var Level = require('./level')

function Game(context) {
  this.currentLevel = new Level(1, context);
  this.lastLevel = 3;
  this.hole = this.currentLevel.hole;
  this.ball = this.currentLevel.ball;
  this.bumpers = this.currentLevel.bumpers;
}

// Game.prototype.updateLevel = function(levelNum) {
//   this.currentLevel = new Level(levelNum);
//   this.ball = this.currentLevel.ball;
//   this.hole = this.currentLevel.hole
// }

module.exports = Game;
