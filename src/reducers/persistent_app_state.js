const {
  LOAD_PERSISTENT_APP_STATE,
  CHANGE_BACKGROUND,
  START_MEDITATION_SESSION,
  END_MEDITATION_SESSION,
  HRV
} = require('src/constants')

const initialState = {
  history: []
}

export default function (currentstate = initialState, action) {
  switch (action.type) {

    case LOAD_PERSISTENT_APP_STATE:
      return action.payload

    case START_MEDITATION_SESSION: {
      const history = currentstate.history.slice()
      history.push({
        started: action.payload.timestamp,
        values: []
      })

      return Object.assign({}, currentstate, {
        history
      })
    }

    case HRV: {
      const history = currentstate.history.slice()
      const pos = history.length - 1

      // TODO: make sure the history item !item.ended
      history[pos] = Object.assign({}, history[pos])
      history[pos].values = history[pos].values.slice()

      const dataObj = Object.assign({}, action.payload.data, {
        timestamp: action.payload.timestamp
      })

      history[pos].values.push(dataObj)

      return Object.assign({}, currentstate, {
        history
      })
    }

    case END_MEDITATION_SESSION: {
      const history = currentstate.history.slice()
      const pos = history.length - 1

      // If no HRV values were logged, don't save the session
      if (!history[pos].values.length) {
        history.pop()

      // Otherwise, end the session
      } else {
        history[pos] = Object.assign({}, history[pos], {
          ended: action.payload.timestamp
        })

      }

      return Object.assign({}, currentstate, {
        history
      })
    }

    case CHANGE_BACKGROUND:
      return Object.assign({}, currentstate, {
        bg_color: action.payload.color
      })

    default:
      return currentstate
  }
}
