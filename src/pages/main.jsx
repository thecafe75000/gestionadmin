import React from 'react'
import { useSelector } from 'react-redux'
import { Layout} from 'antd'
import CommonAside from '@/components/commonaside'
import CommonHeader from '@/components/commonheader'
import { Outlet } from 'react-router-dom'
import CommonTag from '@/components/commonTag'
import RouterAuth from '@/router/routerAuth'


const { Content } = Layout

const Main = () => {
  const collapse = useSelector((state) => state.tabMenu.isCollapse)
  return (
    <RouterAuth>
      <Layout className='main-container'>
        <CommonAside collapse={collapse} />
        <Layout>
          <CommonHeader collapse={collapse} />
          <CommonTag />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </RouterAuth>
  )
}

export default Main
