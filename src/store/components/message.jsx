import { createSlice } from '@reduxjs/toolkit'
const MessageStore = createSlice({
  name: 'message',
  initialState: {
    duty_rectification: localStorage.getItem('duty_rectification') || 0,
    report_repair: localStorage.getItem('report_repair') || 0,
    violation_handling: localStorage.getItem('violation_handling') || 0,
    absence_registration: localStorage.getItem('absence_registration') || 0,
  },
  reducers: {
    setDuty_rectification: (state, action) => {
      state.token = action.payload
      // 需要本地存储token 不然切换页面就没了
      localStorage.setItem('duty_rectification', action.payload)
    },
    setReport_repair: (state, action) => {
      state.token = action.payload
      // 需要本地存储token 不然切换页面就没了
      localStorage.setItem('report_repair', action.payload)
    },
    setViolation_handling: (state, action) => {
      state.token = action.payload
      // 需要本地存储token 不然切换页面就没了
      localStorage.setItem('violation_handling', action.payload)
    },
    setAbsence_registration: (state, action) => {
      state.token = action.payload
      // 需要本地存储token 不然切换页面就没了
      localStorage.setItem('absence_registration', action.payload)
    },
  },
})

const { setDuty_rectification, setReport_repair, setViolation_handling, setAbsence_registration } = MessageStore.actions

const reducer = MessageStore.reducer

export { setDuty_rectification, setReport_repair, setViolation_handling, setAbsence_registration }

export default reducer
