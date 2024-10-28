import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Table } from 'antd'
import {getData} from '@/api'
import './index.css'
import userImage from '@/asssets/images/user.png'

const Home = () => {
  // 定义table数据(table的行的数据)
  const [tableData, setTableData] = useState([])
  // table的columns的数据
   const columns = [
     {
       title: '品牌',
       dataIndex: 'name'
     },
     {
       title: '今日购买',
       dataIndex: 'todayBuy'
     },
     {
       title: '本月购买',
       dataIndex: 'monthBuy'
     },
     {
       title: '总购买',
       dataIndex: 'totalBuy'
     }
   ]

  useEffect(() => {
    getData().then(({ data }) => {
      const { tableData } = data.data
      console.log(tableData)
      setTableData(tableData)
    })
  }, [])

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
        <Card>
          <Table dataSource={tableData} columns={columns} pagination={false} rowKey='name'/>
        </Card>
      </Col>
      <Col span={16}></Col>
    </Row>
  )
}

export default Home