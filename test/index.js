require('coffee-script')
require('coffee-script/register')
var robotCtx = require('../')(),
    testscript = require('./testscript.coffee'),
    expect = require('chai').expect

describe('Testing that my robot hears correctly',function() {
  before(function(done) {
    //This is what binds the robot context into your script.
    testscript(robotCtx)
    done()
  })
  
  it('hears phrase "who\'s here"',function(done) {
    //Execute your phrase against all of the robot.hear bindings your script has made
    robotCtx.ExecHear("who's here?",function(matched) {
      expect(matched).to.be.true
      done()
    })
  })
})