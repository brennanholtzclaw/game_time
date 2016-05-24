var Level = require('./level')

function Game(context) {
  this.currentLevel = new Level(1, context);
  this.lastLevel = 3;
  this.hole = this.currentLevel.hole;
  this.ball = this.currentLevel.ball;
  this.bumpers = this.currentLevel.bumpers;
}

Game.prototype.updateLevel = function(levelNum) {
  var newLevel = levelNum || this.currentLevel += 1;
  this.currentLevel = new Level(levelNum) || new Level(this.currentLevel.number += 1);
  this.ball = this.currentLevel.ball;
  this.hole = this.currentLevel.hole
  this.bumpers = this.currentLevel.bumpers
  this.par = this.currentLevel.par
}

module.exports = Game;
