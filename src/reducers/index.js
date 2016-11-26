import { combineReducers } from 'redux'
import app_state from './app_state'
import persistent_app_state from './persistent_app_state'
import routes from './routes'

export default combineReducers({
  app_state,
  persistent_app_state,
  routes
  // other reducers here
})
