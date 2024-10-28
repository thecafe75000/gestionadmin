import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icon from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import menuConfig from '../../config'


const { Sider } = Layout

// 动态获取menuConfig里的icon的方法
// 需要把menuConfig里的icon转换成一个组件
const iconToElement = (name) => React.createElement(Icon[name])

// 处理菜单menuConfig的数据(通常是通过请求来获取后端提供的数据)
const items = menuConfig.map(item => {
  // 没有子菜单的情况
  const child = {
    key: item.name,
    icon: iconToElement(item.icon),
    label: item.label
  }
  // 如果存在item.children,说明有子菜单
  if (item.children) {
    child.children = item.children.map(item => {
      return {
        key: item.name,
        label: item.label
      }
    })
  }
  return child
})

const CommonAside = ({ collapse }) => {
  const navigate = useNavigate()

  const selectMenu = (e) => {
    navigate(e.key)
  }
  
  return (
    <Sider trigger={null} collapsed={collapse}>
      <h3 className='app-name'>{collapse ? 'Gestion' : 'Gestion Administrative'}</h3>
      <Menu
        theme='light'
        mode='inline'
        defaultSelectedKeys={['1']}
        items={items}
        style={{ height: '100%' }}
        onClick={selectMenu}
      />
    </Sider>
  )
}

export default CommonAside