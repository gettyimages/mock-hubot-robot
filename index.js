"use strict"
require('coffee-script/register')
var Brain = require('./node_modules/hubot/src/brain.coffee')
var EventEmitter = require('events')

function MessageContext() {
    this.replies = []
    this.sends = []
}

MessageContext.prototype.reply = function(message) {
    this.replies.push(message)
}

MessageContext.prototype.send = function(message) {
    this.sends.push(message)
}

var Log = require('log')

class LoggingCaptureContainer {
  constructor() {
    this.internalLogger = new Log('info')
    this.infoItems = new Array()
    this.warningItems = new Array()
    this.errorItems = new Array()
  }

  info(message) {
        this.infoItems.push(message)
        console.log(message)
        this.internalLogger.info(message)
  }
      
  error(message) {
        this.errorItems.push(message)
        this.internalLogger.error(message)
      }
  warning(message) {
        this.warningItems.push(message)
        this.internalLogger.warning(message)
      }
}


class MockRobot {
  constructor() {
    this.hearItems = {}
    this.respondItems = {}
    this.events = new EventEmitter()
    this.brain = new Brain(this)
    this.logger = new LoggingCaptureContainer();
  }
  
  getHeardItems() {
    return this.hearItems
  }
  
  get RespondItems() {
    return this.respondItems
  }
  
  get LogItems() {
    return this.logItems
  }
        
  hear(regex, callback) {
    this.hearItems[regex.source] = { regexp: regex, cb: callback }
  }
  
  respond(regex, callback) {
    this.respondItems[regex.source] = { regexp: regex, cb: callback}
  }
  
  //All the stuff around event emitting
  on(event,args) {
    this.events.on(event,args)
  }
  
  emit(event,args) {
    this.events.emit(event,args)
  }
  

  //Provides regex matching and executes the mapped function
  //After it executes the function returns true/false, on the match, 
  //the msgCtx and err if there was an error executing the object to asserting
  //msg.reply behaviors etc...
  ExecHear(message,callback) {
      for(var key in this.hearItems) {
          var matchArray = this.hearItems[key].regexp.exec(message)
          if(matchArray !== undefined && matchArray !== null) {
              var fnToExec = this.hearItems[key].cb
              var msgCtx = new MessageContext()
              
              try {
                  fnToExec(msgCtx)    
              } catch(err) {
                  callback(true,msgCtx,err)
                  return
              }
              
              callback(true,msgCtx,null)
              return
          }
          
          callback(false,null,null)
      }
  }
  
  //Provides regex only testing
  //the callback will recieve a true / false on the result
  TestHear(message,callback) {
      for(var key in this.hearItems) {
          var matchArray = this.hearItems[key].regexp.exec(message)
          
          if(matchArray !== undefined && matchArray !== null) {
              callback(true)
              return
          }
      }
      
      callback(false)
  }
}

module.exports = MockRobot