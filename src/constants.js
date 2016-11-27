const actions = {}
;[
// ALL ACTIONS SHOULD BE LISTED BELOW
  'APP_STARTUP_COMPLETE',
  'LOAD_PERSISTENT_APP_STATE',
  'CHANGE_BACKGROUND',

  'START_MEDITATION_SESSION',
  'END_MEDITATION_SESSION',
  'HEARTBEAT',
  'HRV',
  'SCAN_FOR_DEVICES',

  'NAV_MEDITATE',
  'NAV_STATS'

  // SPECIAL CONSTANTS USED IN STATE
].forEach(name => { actions[name] = name })

module.exports = Object.assign({
  APP_VERSION: '0.1.0'
}, actions)
