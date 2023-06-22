import * as actionTypes from '../actions/actionTypes'
import initialState from '../initialState'

const colorScheme = localStorage.getItem('_color-scheme')
const siteInitialState = { ...initialState.site, prefersColorScheme: colorScheme === 'dark' ? 'dark' : 'light' }

const siteReducer = (state = siteInitialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_COLOR_SCHEME: {
      const toColorScheme = state.prefersColorScheme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('_color-scheme', toColorScheme)
      return { ...state, prefersColorScheme: toColorScheme }
    }
    default:
      return state
  }
}

export default siteReducer
