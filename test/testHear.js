require('coffee-script')
require('coffee-script/register')
var MockRobot = require('../'),
    robotCtx = new MockRobot(),
    expect = require('chai').expect
    
var testhearingWithReplyAndSend = require('./testscripts/hear_with_reply_and_send.coffee')

describe('The Robot hears correctly',function() {
  before(function() {
    //This is what binds the robot context into your script.
    testhearingWithReplyAndSend(robotCtx)
  })
  
  it('hears phrase "who\'s here"',function(done) {
    //Execute your phrase against all of the robot.hear bindings your script has made
    robotCtx.TestHear("who's here?",function(matched) {
      expect(matched).to.be.true
      done()
    })
  })
  
  it('does not hear phrase "who\'s there"',function(done) {
      robotCtx.TestHear("who's there?",function(matched) {
          expect(matched).to.be.false
          done()
      })
  })

    describe('The context captures interactions with the res aka msg object that Hubot has',function() {
        var returnedMessageContext
        var returnedError
        
        before(function(done){
            robotCtx.ExecHear("who's here?", function(matched,msgCtx,err) {
                returnedMessageContext = msgCtx
                returnedError = err
                done()
            })    
        })
        
        it('executes my function',function() {
            expect(returnedMessageContext.replies).not.to.be.null
        })

        describe('When my function interacts with reply', function() {
            
            it('has expected number of replies', function() {
                expect(returnedMessageContext.replies.length).to.be.equal(1)
            })
            
            it('the message is correct', function() {
                expect(returnedMessageContext.replies).to.contain("ME!")
            })    
        })
    })
})

describe('When ExecHear has no match',function() {
    it('sets matched to false', function(done) {
        robotCtx.ExecHear("who's there?", function(matched,msgCtx,err) {
            expect(matched).to.be.false
            done()
        })
    })
})
  
describe('When my function interacts with send', function() {
    var returnedMessageContext = null;
    var returnedError = null;
    
    before(function(){
        robotCtx.ExecHear("test2", function(matched,msgCtx,err) {
            returnedMessageContext = msgCtx
            returnedError = err
        })    
    })
    
    it('has expected number of entries',function() {
        expect(returnedMessageContext.sends.length).to.be.equal(1)
    })
    
    it('value sent is correct',function() {
        expect(returnedMessageContext.sends).to.contain("/quote Done")
    })
})