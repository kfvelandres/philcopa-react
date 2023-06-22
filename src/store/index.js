import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers'
//import siteReducer from './reducers/siteSlice'

export const store = configureStore({ reducer: reducers })
// export const store = configureStore({
//   reducer: {
//     site: siteReducer,
//   },
// })
