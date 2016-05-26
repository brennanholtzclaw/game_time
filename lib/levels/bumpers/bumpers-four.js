var Bumper = require('../../bumper')

var bumpersFour = [
  {minX: 50, minY: 50, maxX: 660, maxY: 60, type: "bumper"},
  {minX: 50, minY: 550, maxX: 650, maxY: 560, type: "bumper"},
  {minX: 50, minY: 50, maxX: 60, maxY: 550, type: "bumper"},
  {minX: 650, minY: 50, maxX: 660, maxY: 560, type: "bumper"},
  {minX: 300, minY: 250, maxX: 650, maxY: 350, type: "water"},
  {minX: 300, minY: 350, maxX: 650, maxY: 370, type: "sand"},
  {minX: 300, minY: 230, maxX: 650, maxY: 250, type: "sand"},
  {minX: 60, minY: 250, maxX: 250, maxY: 350, type: "water"},
  {minX: 60, minY: 230, maxX: 250, maxY: 250, type: "sand"},
  {minX: 60, minY: 350, maxX: 250, maxY: 370, type: "sand"},
  {minX: 250, minY: 230, maxX: 300, maxY: 370, type: "bridge"},
  ]

module.exports = bumpersFour;

