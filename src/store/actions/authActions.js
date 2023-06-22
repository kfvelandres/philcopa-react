import * as actionTypes from 'src/store/actions/actionTypes'

export function loginSuccess(user) {
  return { type: actionTypes.LOGIN_SUCCESS, user: user }
}

export function logoutSuccess() {
  return { type: actionTypes.LOGOUT_SUCCESS }
}
