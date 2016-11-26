/**
 * Observe store item changes by comparing the tree node with the new one
 * Fire onChange if changed
 *
 * @param  {[type]} store    Redux store
 * @param  {[type]} select   Select function to return the subState,
 *                           for example (store) => store.SUB_MODE
 * @param  {[type]} onChange Store onChange handler, getting new subState as an argument
 * @return {[type]}          Unsubscribe handler to stop listening for the changes
 */
import _ from 'lodash'
import store from 'src/store'

const observeStore = (() => {
  let unsubscribeHandler
  let subscriptions = []

  function handleChange () {
    const state = store.getState()
    // Order: first in - first out
    for (let i = 0; i < subscriptions.length; i++) {
      const sub = subscriptions[i]
      let nextState = _.get(state, sub.select)

      if (sub.on && nextState === sub.on) {
        if (sub.runOnce) {
          subscriptions.splice(i, 1)
          // Due to removing an item, the next i has to be the same
          // It's cleaner to just -1, as it gets increased -1+1=0 on the next iteration
          i--
        }
        sub.onChange(nextState)
      } else if (nextState !== sub.currentState) {
        sub.onChange(nextState, sub.currentState)
        sub.currentState = nextState
      }
    }
  }

  function unsubscribeAll () {
    if (unsubscribeHandler) {
      unsubscribeHandler()
    }
    subscriptions = []
  }

  return function (select, options = {}, onChange) {
    if (!select) {
      return {
        unsubscribe: unsubscribeAll
      }
    } else if (!onChange && typeof options === 'function') {
      onChange = options
      options = {}
    }
    const { on, runOnce } = options
    if (!unsubscribeHandler) {
      unsubscribeHandler = store.subscribe(handleChange)
    }
    const state = store.getState()
    const currentState = _.get(state, select)
    if (on && currentState === on) {
      onChange(currentState)
      return
    }
    console.log('SUBSCRIBED to ', select)
    subscriptions.push({
      currentState: currentState,
      select,
      onChange,
      on,
      runOnce
    })
  }
})()

const runOnce = (key, func) => {
  return observeStore('app_state.' + key, {
    runOnce: true,
    on: true
  }, func)
}

export {
  observeStore,
  runOnce
}
