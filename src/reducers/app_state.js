import _ from 'lodash'

const {
  APP_STARTUP_COMPLETE,
  START_MEDITATION_SESSION,
  END_MEDITATION_SESSION,
  SCAN_FOR_DEVICES,
  HEARTBEAT,
  DEVICE_DISCOVERED
} = require('src/constants')

const initialState = {
  app_startup_complete: false,
  is_meditation_ongoing: false,
  is_connecting_to_hr: false,
  last_hr_timestamp: null,
  discovered_devices: []
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

    case DEVICE_DISCOVERED:
      { const discovered_devices = _.uniqBy([ ... currentstate.discovered_devices, action.payload], 'uuid')
        return Object.assign({}, currentstate, {
          discovered_devices: discovered_devices
        })
      }
    default:
      return currentstate
  }
}
