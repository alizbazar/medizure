import {
  LOAD_PERSISTENT_APP_STATE,
  START_MEDITATION_SESSION,
  END_MEDITATION_SESSION,
  HRV
} from 'src/constants'

const r = function() {
  let values = []
  for (let i = 0; i < 10; i++) {
    values.push({ hrv: 40 + Math.random() * 20, time: i+1 })
  }
  return values
}

const initialState = {
  history: [
    {
      started: Date.now(),
      values: r(),
    },
    {
      started: Date.now(),
      values: r(),
    },
    {
      started: Date.now(),
      values: r(),
    },
    {
      started: Date.now(),
      values: r(),
    },
    {
      started: Date.now(),
      values: r(),
    },
    {
      started: Date.now(),
      values: r(),
    },
    {
      started: Date.now(),
      values: r(),
    },
    {
      started: Date.now(),
      values: r(),
    },
    {
      started: Date.now(),
      values: r(),
    },
    {
      started: Date.now(),
      values: r(),
    },
    {
      started: Date.now(),
      values: r(),
    },
    {
      started: Date.now(),
      values: r(),
    },
  ]
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

    default:
      return currentstate
  }
}
