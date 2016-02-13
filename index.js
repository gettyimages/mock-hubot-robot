"use strict";
require("coffee-script");
require("coffee-script/register");

var hubot = require("hubot");
var Brain = hubot.Brain;
var MockHttpClient = require("./lib/mock-http-client");
var EventEmitter = require("events");
var LoggingCaptureContainer = require("./lib/logcapturecontainer");

function MessageContext() {
    this.replies = [];
    this.sends = [];
}

MessageContext.prototype.reply = function(message) {
    this.replies.push(message);
};

MessageContext.prototype.send = function(message) {
    this.sends.push(message);
};

class MockRobot {
  constructor() {
      this.hearItems = {};
      this.respondItems = {};
      this.events = new EventEmitter();
      this.brain = new Brain(this);
      this.logger = new LoggingCaptureContainer();
      this.http = function(url, options) {
          return new MockHttpClient(url, options);            
      };
  }
  
  getHeardItems() {
      return this.hearItems;
  }
  
  get RespondItems() {
      return this.respondItems;
  }
  
  get LogItems() {
      return this.logItems;
  }
        
  hear(regex, callback) {
      this.hearItems[regex.source] = { regexp: regex, cb: callback };
  }
  
  respond(regex, callback) {
      this.respondItems[regex.source] = { regexp: regex, cb: callback};
  }
  
  //All the stuff around event emitting
  on(event,args) {
      this.events.on(event,args);
  }
  
  emit(event,args) {
      this.events.emit(event,args);
  }
  

  //Provides regex matching and executes the mapped function
  //After it executes the function returns true/false, on the match, 
  //the msgCtx and err if there was an error executing the object to asserting
  //msg.reply behaviors etc...
  ExecHear(message,callback) {
      for(var key in this.hearItems) {
          var matchArray = this.hearItems[key].regexp.exec(message);
          if(matchArray !== undefined && matchArray !== null) {
              var fnToExec = this.hearItems[key].cb;
              var msgCtx = new MessageContext();
              
              try {
                  fnToExec(msgCtx);
              } catch(err) {
                  callback(true,msgCtx,err);
                  return;
              }
              
              callback(true,msgCtx,null);
              return;
          }
      }
      
      callback(false,null,null);
  }
  
  //Provides regex only testing
  //the callback will recieve a true / false on the result
  TestHear(message,callback) {
      for(var key in this.hearItems) {
          var matchArray = this.hearItems[key].regexp.exec(message);
          
          if(matchArray !== undefined && matchArray !== null) {
              callback(true);
              return;
          }
      }
      
      callback(false);
  }
}

module.exports = MockRobot;