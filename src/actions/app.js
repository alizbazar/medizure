'use strict'

import _ from 'lodash'

const {
  APP_STARTUP_COMPLETE,
  CHANGE_BACKGROUND,
  LOAD_PERSISTENT_APP_STATE
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

