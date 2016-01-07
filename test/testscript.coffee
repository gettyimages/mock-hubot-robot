module.exports = (robot) ->
  robot.hear /who's here/, (res) ->
    res.reply 'ME!'
 