import UserStore from './components/user'
import NoticeStore from './components/notice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    user: UserStore,
    notice: NoticeStore,
  },
})

export default store
