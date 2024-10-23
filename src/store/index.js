import { configureStore } from '@reduxjs/toolkit'
import TabReducer from './reducers/tab'

const store = configureStore({
  reducer: {
    tabMenu: TabReducer
  }
})

export default store