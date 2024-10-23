import React from 'react'
import { useDispatch } from 'react-redux'
import { Avatar, Button,Dropdown, Layout } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import userImage from '../../asssets/images/user.png'
import './index.css'
import { collapseMenu } from '../../store/reducers/tab'


const { Header } = Layout

const CommonHeader = ({ collapse }) => {
  const dispatch = useDispatch()
  const logout = () => {}

  const items = [
    {
      key: '1',
      label: (
        <button
          target='_blank'
          rel='noopener noreferrer'
          style={{ border: 'none', backgroundColor: '#fff' }}
        >
          Centre Utilisateurs
        </button>
      )
    },
    {
      key: '2',
      label: (
        <button
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => logout}
          style={{ border: 'none', backgroundColor: '#fff' }}
        >
          Déconnexion
        </button>
      ),
      disabled: false
    }
  ]

  //点击展开收起侧边栏的按钮
  const setCollapsed = () => {
    console.log('collapse', collapse)
    dispatch(collapseMenu())
  }

  return (
    <Header className='header-container'>
      <Button
        type='text'
        style={{
          fontSize: '16px',
          width: 64,
          height: 32,
          backgroundColor: '#fff'
        }}
        icon={<MenuFoldOutlined />}
        onClick={() => setCollapsed()}
      />
      <Dropdown menu={{ items }}>
        <Avatar size={36} src={<img src={userImage} alt='userAvatar' />} />
      </Dropdown>
    </Header>
  )
}

export default CommonHeader