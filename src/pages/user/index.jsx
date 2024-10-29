import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Table, Popconfirm, Modal, InputNumber, Select, DatePicker} from 'antd'
import './index.css'
import { getUser } from '@/api'

const User = () => {
  const [userlistData, setUserlistData] = useState({ name: '' })
  const [tableData, setTableData] = useState([])
  const [modalType, setModalType] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  
  const getTableData = async () => {
    const result = await getUser(userlistData)
    const data = result.data
    setTableData(data.list)
  }

  const handleDelete = (data) => {
    
  }

  const columns = [
    {
      title: 'Nom de Client',
      dataIndex: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age'
    },
    {
      title: 'Genre',
      dataIndex: 'sex',
      render: (val) => {
        return val ? 'female' : 'male'
      }
    },
    {
      title: 'Anniversaire',
      dataIndex: 'birth'
    },
    {
      title: 'Adresse',
      dataIndex: 'addr'
    },
    {
      title: 'Operation',
      render: (rowData) => {
        return (
          <div className='operation'>
            <Button
              style={{ marginRight: '5px' }}
              onClick={() => handleClick('edit', rowData)}
            >
              Modifier
            </Button>
            <Popconfirm
              title='Avertir'
              description='Cette opération supprimera ce client, êtes-vous sûr?'
              onConfirm={() => handleDelete(rowData)}
            >
              <Button type='primary' danger>
                Supprimer
              </Button>
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
    setIsModalOpen(!isModalOpen)
    if (type === 'add') {
      setModalType(0)
    } else {
       setModalType(1)
    }
  }

  const handleFinish = (e) => {
    setUserlistData({
      name: e.name
    })
    console.log('user page', e)
  }

  const handleOk = () => {
    
  }

  const handleCancel = () => {
    setIsModalOpen(false)
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
      <Modal
        open={isModalOpen}
        title={modalType ? 'modifier' : '+ new user'}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          labelCol={{
            span: 6
          }}
          wrapperCol={{
            span: 18
          }}
          labelAlign='left'
        >
          <Form.Item
            label='Nom'
            name='username'
            rules={[
              {
                required: true,
                message: 'Please enter username'
              }
            ]}
          >
            <Input placeholder='Please enter username' />
          </Form.Item>
          <Form.Item
            label='Age'
            name='age'
            rules={[
              {
                required: true,
                message: 'Please enter age'
              },
              {
                type: 'number',
                message: 'Age must be a number'
              }
            ]}
          >
            <InputNumber placeholder='enter age' />
          </Form.Item>
          <Form.Item
            label='Genre'
            name='sex'
            rules={[
              {
                required: true,
                message: 'Gender is required'
              }
            ]}
          >
            <Select
              placeholder='please choose gender'
              options={[
                {
                  value: 0,
                  label: 'Male'
                },
                {
                  value: 1,
                  label: 'Female'
                }
              ]}
            />
          </Form.Item>
          <Form.Item
            label='Anniversaire'
            name='birth'
            rules={[
              {
                required: true,
                message: 'Anniversaire is required'
              }
            ]}
          >
            <DatePicker placeholder='choose date' format='DD/MM/YYYY' />
          </Form.Item>
          <Form.Item
            label='Adresse'
            name='addr'
            rules={[
              {
                required: true,
                message: 'Adresse is required'
              }
            ]}
          >
            <Input placeholder='enter adresse' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default User