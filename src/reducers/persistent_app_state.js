const {
  LOAD_PERSISTENT_APP_STATE,
  CHANGE_BACKGROUND
} = require('src/constants')

const initialState = {}

export default function (currentstate = initialState, action) {
  switch (action.type) {

    case LOAD_PERSISTENT_APP_STATE:
      return action.payload

    case CHANGE_BACKGROUND:
      return Object.assign({}, currentstate, {
        bg_color: action.payload.color
      })

    default:
      return currentstate
  }
}
