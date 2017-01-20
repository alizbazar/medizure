const actions = {}
;[
  // ALL ACTIONS SHOULD BE LISTED BELOW
  'APP_STARTUP_COMPLETE',
  'LOAD_PERSISTENT_APP_STATE',

  'START_MEDITATION_SESSION',
  'END_MEDITATION_SESSION',

  'BT_HRV',
  'BT_SCAN_START',
  'BT_SCAN_STOP',
  'BT_DEVICE_DISCOVERED',
  'BT_DEVICE_SELECT',
  'BT_DEVICE_CLEAR',

  'NAV_MEDITATE',
  'NAV_STATS',

  'SELECT_GUIDED_MEDITATION'
].forEach(name => { actions[name] = name })

module.exports = Object.assign({
  APP_VERSION: '0.1.0',
  GUIDED_MEDITATIONS: {
    'testclip': {
      source: require('src/assets/meditations/testclip.mp3'),
      title: 'Test Meditation'
    }
  }
}, actions)
