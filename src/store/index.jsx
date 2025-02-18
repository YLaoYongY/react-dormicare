import UserStore from './components/user'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    user: UserStore,
  },
})

export default store
