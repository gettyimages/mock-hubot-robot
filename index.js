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
        ExecHear: function(message,callback) {
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