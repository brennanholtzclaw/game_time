const chai = require('chai')
const assert = chai.assert;
const sinon = require('sinon');
const Hole = require("../lib/hole")

describe("Hole", function(){
  context("with assigned attributes", function(){
    var hole = new Hole(0,0);

    it("should have an x coordinate", function(){
      assert.equal(hole.x, 0);
    });

    it("should have a y coordinate", function(){
      assert.equal(hole.y, 0);
    });

    it("has a default radius", function(){
      assert.equal(hole.radius, 10);
    });

    it("has a default color", function(){
      assert.equal(hole.color, "black");
    });
  });
});
