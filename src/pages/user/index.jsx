import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Table, Popconfirm} from 'antd'
import './index.css'
import { getUser } from '@/api'

const User = () => {
  const [userlistData, setUserlistData] = useState({ name: '' })
  const [tableData, setTableData] = useState([])
  
  const getTableData = async () => {
    const result = await getUser(userlistData)
    const data = result.data
    setTableData(data.list)
  }

  const handleDelete = (data) => {
    
  }

  const columns = [
    {
      title: 'Username',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'sex',
      render: (val) => {
        return val ? 'female' : 'male'
      }
    },
    {
      title: 'Birthday',
      dataIndex: 'birth',
    },
    {
      title: 'Address',
      dataIndex: 'addr',
    },
    {
      title: 'Operation',
      render: (rowData) => {
        return (
          <div className='operation'>
            <Button style={{ marginRight: '5px' }} onClick={() => handleClick('edit', rowData)}>Edit</Button>
            <Popconfirm
              title='Warn'
              description='This operation will delete the user, are you sure?'
              onConfirm={()=>handleDelete(rowData)}
            >
               <Button type='primary' danger>Delete</Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]

  useEffect(() => {
    // 调用后端接口获取用户列表数据
    getTableData()
  }, [])

  const handleClick = (type, data) => {
    
  }

  const handleFinish = (e) => {
    setUserlistData({
      name: e.name
    })
    console.log('user page', e)
  }

  return (
    <div className='user'>
      <div className='flex-box'>
        <Button type='primary' onClick={() => handleClick('add')}>
          + new user
        </Button>
        <Form layout='inline' onFinish={handleFinish}>
          <Form.Item name='keyword'>
            <Input placeholder='Please enter username' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary'>
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table columns={columns} dataSource={tableData} rowKey={'id'} />
    </div>
  )
}

export default User