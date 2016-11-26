import { combineReducers } from 'redux'
import app_state from './app_state'
import persistent_app_state from './persistent_app_state'

export default combineReducers({
  app_state,
  persistent_app_state
  // other reducers here
})
