import { createSlice } from '@reduxjs/toolkit'
const UserStore = createSlice({
  name: 'user',
  initialState: {
    token: '',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
  },
})

const { setToken } = UserStore.actions

const reducer = UserStore.reducer

export { setToken }

export default reducer
