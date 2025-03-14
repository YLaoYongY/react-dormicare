import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Table, Modal, DatePicker, message } from 'antd'
import moment from 'moment'
import { setNotice, addNotice } from '@/store/components/notice'
import { useDispatch } from 'react-redux'

const NoticeManagement = () => {
  const [form] = Form.useForm()
  const [searchForm] = Form.useForm()
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const { RangePicker } = DatePicker
  const dispatch = useDispatch()
  // 模拟初始数据
  useEffect(() => {
    setData([
      {
        id: 1,
        title: '国庆放假通知',
        content: '国庆假期安排如下...',
        createTime: '2023-09-28 10:00',
      },
      {
        id: 2,
        title: '中秋节放假通知',
        content: '中秋节假期安排如下...',
        createTime: '2023-09-15 09:00',
      },
    ])
    setFilteredData([
      {
        id: 1,
        title: '国庆放假通知',
        content: '国庆假期安排如下...',
        createTime: '2023-09-28 10:00',
      },
      {
        id: 2,
        title: '中秋节放假通知',
        content: '中秋节假期安排如下...',
        createTime: '2023-09-15 09:00',
      },
    ])
  }, [])
  const handleSetNotice = data => {
    dispatch(setNotice(data))
    console.log('设置成功')
  }

  useEffect(() => {
    const localNoticeData = localStorage.getItem('noticeData')
    if (!localNoticeData) {
      handleSetNotice(data)
    } else {
      console.log(...data, JSON.parse(localNoticeData))
      setFilteredData(...data, JSON.parse(localNoticeData))
    }
  }, [])

  // const [noticeData] = data
  // console.log(data)
  // console.log(noticeData)
  // handleSetNotice(data)

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (text, record) =>
        editingId === record.id ? (
          <Input value={text} onChange={e => handleEditChange(e.target.value, record.id, 'title')} />
        ) : (
          text
        ),
    },
    {
      title: '公告内容',
      dataIndex: 'content',
      render: (text, record) =>
        editingId === record.id ? (
          <Input value={text} onChange={e => handleEditChange(e.target.value, record.id, 'content')} />
        ) : (
          text
        ),
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      render: (_, record) => (
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
      ),
    },
  ]

  const handleSearch = values => {
    const filtered = data.filter(item => {
      const timeCondition = values.time ? moment(item.createTime).isBetween(values.time[0], values.time[1]) : true
      return (!values.title || item.title.includes(values.title)) && timeCondition
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

  const handleEditChange = (value, id, field) => {
    const newData = data.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value }
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

  // 新增逻辑
  const handleAddSubmit = values => {
    const newNotice = {
      id: Date.now(),
      ...values,
      createTime: moment().format('YYYY-MM-DD HH:mm'),
    }
    setData([...data, newNotice])
    setFilteredData([...data, newNotice])
    setIsModalVisible(false)
    form.resetFields()
    dispatch(addNotice(newNotice))
    message.success('新增公告成功')
  }

  return (
    <div style={{ padding: 20 }}>
      {/* 搜索栏 */}
      <Form form={searchForm} onFinish={handleSearch} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item label="公告标题" name="title" style={{ marginRight: 16 }}>
          <Input placeholder="请输入标题" style={{ width: 150 }} />
        </Form.Item>

        <Form.Item label="发布时间" name="time" style={{ marginRight: 16 }}>
          <RangePicker showTime format="YYYY-MM-DD HH:mm" />
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

      {/* 公告表格 */}
      <Table columns={columns} dataSource={filteredData} rowKey="id" bordered />

      {/* 新增公告模态框 */}
      <Modal title="新增公告" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAddSubmit}>
          <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="公告内容" name="content" rules={[{ required: true, message: '请输入内容' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
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

export default NoticeManagement
