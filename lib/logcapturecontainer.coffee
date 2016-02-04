Log = require 'log'

class LoggingCaptureContainer 
  constructor: () ->
    @internalLogger = new Log 'info'
    @infoItems = new Array()
    @warningItems = new Array()
    @errorItems = new Array()
    
  info: (message) ->
    @infoItems.push message
    console.log message
    @internalLogger.info message
      
  error: (message) ->
    @errorItems.push message
    @internalLogger.error message
        
  warning: (message) -> 
    @warningItems.push message
    @internalLogger.warning message
    
module.exports = LoggingCaptureContainer
