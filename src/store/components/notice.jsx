import { createSlice } from '@reduxjs/toolkit'

const NoticeStore = createSlice({
  name: 'notice',
  initialState: {
    noticeData: JSON.parse(localStorage.getItem('noticeData')) || [], // 初始化为一个空数组
  },
  reducers: {
    setNotice: (state, action) => {
      state.noticeData = action.payload
      localStorage.setItem('noticeData', JSON.stringify(action.payload)) // 保存为字符串
    },
    addNotice: (state, action) => {
      state.noticeData.push(action.payload) // 添加新的公告数据
      localStorage.setItem('noticeData', JSON.stringify(state.noticeData)) // 更新本地存储
    },
    editNotice: (state, action) => {
      const { id, updatedNotice } = action.payload // 获取要编辑的公告ID和更新的公告数据
      const index = state.noticeData.findIndex(notice => notice.id === id)
      if (index !== -1) {
        state.noticeData[index] = { ...state.noticeData[index], ...updatedNotice } // 更新公告数据
        localStorage.setItem('noticeData', JSON.stringify(state.noticeData)) // 更新本地存储
      }
    },
    deleteNotice: (state, action) => {
      state.noticeData = state.noticeData.filter(notice => notice.id !== action.payload) // 删除公告数据
      localStorage.setItem('noticeData', JSON.stringify(state.noticeData)) // 更新本地存储
    },
  },
})

const { setNotice, addNotice, editNotice, deleteNotice } = NoticeStore.actions

const reducer = NoticeStore.reducer

export { setNotice, addNotice, editNotice, deleteNotice }

export default reducer
