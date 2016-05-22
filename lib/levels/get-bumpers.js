var bumpersOne = require('./bumpers/bumpers-one');
var Bumper = require('../bumper')
var bumpers = {
  1: bumpersOne
};

var GetBumpers = function(level, context, color) {
  return bumpers[level].map(function(coords){
    debugger;
    var bumper = new Bumper(coords);
    bumper.context = context;
    return bumper;
  });
}

module.exports = GetBumpers;
