import {
  LOAD_PERSISTENT_APP_STATE,
  START_MEDITATION_SESSION,
  END_MEDITATION_SESSION,
  BT_HRV
} from 'src/constants'

const initialState = {
  history: []
}

export default function (currentstate = initialState, action) {
  switch (action.type) {

    // case LOAD_PERSISTENT_APP_STATE:
    //   return action.payload

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

    case BT_HRV: {

      const history = currentstate.history.slice()
      if (history.length === 0) {
        return currentstate
      }

      const pos = history.length ? 0 : history.length - 1
      if (!history[pos].started) {
        return currentstate
      }

      history[pos] = Object.assign({}, history[pos])
      history[pos].values = history[pos].values.slice()

      const dataObj = {
        hrv: action.payload.data,
        timestamp: action.payload.timestamp,
      }

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

    default:
      return currentstate
  }
}
