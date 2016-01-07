# mock-hubot-robot
Provides a mock robot context used to provide testing support for Hubot script development

### Install

```
npm install mock-hubot-robot
```

### Features
Currently only supports testing regex triggers

### Use

Assuming a file in a test folder off the root of your hubot source
Using Mocha and Chai
```
var robotCtx = require('mock-hubot-robot')
var expect = require('chai').expect

// To test Coffee based scripts
require('coffee-script')
var hubotScript = require('../scripts/yourscript.coffee')

describe('Testing that my robot hears correctly',function(){
  before(done) {
    //This is what binds the robot context into your script.
    hubotScript(robotCtx)
    done()
  }
  
  it('hears phrase "who\'s here"',function(done) {
    //Execute your phrase against all of the robot.hear bindings your script has made
    robotCtx.ExecHear("who's here?",function(matched) {
      expect(matched).to.be.true
      done()
    })
  })
})
```
