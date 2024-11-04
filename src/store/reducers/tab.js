import { createSlice } from '@reduxjs/toolkit'

//# createSlice接受一个初始状态和一个包含 reducer 名称和函数的查找表，
//# 并自动生成 action creator 函数、action type 字符串和一个 reducer 函数
const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    isCollapse: false,
    tabList: [{
      path: '/',
      name: 'home',
      label: 'Home'
    }],
    currentMenu: {}
  },
  reducers: {
    collapseMenu: state => {
       state.isCollapse = !state.isCollapse
    },
    selectMenulist: (state, { payload: val }) => {
      if (val.name !== 'home') {
        state.currentMenu = val
        const result = state.tabList.findIndex(item => item.name === val.name)
        if (result === -1) {
          state.tabList.push(val)
        }
      } else if(val.name === 'home' && state.tabList.length === 1) {
        state.currentMenu = {}
      }
    },
    closeTab: (state, { payload: val }) => {
      let result = state.tabList.findIndex(item => item.name === val.name)
      state.tabList.splice(result, 1)
    },
    setCurrentMenu: (state, { payload: val }) => {
      if (val.name === 'home') {
        state.currentMenu={}
      } else {
        state.currentMenu = val
      }
    }
  }
})

export const { collapseMenu, selectMenulist, closeTab, setCurrentMenu } = tabSlice.actions

export default tabSlice.reducer
