"use strict"

var Log = require('log');

class LoggingCaptureContainer {
  constructor(){
    this.internalLogger = new Log('info')
    this.infoItems = new Array()
    this.warningItems = new Array()
    this.errorItems = new Array()
  }
  
  info(message) {
      this.infoItems.push(message);
      this.internalLogger.info(message);
  }
  
  error(message) {
      this.errorItems.push(message);
      this.internalLogger.error(message);
  }
  
  warning(message) {
      this.warningItems.push(message);
      this.internalLogger.warning(message);
  }
    
}
    
module.exports = LoggingCaptureContainer
