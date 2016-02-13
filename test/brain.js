var MockRobot = require("../"),
    robotCtx = new MockRobot(),
    expect = require("chai").expect;

//Calls brain.set
require("./testscripts/braintest.coffee")(robotCtx);
describe("Mock should capture brain interactions",function() {
    it("Sets the testkey and value",function() {
        expect(robotCtx.brain.get("TestKey")).to.be.equal("TestValue");
  });
});