const {
  APP_STARTUP_COMPLETE,
  CHANGE_BACKGROUND
} = require('src/constants')

const initialState = {
  app_startup_complete: false,
  bg_color: 'lightblue'
}

export default function (currentstate = initialState, action) {
  switch (action.type) {

    case APP_STARTUP_COMPLETE:
      return Object.assign({}, currentstate, {
        app_startup_complete: true
      })

    case CHANGE_BACKGROUND:
      return Object.assign({}, currentstate, {
        bg_color: action.payload.color
      })

    default:
      return currentstate
  }
}
