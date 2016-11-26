import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' // allows us to use asynchronous actions
import rootReducer from 'src/reducers'

// A super-simple logger
const logger = store => next => action => {
  console.log('dispatching', action.type, action)
  var result = next(action)
  // console.log('next state', store.getState())
  return result
}

export default applyMiddleware(thunk, logger)(createStore)(rootReducer)

