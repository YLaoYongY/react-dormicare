import UserStore from './components/user'
import NoticeStore from './components/notice'
import MessageStore from './components/message'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    user: UserStore,
    notice: NoticeStore,
    message: MessageStore,
  },
})

export default store
