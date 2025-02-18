import { createSlice } from '@reduxjs/toolkit'
const UserStore = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('dormicare_token') || '',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      // 需要本地存储token 不然切换页面就没了
      localStorage.setItem('dormicare_token', action.payload)
    },
  },
})

const { setToken } = UserStore.actions

const reducer = UserStore.reducer

export { setToken }

export default reducer
