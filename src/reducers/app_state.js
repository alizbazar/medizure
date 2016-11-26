const {
  APP_STARTUP_COMPLETE
} = require('src/constants')

const initialState = {
  app_startup_complete: false
}

export default function (currentstate = initialState, action) {
  switch (action.type) {

    case APP_STARTUP_COMPLETE:
      return Object.assign({}, currentstate, {
        app_startup_complete: true
      })

    default:
      return currentstate
  }
}
