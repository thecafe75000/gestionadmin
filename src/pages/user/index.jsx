import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Input, Table, Popconfirm, Modal, InputNumber, Select, DatePicker} from 'antd'
import './index.css'
import { getUser, addUser, editUser, deleteUser} from '@/api'
import dayjs from 'dayjs'

const User = () => {
  const [userlistData, setUserlistData] = useState({ name: '' })
  const [tableData, setTableData] = useState([])
  // 弹窗, 0代表新增, 1代表编辑
  const [modalType, setModalType] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  const getTableData = useCallback(async () => {
    const result = await getUser(userlistData)
    const data = result.data
    setTableData(data.list)
  }, [userlistData])

 
  // 通过id进行删除
  const handleDelete = ({ id }) => {
    deleteUser({ id }).then(() => {
      getTableData()
    })
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

  const handleClick = (type, rowData) => {
    setIsModalOpen(!isModalOpen)
    if (type === 'add') {
      setModalType(0)
    } else {
      setModalType(1)
      const cloneData = JSON.parse(JSON.stringify(rowData))
      cloneData.birth = dayjs(cloneData.birth)
      // 表单数据回填
      form.setFieldsValue(cloneData)
    }
  }

  const handleSearch = (e) => {
    setUserlistData({
      name: e.keyword 
    })
    console.log('user page', e)
  }

   useEffect(() => {
     // 调用后端接口获取用户列表数据
     getTableData()
   }, [userlistData, getTableData])

  const handleOk = () => {
    // 弹窗里的表单校验
    form.validateFields().then((val) => {
      // 用第3方库dayjs进行日期格式化
      val.birth = dayjs(val.birth).format('YYYY-MM-DD')
      // 调后端接口
      if (modalType) {
        editUser(val).then(() => {
          handleCancel()
          getTableData()
        })
      } else {
        addUser(val).then(() => {
          handleCancel()
          getTableData()
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const handleCancel = () => {
    // 关闭弹窗
    setIsModalOpen(false)
    // 清空表单
    form.resetFields()
  }

  return (
    <div className='user'>
      <div className='flex-box'>
        <Button type='primary' onClick={() => handleClick('add')}>
          + new user
        </Button>
        <Form layout='inline' onFinish={handleSearch}>
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
      <Table style={{marginTop:'10px'}} columns={columns} dataSource={tableData} rowKey={'id'} />
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
          {modalType === 1 && (
            <Form.Item name='id' hidden>
              <Input />
            </Form.Item>
          )}
          <Form.Item
            label='Nom'
            name='name'
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
            <DatePicker placeholder='choose date' format='YYYY/MM/DD' />
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