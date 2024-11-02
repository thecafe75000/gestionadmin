import React from 'react'
import { Tag, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import { closeTab, setCurrentMenu } from '@/store/reducers/tab'
import { useLocation, useNavigate } from 'react-router-dom'

const CommonTag = () => {
  const tabList = useSelector(state => state.tabMenu.tabList)
  const currentMenu = useSelector(state => state.tabMenu.currentMenu)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  console.log('tablist out', tabList)
  
  const handleClose = (tag,index) => {
    let length = tabList.length -1 
    dispatch(closeTab(tag))
    if (tag.path !== location.pathname) {
      return
    }
    if (index === length) {
      const currentData = tabList[index - 1]
      dispatch(setCurrentMenu(currentData))
      navigate(currentData.path)
    } else {
      if (tabList.length > 1) {
        const nextData = tabList[index + 1]
        dispatch(setCurrentMenu(nextData))
        navigate(nextData.path)
      }
    }
  }

  const handleChange = (tag) => {
    dispatch(setCurrentMenu(tag))
    navigate(tag.path)
  }

  // 显示tag
  const setTag = (flag, item, index) => {
    return (
      flag ?
        <Tag color='#55acee' closeIcon onClose={() => handleClose(item,index)} key={item.label} >{item.label}</Tag>
        :
        <Tag key={item.name} onClick={()=>handleChange(item)}>{item.label }</Tag>
    )
  }

  return (
    <Space className='common-tag' size={[0, 8]} wrap>
      {
        currentMenu.name && tabList.map((item,index) => setTag(item.path === currentMenu.path, item, index))
      }
    </Space>
  )
}

export default CommonTag