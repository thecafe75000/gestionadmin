import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Table } from 'antd'
import * as Icon from '@ant-design/icons'
import * as echarts from 'echarts'
import {getData} from '@/api'
import './index.css'
import userImage from '@/asssets/images/user.png'

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

  useEffect(() => {
    getData().then(({ data }) => {
      const { tableData } = data.data
      // console.log(tableData)
      setTableData(tableData)
    })

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('homepage'))
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
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
        <Card>
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
                <div className='icon-box' style={{backgroundColor:item.color}}>{iconToElement(item.icon)}</div>
                <div className='detail'>
                  <p className='chiff'> € {item.value}</p>
                  <p className='txt'>{item.name}</p>
                </div>
              </Card>
            )
          })}
        </div>
        <div id='homepage' style={{height:'300px'}}></div>
      </Col>
    </Row>
  )
}

export default Home