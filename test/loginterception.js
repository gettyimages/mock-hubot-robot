require('coffee-script')
require('coffee-script/register')
var robotCtx = require('../')(),
    expect = require('chai').expect
    
var testLogging = function(robot) {
    robot.log('Test Message')
}

describe('Can intercept robot.log calls',function() {
  it('captures single log message',function() {
      testLogging(robotCtx)
      expect(robotCtx.getLoggedItems()).not.to.be.null
      expect(robotCtx.getLoggedItems().length).to.be.equal(1)
  })
  
  it('captures multiple log messages', function() {
      testLogging(robotCtx)
      expect(robotCtx.getLoggedItems()).not.to.be.null
      expect(robotCtx.getLoggedItems().length).to.be.equal(2)
  })  
})