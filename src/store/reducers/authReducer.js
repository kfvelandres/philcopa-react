import * as actionTypes from '../actions/actionTypes'
import initialState from '../initialState'

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem('_uid', action.user.id)
      return {
        ...state,
        user: action.user,
      }
    case actionTypes.LOGOUT_SUCCESS:
      localStorage.removeItem('_uid')
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

export default authReducer
