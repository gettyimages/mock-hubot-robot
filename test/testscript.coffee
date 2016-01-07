module.exports = (robot) ->
  robot.hear /who's here/, (res) ->
    console.log("called")