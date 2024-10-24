import React from 'react'
import { Col, Row, Card } from 'antd'
import './index.css'
import userImage from '../../asssets/images/user.png'

const Home = () => {
  return (
    <Row className='home'>
      <Col span={8}>
        <Card hoverable>
          <div className='user'>
            <img src={userImage} alt='user' />
            <div className='userinfo'>
              <p className='admin'>Admin</p>
              <p className='access'>Gestionnaire</p>
            </div>
          </div>
          <div className='login-info'>
            <p>
              connexion dernière:<span>2021-07-19</span>
            </p>
            <p>
              lieu de connexion:&nbsp;&nbsp;&nbsp;<span>Paris</span>
            </p>
          </div>
        </Card>
      </Col>
      <Col span={16}></Col>
    </Row>
  )
}

export default Home