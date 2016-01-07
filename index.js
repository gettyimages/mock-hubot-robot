function MessageContext() {
    this.messages = []
}

MessageContext.prototype.reply = function(message) {
    this.messages.push(message)
}


module.exports = function() {
    var hearItems = {}
    var respondItems = {}
    
    return {
        getHeardItems: function() {
            return hearItems
        },
        getRespondItems: function() {
            return respondItems
        },
        hear: function(regex, callback) {
            hearItems[regex.source] = { regexp: regex, cb: callback }
        },
        respond: function(regex, callback) {
            respondItems[regex.source] = { regexp: regex, cb: callback}
        },
        //Provides regex matching and executes the mapped function
        //After it executes the function returns true/false, on the match, 
        //the msgCtx and err if there was an error executing the object to asserting
        //msg.reply behaviors etc...
        ExecHear: function(message,callback) {
            for(var key in hearItems) {
                var matchArray = hearItems[key].regexp.exec(message)
                if(matchArray !== undefined && matchArray !== null) {
                    var fnToExec = hearItems[key].cb
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
        },
        //Provides regex only testing
        //the callback will recieve a true / false on the result
        TestHear: function(message,callback) {
            for(var key in hearItems) {
                var matchArray = hearItems[key].regexp.exec(message)
                
                if(matchArray !== undefined && matchArray !== null) {
                    callback(true)
                    return
                }
            }
            
            callback(false)
        }
    }
}