require('coffee-script')
require('coffee-script/register')
var robotCtx = require('../')(),
    testscript = require('./testscript.coffee'),
    expect = require('chai').expect

describe('Testing that my robot hears correctly',function() {
  before(function() {
    //This is what binds the robot context into your script.
    testscript(robotCtx)
  })
  
  it('hears phrase "who\'s here"',function(done) {
    //Execute your phrase against all of the robot.hear bindings your script has made
    robotCtx.TestHear("who's here?",function(matched) {
      expect(matched).to.be.true
      done()
    })
  })
  
  describe('The context captures interactions with the res aka msg object that Hubot has',function() {
      var returnedMessageContext
      var returnedError
      
      before(function(done){
        robotCtx.ExecHear("who's here?", function(matched,msgCtx,err) {
          returnedMessageContext = msgCtx
          done()
        })    
      })
      
    it('executes my function',function() {
          expect(returnedMessageContext.messages).not.to.be.null
    })
    
    describe('When my function interacts with reply', function() {
        it('has expected number of messages', function() {
        expect(returnedMessageContext.messages.length).to.be.equal(1)
    })    
    })
  })
  
})