var chai = require('chai')
var assert = chai.assert;
// var sinon = require('sinon');
var Bumper = require("../lib/bumper")

describe("Bumper", function(){
  context("with assigned attributes", function(){
    var bumper = new Bumper({minX: 0, minY:0, maxX:10, maxY:10})

    it("should have an x min position", function(){
      assert.equal(bumper.minX, 0)
    })

    it("should have a y min position", function(){
      assert.equal(bumper.minY, 0)
    })

    it("should have an x max position", function(){
      assert.equal(bumper.maxX, 10)
    })

    it("should have a y max position", function(){
      assert.equal(bumper.maxY, 10)
    })

    it("should have a default color of white", function(){
      assert.equal(bumper.color, "white")
    });

    it("can have a type of sand", function() {
      var sand = new Bumper({minX: 0, minY:0, maxX:10, maxY:10, type:"sand"})

      assert.equal(sand.type, "sand")
    })

    it("can have a type of bumper", function() {
      var bumper = new Bumper({minX: 0, minY:0, maxX:10, maxY:10, type:"bumper"})

      assert.equal(bumper.type, "bumper")
    })
  });
});
