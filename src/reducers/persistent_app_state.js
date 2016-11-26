const {
  LOAD_PERSISTENT_APP_STATE,
  CHANGE_BACKGROUND
} = require('src/constants')

const initialState = {
  history: [
    {
      timestamp: "2016-11-27T19:54:33.015Z",
      hrv_first_min: 60,
      hrv_last_min: 67,
      values: [

      ]
    },

  ]
}

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
