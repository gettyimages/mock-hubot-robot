require('coffee-script')
require('coffee-script/register')
var robotCtx = require('../')(),
    expect = require('chai').expect
    
var testLogging = function(robot) {
    robot.logger.info('test info')
    robot.logger.warning('test warning')
    robot.logger.error('test error')
}

describe('Can intercept robot.logger calls',function() {
  describe('captures single log message',function() {
    before(function(){
      testLogging(robotCtx)
    })
    
    it('for info', function() {
      expect(robotCtx.getLogItems().info.length).to.be.equal(1)
    })
    
    it('for warning',function() {
      expect(robotCtx.getLogItems().warning.length).to.be.equal(1)
    })
    
    it('for error',function() {
      expect(robotCtx.getLogItems().error.length).to.be.equal(1)
    })
  })
  
  describe('captures multiple log messages', function() {
    before(function(){
      testLogging(robotCtx)
    })
    
    it('for info', function() {
      expect(robotCtx.getLogItems().info.length).to.be.equal(2)
    })
    
    it('for warning',function() {
      expect(robotCtx.getLogItems().warning.length).to.be.equal(2)
    })
    
    it('for error',function() {
      expect(robotCtx.getLogItems().error.length).to.be.equal(2)
    })
  })
})