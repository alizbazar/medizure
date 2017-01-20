'use strict'

import _ from 'lodash'

import {
  NativeModules,
  NativeAppEventEmitter
} from 'react-native'
const {
  BluetoothManager
} = NativeModules

import {
  APP_STARTUP_COMPLETE,
  LOAD_PERSISTENT_APP_STATE,

  START_MEDITATION_SESSION,
  END_MEDITATION_SESSION,

  BT_HRV,
  BT_SCAN_START,
  BT_SCAN_STOP,
  BT_DEVICE_DISCOVERED,
  BT_DEVICE_CLEAR,
  BT_DEVICE_SELECT,

  NAV_MEDITATE,
  NAV_STATS
} from 'src/constants'

import { asyncStore, cleanAsyncStorage } from 'src/lib/async-store'
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
    // REMOVE THIS IN PRODUCTION
    // cleanAsyncStorage()
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
    } else if (!on && state.app_state.is_meditation_ongoing) {
      if (hrvListener) {
        hrvListener.remove()
        hrvListener = null
      }

      dispatch({
        type: END_MEDITATION_SESSION,
        payload: {
          timestamp: Date.now()
        }
      })
    }
  }
}

let deviceListener = null
export function scanForDevices () {
  return function (dispatch, getState) {
    const state = getState()

    if (!state.app_state.is_connecting_to_hr) {
      hrvListener = NativeAppEventEmitter.addListener('peripheralDiscovered', data => {
        dispatch({
          type: BT_DEVICE_DISCOVERED,
          payload: data
        })
      })
      dispatch({
        type: BT_SCAN_START,
      })

      BluetoothManager.scanForDevices()
    }
  }
}
export function stopScan() {
  return function (dispatch, getState) {
    const state = getState()
    if (state.app_state.is_connecting_to_hr) {

      if (deviceListener) {
        deviceListener.remove()
        deviceListener = null
      }
      BluetoothManager.stopScan()

      dispatch({
        type: BT_SCAN_STOP
      })
      dispatch({
        type: BT_DEVICE_CLEAR
      })
    }
  }
}

let hrvListener = null
export function selectDevice(device) {
  return function(dispatch, getState) {
    const state = getState()
    if ((state.app_state.selected_device === '') && device) {
      BluetoothManager.connectDevice(device.name, device.uuid)
      dispatch({
        type: BT_DEVICE_SELECT,
        payload: device.name,
      })
      hrvListener = NativeAppEventEmitter.addListener('rMSSDTick', data => {
        dispatch({
          type: BT_HRV,
          payload: {
            data,
            timestamp: Date.now()
          }
        })
      })
    }
  }
}
