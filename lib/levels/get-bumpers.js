var bumpersOne = require('./bumpers/bumpers-one');
var Bumper = require('../bumper')
var bumpers = {
  1: bumpersOne
};

var GetBumpers = function(level, context, color) {
  debugger;
  return bumpers[level].map(function(bumper){
    debugger;
    new Bumper({coords: bumper, context: context, color: color })
  });
}

module.exports = GetBumpers;
