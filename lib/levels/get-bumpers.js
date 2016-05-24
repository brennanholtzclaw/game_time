var bumpersOne = require('./bumpers/bumpers-one');
var bumpersTest = require('./bumpers/bumpers-test');
var bumpersTwo = require('./bumpers/bumpers-two');
var bumpersThree = require('./bumpers/bumpers-three');

var Bumper = require('../bumper')
var bumpers = {
  0: bumpersTest,
  1: bumpersOne,
  2: bumpersTwo,
  3: bumpersThree,
};

var GetBumpers = function(level, context, color) {
  return bumpers[level].map(function(coords){
    var bumper = new Bumper(coords);
    bumper.context = context;
    return bumper;
  });
}

module.exports = GetBumpers;
