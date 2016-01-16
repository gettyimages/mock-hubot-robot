module.exports = (robot) ->
  robot.hear /who's here/, (res) ->
    res.reply 'ME!'
    
  robot.hear /test2/,(res) ->
    res.send '/quote Done'
 