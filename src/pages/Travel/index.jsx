import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Table, Modal, Select, DatePicker, message } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker

const TravelManagement = () => {
  const [form] = Form.useForm()
  const [searchForm] = Form.useForm()
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingId, setEditingId] = useState(null)

  // 模拟初始数据
  useEffect(() => {
    const initialData = [
      {
        id: 1,
        name: '张三',
        type: '病假',
        dorm: '1号楼101室',
        time: ['2023-10-01 08:00', '2023-10-03 18:00'],
        remark: '肠胃不适需要休息',
      },
    ]
    setData(initialData)
    setFilteredData(initialData)
  }, [])

  const columns = [
    {
      title: '请假时间',
      dataIndex: 'time',
      render: (time, record) => {
        if (editingId === record.id) {
          return (
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              value={[moment(time[0]), moment(time[1])]}
              onChange={(dates, dateStrings) => handleEditChange(dateStrings, record.id, 'time')}
            />
          )
        }
        return `${time[0]} ~ ${time[1]}`
      },
    },
    {
      title: '请假人',
      dataIndex: 'name',
      render: (text, record) =>
        editingId === record.id ? (
          <Input value={text} onChange={e => handleEditChange(e.target.value, record.id, 'name')} />
        ) : (
          text
        ),
    },
    {
      title: '请假类型',
      dataIndex: 'type',
      render: (text, record) =>
        editingId === record.id ? (
          <Select value={text} style={{ width: 120 }} onChange={value => handleEditChange(value, record.id, 'type')}>
            <Select.Option value="病假">病假</Select.Option>
            <Select.Option value="事假">事假</Select.Option>
            <Select.Option value="公假">公假</Select.Option>
          </Select>
        ) : (
          text
        ),
    },
    {
      title: '所在宿舍',
      dataIndex: 'dorm',
      render: (text, record) =>
        editingId === record.id ? (
          <Input value={text} onChange={e => handleEditChange(e.target.value, record.id, 'dorm')} />
        ) : (
          text
        ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      render: (text, record) =>
        editingId === record.id ? (
          <Input.TextArea value={text} onChange={e => handleEditChange(e.target.value, record.id, 'remark')} />
        ) : (
          text
        ),
    },
    {
      title: '操作',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEditAction(record.id)}>
            {editingId === record.id ? '保存' : '编辑'}
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </>
      ),
    },
  ]

  // 处理编辑操作
  const handleEditAction = id => {
    if (editingId === id) {
      setEditingId(null)
      message.success('修改保存成功')
    } else {
      setEditingId(id)
    }
  }

  // 通用修改处理
  const handleEditChange = (value, id, field) => {
    const newData = data.map(item => (item.id === id ? { ...item, [field]: value } : item))
    setData(newData)
    setFilteredData(newData)
  }

  // 删除处理
  const handleDelete = id => {
    const newData = data.filter(item => item.id !== id)
    setData(newData)
    setFilteredData(newData)
    message.success('删除成功')
  }

  // 搜索处理
  const handleSearch = values => {
    const results = data.filter(item => {
      const nameMatch = values.name ? item.name.includes(values.name) : true
      const typeMatch = values.type ? item.type === values.type : true
      return nameMatch && typeMatch
    })
    setFilteredData(results)
  }

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields()
    setFilteredData(data)
  }

  // 新增提交
  const handleAddSubmit = values => {
    const newRecord = {
      id: Date.now(),
      ...values,
      time: values.time.map(t => moment(t).format('YYYY-MM-DD HH:mm')),
    }

    setData([...data, newRecord])
    setFilteredData([...data, newRecord])
    setIsModalVisible(false)
    form.resetFields()
    message.success('新增成功')
  }

  return (
    <div style={{ padding: 20 }}>
      {/* 搜索栏 */}
      <Form form={searchForm} layout="inline" onFinish={handleSearch} style={{ marginBottom: 24 }}>
        <Form.Item label="请假人" name="name">
          <Input placeholder="请输入姓名" style={{ width: 150 }} />
        </Form.Item>

        <Form.Item label="请假类型" name="type">
          <Select placeholder="全部类型" style={{ width: 120 }}>
            <Select.Option value="病假">病假</Select.Option>
            <Select.Option value="事假">事假</Select.Option>
            <Select.Option value="公假">公假</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            搜索
          </Button>
          <Button onClick={handleReset} style={{ marginRight: 8 }}>
            重置
          </Button>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            新增
          </Button>
        </Form.Item>
      </Form>

      {/* 数据表格 */}
      <Table columns={columns} dataSource={filteredData} rowKey="id" bordered pagination={{ pageSize: 8 }} />

      {/* 新增弹窗 */}
      <Modal
        title="新增请假"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleAddSubmit} initialValues={{ remark: '' }}>
          <Form.Item label="请假时间" name="time" rules={[{ required: true, message: '请选择请假时间' }]}>
            <RangePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="请假人姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="请假类型" name="type" rules={[{ required: true, message: '请选择类型' }]}>
            <Select>
              <Select.Option value="病假">病假</Select.Option>
              <Select.Option value="事假">事假</Select.Option>
              <Select.Option value="公假">公假</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="所在宿舍" name="dorm" rules={[{ required: true, message: '请输入宿舍信息' }]}>
            <Input placeholder="例：1号楼101室" />
          </Form.Item>

          <Form.Item label="备注" name="remark">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TravelManagement
