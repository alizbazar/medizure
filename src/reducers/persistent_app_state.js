const {
  LOAD_PERSISTENT_APP_STATE
} = require('src/constants')

const initialState = {}

export default function (currentstate = initialState, action) {
  switch (action.type) {

    case LOAD_PERSISTENT_APP_STATE:
      return action.payload

    default:
      return currentstate
  }
}
