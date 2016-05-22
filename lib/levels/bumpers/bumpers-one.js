var Bumper = require('../../bumper')

var bumpersOne = [{minX: 50, minY: 50, maxX: 250, maxY: 60},
  {minX: 50, minY: 450, maxX: 250, maxY: 460},
  {minX: 50, minY: 50, maxX: 60, maxY: 450},
  {minX: 250, minY: 50, maxX: 260, maxY: 460},
  {minX: 150, minY: 170, maxX: 155, maxY: 220, color: "blue"}
  ]
  // new Bumper(50, 450, 250, 460, context),
  // new Bumper(50, 50, 60, 450, context),
  // new Bumper(250, 50, 260, 460, context),
  // new Bumper(150, 170, 155, 220, "blue", context)

module.exports = bumpersOne;
