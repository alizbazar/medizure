const {
  APP_STARTUP_COMPLETE,
  CHANGE_BACKGROUND
} = require('src/constants')


export function appStart () {
  return {
    type: APP_STARTUP_COMPLETE
  }
}

export function changeColor () {
  return function(dispatch, getState) {
    const state = getState()

    const color = state.app_state.bg_color === 'lightblue' ? 'pink' : 'lightblue'

    dispatch({
      type: CHANGE_BACKGROUND,
      payload: {
        color
      }
    })

  }
}