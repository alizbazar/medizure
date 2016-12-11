const {
  APP_STARTUP_COMPLETE,
  START_MEDITATION_SESSION,
  END_MEDITATION_SESSION,
  SCAN_FOR_DEVICES,
  HEARTBEAT,
  SELECT_GUIDED_MEDITATION
} = require('src/constants')

const initialState = {
  app_startup_complete: false,
  is_meditation_ongoing: false,
  is_connecting_to_hr: false,
  last_hr_timestamp: null,
  selected_guided_meditation: 'testclip'
}

export default function (currentstate = initialState, action) {
  switch (action.type) {

    case APP_STARTUP_COMPLETE:
      return Object.assign({}, currentstate, {
        app_startup_complete: true
      })

    case START_MEDITATION_SESSION:
      return Object.assign({}, currentstate, {
        is_meditation_ongoing: true
      })

    case END_MEDITATION_SESSION:
      return Object.assign({}, currentstate, {
        is_meditation_ongoing: false
      })

    case SCAN_FOR_DEVICES:
      return Object.assign({}, currentstate, {
        is_connecting_to_hr: true
      })

    case HEARTBEAT:
      return Object.assign({}, currentstate, {
        last_hr_timestamp: action.payload
      })

    case SELECT_GUIDED_MEDITATION:
      return Object.assign({}, currentstate, {
        selected_guided_meditation: action.payload
      })

    default:
      return currentstate
  }
}
