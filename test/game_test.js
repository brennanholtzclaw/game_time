var chai = require('chai')
var assert = chai.assert;
var sinon = require('sinon');
var Game = require('../lib/game')
var Level = require('../lib/level');

describe("Game", function(){
  context("with assigned attributes", function(){
    var game = new Game;

    it("defaults to level 1", function(){
      console.log(game)
      assert.equal(game.currentLevel.number, 1)
    })

    xit("can update its level to another level", function(){
      game.updateLevel(0)

      assert.equal(game.currentLevel.number, 0)
    })

    xit("can update its level attributes to another level's", function(){
      var level = new Level(0);

      assert.notEqual(game.currentLevel.ball.x, level.ball.x)

      game.updateLevel(1)

      assert.equal(game.currentLevel.ball.x, level.ball.x)
      assert.equal(game.currentLevel.par, level.par)
    })
  })
})
