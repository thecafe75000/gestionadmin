import { createSlice } from '@reduxjs/toolkit'

//# createSlice接受一个初始状态和一个包含 reducer 名称和函数的查找表，
//# 并自动生成 action creator 函数、action type 字符串和一个 reducer 函数
const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    isCollapse: false
  },
  reducers: {
    collapseMenu: state => {
       state.isCollapse = !state.isCollapse
    }
  }
})

export const { collapseMenu } = tabSlice.actions
export default tabSlice.reducer