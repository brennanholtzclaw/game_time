var Level = require('./level')

function Game(context) {
  this.currentLevel = new Level(1, context);
  this.lastLevel = 4;
  this.hole = this.currentLevel.hole;
  this.ball = this.currentLevel.ball;
  this.bumpers = this.currentLevel.bumpers;
  this.par = this.currentLevel.par;
  this.playerScore = 0;
  this.gameOver = false;
}

Game.prototype.updateLevel = function(context) {
  var newLevel = this.currentLevel.number += 1;
  this.currentLevel = new Level(newLevel, context);
  this.hole = this.currentLevel.hole;
  this.ball = this.currentLevel.ball;
  this.bumpers = this.currentLevel.bumpers;
  this.par = this.currentLevel.par;
}

module.exports = Game;
