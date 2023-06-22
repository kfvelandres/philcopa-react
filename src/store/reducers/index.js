import { combineReducers } from 'redux'

// reducer import
import settings from './siteReducer'
import auth from './authReducer'

// ==============================|| COMBINE REDUCER ||============================== //

const reducers = combineReducers({
  settings,
  auth,
})

export default reducers
