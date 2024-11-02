import React from 'react'
import { Button, Form, Input, message} from 'antd'
import {getConnexion} from '@/api'
import './index.css'
import { useNavigate, Navigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  // 只有在登录状态下才可以跳转到home首页
  if (localStorage.getItem('token')) {
    return <Navigate to='/home' replace/>
  }
  const handleSubmit = async (val) => {
    if (!val.password || !val.username) {
      return message.open({
        type: 'warning',
        content: 'Saisir votre compte et mot de passe'
      })
    }
    const result = await getConnexion(val)
    const { token } = result.data.data 
    localStorage.setItem('token', token)
    navigate('/home')
  }

  return (
    <Form className='login-container' onFinish={handleSubmit}>
      <div className='login-title'>Page de Connexion</div>
      <Form.Item label='Utilisateur' name='username'>
        <Input placeholder='Votre compte' autoComplete='username' />
      </Form.Item>
      <Form.Item label='Mot de passe' name='password'>
        <Input.Password
          placeholder='Saisir mot de passe'
          autoComplete='current-password'
        />
      </Form.Item>
      <Form.Item className='login-button'>
        <Button type='primary' htmlType='submit'>
          Me connecter
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login