require('coffee-script')
require('coffee-script/register')
var robotCtx = require('../')(),
    expect = require('chai').expect
    
var testLogging = function(robot) {
    robot.logger.info('Test Message')
}

describe('Can intercept robot.log calls',function() {
  it('captures single log message',function() {
      testLogging(robotCtx)
      expect(robotCtx.getLogItems().info.length).to.be.equal(1)
  })
  
  it('captures multiple log messages', function() {
      testLogging(robotCtx)
      expect(robotCtx.getLogItems().info.length).to.be.equal(2)
  })
})