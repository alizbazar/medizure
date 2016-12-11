'use strict'

import _ from 'lodash'

import {
  NativeModules,
  NativeAppEventEmitter
} from 'react-native'
const {
  BluetoothManager: BluetoothHR
} = NativeModules

const {
  APP_STARTUP_COMPLETE,
  CHANGE_BACKGROUND,
  LOAD_PERSISTENT_APP_STATE,
  START_MEDITATION_SESSION,
  END_MEDITATION_SESSION,
  SCAN_FOR_DEVICES,
  HEARTBEAT,
  HRV,

  NAV_MEDITATE,
  NAV_STATS
} = require('src/constants')

import { asyncStore } from 'src/lib/async-store'
import { observeStore } from 'src/lib/store-observer'

/**
 * Load persistent storage and save whenever there are any changes
 * @return {Promise}          Promise which completes once all data has been loaded
 */
function setupAsyncStore (dispatch, getState) {
  /**
   * Loads data from asyncStore persistent storage, validates it and setups a state listener
   * @param  {String} key        Key where data is located in asyncStore and in state
   * @param  {String} actionType Redux action type (constant) for loading the data into state
   * @param  {Object} options    Options for the operation:
   *                             {
   *                               discardCurrentStore: {Boolean} Do not load the asyncStore data and remove existing one
   *                               listenToNewValues: {Boolean} Listen to state for changes and save to asyncStore
   *                             }
   * @return {Object}            Data to be loaded
   */
  const setupStateTreeStorage = function (key, actionType, options = {}) {
    const {
      discardCurrentStore,
      listenToNewValues
    } = options

    return asyncStore.get(key).then(data => {
      const dataSeemsValid = !_.isEmpty(data)

      if (discardCurrentStore && data) {
        asyncStore.save(key, null)
      } else if (dataSeemsValid) {
        dispatch({
          type: actionType,
          payload: data
        })
      }

      if (listenToNewValues) {
        listenToStateUpdates(key)
      }

      return dataSeemsValid ? data : null
    }, (err) => { throw err })
  }

  const listenToStateUpdates = key => {
    const saveToAsyncStore = function (newState) {
      asyncStore.save(key, newState)
    }

    // Attach listeners
    observeStore(key, saveToAsyncStore)
  }

  return setupStateTreeStorage('persistent_app_state', LOAD_PERSISTENT_APP_STATE, {
    listenToNewValues: true
  })
}

export function appStart () {
  return function (dispatch, getState) {
    setupAsyncStore(dispatch, getState)
    .then(() => {
      dispatch({
        type: APP_STARTUP_COMPLETE
      })
    })
    .catch(err => {
      console.warn(err)
    })
  }
}

export function changeColor () {
  return function (dispatch, getState) {
    const state = getState()

    const color = state.persistent_app_state.bg_color === 'lightblue' ? 'pink' : 'lightblue'

    dispatch({
      type: CHANGE_BACKGROUND,
      payload: {
        color
      }
    })
  }
}

export function goToMeditate () {
  return {
    type: NAV_MEDITATE
  }
}

export function goToStats () {
  return {
    type: NAV_STATS
  }
}

let HRVsubscription = null
export function toggleMeditationSession(on = false) {
  return function (dispatch, getState) {
    const state = getState()
    if (on && !state.app_state.is_meditation_ongoing) {
      dispatch({
        type: START_MEDITATION_SESSION,
        payload: {
          timestamp: Date.now()
        }
      })
      HRVsubscription = NativeAppEventEmitter.addListener('rMSSDTick', data => {
        dispatch({
          type: HRV,
          payload: {
            data,
            timestamp: Date.now()
          }
        })
      })
      // TODO: start listening to HRV values
    } else if (!on && state.app_state.is_meditation_ongoing) {
      if (HRVsubscription) {
        HRVsubscription.remove()
        HRVsubscription = null
      }
      // TODO: Detatch HRV listener
      dispatch({
        type: END_MEDITATION_SESSION,
        payload: {
          timestamp: Date.now()
        }
      })
    }
  }
}

export function scanForDevices () {
  return function (dispatch, getState) {
    const state = getState()
    // listen to HR and dispatch
    if (!state.app_state.is_connecting_to_hr) {
      // // TODO: replace with real heartbeat signal
      // setInterval(() => {
      //   dispatch({
      //     type: HEARTBEAT,
      //     payload: Date.now()
      //   })
      // }, 1000)

      NativeAppEventEmitter.addListener('HeartRateTick', data => {
        dispatch({
          type: HEARTBEAT,
          payload: Date.now()
        })
      })
    }

    dispatch({
      type: SCAN_FOR_DEVICES
    })

    BluetoothHR.scanForDevices()
  }
}

