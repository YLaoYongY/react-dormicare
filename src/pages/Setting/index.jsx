import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Table, Modal, Radio, Select, message, Row, Col } from 'antd'

const UserManagement = () => {
  const [form] = Form.useForm()
  const [searchForm] = Form.useForm()
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingId, setEditingId] = useState(null)

  // 模拟初始数据
  useEffect(() => {
    setData([
      {
        id: 1,
        name: '张三',
        phone: '13800138000',
        email: 'zhangsan@example.com',
        gender: 'male',
        role: 'student',
        account: 'zhangsan',
        password: '123456',
      },
    ])
    setFilteredData([
      {
        id: 1,
        name: '张三',
        phone: '13800138000',
        email: 'zhangsan@example.com',
        gender: 'male',
        role: 'student',
        account: 'zhangsan',
        password: '123456',
      },
    ])
  }, [])

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      render: (text, record) =>
        editingId === record.id ? <Input value={text} onChange={e => handleEditChange(e, record.id, 'name')} /> : text,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      render: (text, record) =>
        editingId === record.id ? <Input value={text} onChange={e => handleEditChange(e, record.id, 'phone')} /> : text,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      render: (text, record) =>
        editingId === record.id ? <Input value={text} onChange={e => handleEditChange(e, record.id, 'email')} /> : text,
    },
    {
      title: '操作',
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              if (editingId === record.id) {
                handleSave(record.id)
              } else {
                setEditingId(record.id)
              }
            }}
          >
            {editingId === record.id ? '保存' : '编辑'}
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </>
      ),
    },
  ]

  const handleSearch = values => {
    const filtered = data.filter(item => {
      return (!values.name || item.name.includes(values.name)) && (!values.phone || item.phone.includes(values.phone))
    })
    setFilteredData(filtered)
  }

  const handleReset = () => {
    searchForm.resetFields()
    setFilteredData(data)
  }

  const handleAdd = () => {
    setIsModalVisible(true)
  }

  const handleEditChange = (e, id, field) => {
    const newData = data.map(item => {
      if (item.id === id) {
        return { ...item, [field]: e.target.value }
      }
      return item
    })
    setData(newData)
    setFilteredData(newData)
  }

  const handleSave = id => {
    setEditingId(null)
    message.success('修改保存成功')
  }

  const handleDelete = id => {
    const newData = data.filter(item => item.id !== id)
    setData(newData)
    setFilteredData(newData)
    message.success('删除成功')
  }

  const handleAddSubmit = values => {
    const newUser = {
      id: Date.now(),
      ...values,
    }
    setData([...data, newUser])
    setFilteredData([...data, newUser])
    setIsModalVisible(false)
    form.resetFields()
    message.success('新增用户成功')
  }

  return (
    <div style={{ padding: 20 }}>
      {/* 搜索栏 */}
      <Form form={searchForm} onFinish={handleSearch} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item label="姓名" name="name" style={{ marginRight: 16 }}>
          <Input placeholder="请输入姓名" style={{ width: 120 }} />
        </Form.Item>

        <Form.Item label="电话" name="phone" style={{ marginRight: 16 }}>
          <Input placeholder="请输入电话" style={{ width: 150 }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            搜索
          </Button>
          <Button onClick={handleReset} style={{ marginRight: 8 }}>
            重置
          </Button>
          <Button type="primary" onClick={handleAdd}>
            新增
          </Button>
        </Form.Item>
      </Form>

      {/* 用户表格 */}
      <Table columns={columns} dataSource={filteredData} rowKey="id" bordered style={{ marginTop: 20 }} />

      {/* 新增用户模态框 */}
      <Modal title="新增用户" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleAddSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="电话" name="phone" rules={[{ required: true, message: '请输入电话' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="邮箱" name="email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="性别" name="gender" rules={[{ required: true, message: '请选择性别' }]}>
                <Radio.Group>
                  <Radio value="male">男</Radio>
                  <Radio value="female">女</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="角色" name="role" rules={[{ required: true, message: '请选择角色' }]}>
                <Select>
                  <Select.Option value="student">学生</Select.Option>
                  <Select.Option value="committee">宿委</Select.Option>
                  <Select.Option value="dormManager">宿管</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="账户" name="account" rules={[{ required: true, message: '请输入账户' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UserManagement
