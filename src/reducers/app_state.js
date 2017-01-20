import {
  APP_STARTUP_COMPLETE,
  START_MEDITATION_SESSION,
  END_MEDITATION_SESSION,
  BT_SCAN_START,
  BT_SCAN_STOP,
  BT_DEVICE_DISCOVERED,
  BT_DEVICE_SELECT,
  BT_DEVICE_CLEAR,
  SELECT_GUIDED_MEDITATION,
} from 'src/constants'

const initialState = {
  app_startup_complete: false,
  is_meditation_ongoing: false,
  is_connecting_to_hr: false,
  selected_guided_meditation: 'testclip',
  discovered_devices: {},
  selected_device: '',
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

    case BT_SCAN_START:
      return Object.assign({}, currentstate, {
        is_connecting_to_hr: true
      })

    case BT_SCAN_STOP:
      return Object.assign({}, currentstate, {
        is_connecting_to_hr: false
      })

    case BT_DEVICE_DISCOVERED:
      if (!currentstate.discovered_devices[action.payload.uuid]) {
        const discovered_devices = { ...currentstate.discovered_devices, [action.payload.uuid]: action.payload }
        console.log('ACTION', discovered_devices)
        return Object.assign({}, currentstate, {
          discovered_devices
        })
      }
      return currentstate

    case BT_DEVICE_SELECT:
      return Object.assign({}, currentstate, {
        selected_device: action.payload
      })

    case BT_DEVICE_CLEAR:
      return Object.assign({}, currentstate, {
        discovered_devices: {},
        selected_device: '',
      })

    case SELECT_GUIDED_MEDITATION:
      return Object.assign({}, currentstate, {
        selected_guided_meditation: action.payload
      })

    default:
      return currentstate
  }
}
