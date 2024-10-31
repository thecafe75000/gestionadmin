import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Table } from 'antd'
import * as Icon from '@ant-design/icons'
import {getData} from '@/api'
import './index.css'
import userImage from '@/asssets/images/user.png'
import Echarts from '@/components/Echarts'

const Home = () => {
  // 定义table数据(table的行的数据)
  const [tableData, setTableData] = useState([])
  // table的columns的数据
  const columns = [
    {
      title: 'Marque',
      dataIndex: 'name'
    },
    {
      title: 'CA du Jour',
      dataIndex: 'todayBuy'
    },
    {
      title: 'CA du mois',
      dataIndex: 'monthBuy'
    },
    {
      title: 'CA Total',
      dataIndex: 'totalBuy'
    }
  ]

  // 创建echarts的响应数据
  const [echartData, setEchartData] = useState({})

  useEffect(() => {
    async function fetchData() {
      const result = await getData()
      const { tableData, orderData, userData, videoData } = result.data.data
      // console.log(result.data.data, '数据')
      setTableData(tableData)
      const order = orderData
      const xData = order.date
      const series = []
      const keyArray = Object.keys(order.data[0])
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: order.data.map((item) => item[key]),
          type: 'line'
        })
      })
      setEchartData({
        order: {
          xData,
          series
        },
        user: {
          xData: userData.map((item) => item.date),
          series: [
            {
              name: 'new user',
              data: userData.map((item) => item.new),
              type: 'bar'
            },
            {
              name: 'active user',
              data: userData.map((item) => item.active),
              type: 'bar'
            }
          ]
        },
        video: {
          series: [
            {
              data: videoData,
              type: 'pie'
            }
          ]
        }
      })
    }
    fetchData()
  }, [])

  // 订单统计数据
  const countData = [
    {
      name: 'Commande',
      value: 1234,
      icon: 'CheckCircleOutlined',
      color: '#2ec7c9'
    },
    {
      name: 'Collection',
      value: 3421,
      icon: 'ClockCircleOutlined',
      color: '#ffb988'
    },
    {
      name: 'Achat',
      value: 1234,
      icon: 'CloseCircleOutlined',
      color: '#5ab1ef'
    },
    {
      name: 'Vente',
      value: 1234,
      icon: 'CheckCircleOutlined',
      color: '#2ec7c9'
    },
    {
      name: 'CA en ligne',
      value: 3421,
      icon: 'ClockCircleOutlined',
      color: '#ffb980'
    },
    {
      name: 'CA en boutique',
      value: 1234,
      icon: 'CloseCircleOutlined',
      color: '#5ab1ef'
    }
  ]

  // 动态获取 countData 里的icon的方法
  // 需要把 countData 里的icon转换成一个组件
  const iconToElement = (name) => React.createElement(Icon[name])

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
        <Card style={{ marginTop: '10px' }}>
          <Table
            dataSource={tableData}
            columns={columns}
            pagination={false}
            rowKey='name'
          />
        </Card>
      </Col>
      <Col span={16}>
        <div className='num'>
          {countData.map((item, index) => {
            return (
              <Card key={index}>
                <div
                  className='icon-box'
                  style={{ backgroundColor: item.color }}
                >
                  {iconToElement(item.icon)}
                </div>
                <div className='detail'>
                  <p className='chiff'> € {item.value}</p>
                  <p className='txt'>{item.name}</p>
                </div>
              </Card>
            )
          })}
        </div>
        {echartData.order && (
          <Echarts chartData={echartData.order} style={{ height: '280px' }} />
        )}
        <div className='graph'>
          {echartData.user && (
            <Echarts
              chartData={echartData.user}
              style={{ height: '240px', width: '50%' }}
            />
          )}
          {echartData.video && (
            <Echarts
              chartData={echartData.video}
              isAxisChart={false}
              style={{ height: '260px', width: '50%' }}
            />
          )}
        </div>
      </Col>
    </Row>
  )
}

export default Home