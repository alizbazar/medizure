import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' // allows us to use asynchronous actions
import rootReducer from 'src/reducers'

// A super-simple logger
const logger = store => next => action => {
  if (action.type !== 'HEARTBEAT') {
    console.log('dispatching', action.type, action)
  }
  return next(action)
}

export default applyMiddleware(thunk, logger)(createStore)(rootReducer)

