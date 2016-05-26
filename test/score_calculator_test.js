var chai = require('chai')
var assert = chai.assert;
var sinon = require('sinon');
var scoreCalculator = require('../lib/scoreCalculator');
var Game = require('../lib/game');

describe('scoreCalculator', function() {
    context('scoring level', function() {
        var par = 2
        var strokes = 4
        var score = scoreCalculator.level(strokes, par);

        it("should subtract stroke from par", function() {
            assert.equal(score, 2)
        });
    });

    context('scoring totals', function() {
        var game = new Game
        game.playerScore = 4
        var score = 4
        var total = scoreCalculator.total(game, score);

        it('should add player score to score', function() {
            assert.equal(game.playerScore, 8)
        })
    })
});
