require('coffee-script')
require('coffee-script/register')

var MockRobot = require('../'),
    robotCtx = new MockRobot(),
    expect = require('chai').expect

//Calls brain.set
var testScript = require('./testscripts/braintest.coffee')(robotCtx)
    
describe('Mock should capture brain interactions',function() {
  it('Sets the testkey and value',function() {
    expect(robotCtx.brain.get('TestKey')).to.be.equal('TestValue')
  })
})