import React, { useEffect, useState, useForm } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Input, Select, Table, Modal, Tag, Popconfirm, message } from 'antd'

import './index.scss'

const mockStudents = [
  {
    id: 1,
    name: '张三',
    dorm: '301',
    position: ['宿舍长'],
    department: '计算机学院',
    grade: '2022级',
    className: '1班',
    teacher: { name: '王老师', phone: '13800138000' },
    counselor: { name: '李老师', phone: '13900139000' },
    floor: '3楼',
    floorManager: '陈层长',
  },
  // 更多模拟数据...
]

const departments = {
  信息技术分院: ['计算机本科班', '物联网工程班', '软件工程班', '人工智能实验班', '大数据技术班'],
  生物科技分院: ['宠物护理专业', '畜牧兽医班', '生物技术班', '动物医学班', '食品科学班'],
}

const dormData = {
  '1楼': ['101', '102', '103', '104', '105'],
  '2楼': ['201', '202', '203', '204', '205'],
  '3楼': ['301', '302', '303', '304', '305'],
  '4楼': ['401', '402', '403', '404', '405'],
}

const Student = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState(mockStudents)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 })
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)

  const columns = [
    { title: '宿舍号', dataIndex: 'dorm', key: 'dorm' },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`/student/${record.id}`}>{text}</Link>,
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
      render: positions => positions.map(p => <Tag key={p}>{p}</Tag>),
    },
    { title: '院系', dataIndex: 'department', key: 'department' },
    { title: '年级', dataIndex: 'grade', key: 'grade' },
    { title: '班级', dataIndex: 'className', key: 'className' },
    {
      title: '班主任',
      dataIndex: 'teacher',
      render: teacher => (
        <Button type="link" onClick={() => showStaffInfo(teacher)}>
          {teacher.name}
        </Button>
      ),
    },
    {
      title: '辅导员',
      dataIndex: 'counselor',
      render: counselor => (
        <Button type="link" onClick={() => showStaffInfo(counselor)}>
          {counselor.name}
        </Button>
      ),
    },
    { title: '楼层', dataIndex: 'floor', key: 'floor' },
    { title: '层长', dataIndex: 'floorManager', key: 'floorManager' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" onClick={() => handleResetPwd(record)}>
            重置密码
          </Button>
          <Popconfirm title="确认删除该学生？" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  const handleSearch = values => {
    const filtered = mockStudents.filter(student => {
      return Object.entries(values).every(([key, value]) => {
        if (!value) return true
        if (key === 'floor') return student.floor === value
        if (key === 'dorm') return student.dorm === value
        if (key === 'department') return student.department === value
        if (key === 'grade') return student.grade === value
        if (key === 'className') return student.className === value
        return student[key]?.includes?.(value)
      })
    })
    setData(filtered)
  }

  const handleDoubleClick = e => {
    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
      const select = e.target.closest('.ant-select-selector')
      if (select) {
        const input = select.querySelector('input')
        if (input) {
          input.removeAttribute('readonly')
          input.focus()
        }
      }
    }
  }

  const showStaffInfo = staff => {
    setSelectedStaff(staff)
    setModalVisible(true)
  }

  useEffect(() => {
    form.setFieldsValue({ className: undefined })
  }, [form.getFieldValue('department')])

  // 重置搜索框
  const searchRest = () => {
    form.resetFields()
    setData(mockStudents)
  }
  // 添加处理逻辑
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  // 编辑处理
  const [editForm] = Form.useForm()

  // 修改handleEdit方法
  const handleEdit = student => {
    setSelectedStudent(student)
    editForm.setFieldsValue({
      name: student.name,
      dorm: student.dorm,
      department: student.department,
      grade: student.grade,
      className: student.className,
      floor: student.floor,
      // 其他需要编辑的字段...
    })
    setEditModalVisible(true)
  }

  // 添加表单提交处理
  // 编辑表单提交处理
  const handleEditSubmit = values => {
    setData(prev => prev.map(item => (item.id === selectedStudent.id ? { ...item, ...values } : item)))
    message.success('修改成功')
    setEditModalVisible(false)
  }
  // 重置密码
  const handleResetPwd = student => {
    // 实际开发中应调用API
    message.success(`已重置${student.name}的密码为默认密码`)
  }

  // 删除处理
  const handleDelete = id => {
    setData(prev => prev.filter(item => item.id !== id))
    message.success('删除成功')
  }
  return (
    <div>
      <Form form={form} layout="inline" onFinish={handleSearch}>
        {/* 第一行筛选条件 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
          <Form.Item label="楼层" name="floor">
            <Select
              style={{ width: 120 }}
              options={Object.keys(dormData).map(floor => ({
                label: floor,
                value: floor,
              }))}
              onDoubleClick={handleDoubleClick}
            />
          </Form.Item>

          <Form.Item label="宿舍号" name="dorm">
            <Select
              style={{ width: 120 }}
              options={(form.getFieldValue('floor')
                ? dormData[form.getFieldValue('floor')]
                : Object.values(dormData).flat()
              ).map(dorm => ({
                label: dorm,
                value: dorm,
              }))}
              onDoubleClick={handleDoubleClick}
            />
          </Form.Item>

          <Form.Item label="宿舍长" name="dormManager">
            <Input style={{ width: 120 }} />
          </Form.Item>

          <Form.Item label="层长" name="floorManager">
            <Input style={{ width: 120 }} />
          </Form.Item>
          <Form.Item label="院系" name="department">
            <Select
              style={{ width: 180 }}
              options={[
                { label: '信息技术分院', value: '信息技术分院' },
                { label: '生物科技分院', value: '生物科技分院' },
              ]}
            />
          </Form.Item>
          <Form.Item label="专业" name="major">
            <Select
              style={{ width: 120 }}
              options={[
                { label: '计算机', value: '计算机' },
                { label: '物联网', value: '物联网' },
                // 其他专业...
              ]}
            />
          </Form.Item>
          <Form.Item label="年级" name="grade">
            <Select
              style={{ width: 120 }}
              options={Array.from({ length: 6 }, (_, i) => 2020 + i).map(year => ({
                label: `${year}级`,
                value: `${year}级`,
              }))}
            />
          </Form.Item>

          <Form.Item label="班级" name="className">
            <Select
              style={{ width: 180 }}
              options={(form.getFieldValue('department')
                ? departments[form.getFieldValue('department')]
                : Object.values(departments).flat()
              ).map(cls => ({
                label: cls,
                value: cls,
              }))}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>
              查询
            </Button>
            <Button onClick={() => searchRest()}>重置</Button>
          </Form.Item>
        </div>
      </Form>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
        }}
        bordered
        rowKey="id"
      />

      <Modal title="联系方式" visible={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        {selectedStaff && (
          <div>
            <p>姓名：{selectedStaff.name}</p>
            <p>电话：{selectedStaff.phone}</p>
          </div>
        )}
      </Modal>
      <Modal
        title="编辑学生信息"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setEditModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={() => editForm.submit()}>
            确认
          </Button>,
        ]}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditSubmit}>
          <Form.Item label="姓名" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="宿舍号" name="dorm" rules={[{ required: true }]}>
            <Select
              options={Object.values(dormData)
                .flat()
                .map(d => ({ label: d, value: d }))}
            />
          </Form.Item>

          <Form.Item label="院系" name="department" rules={[{ required: true }]}>
            <Select
              options={[
                { label: '信息技术分院', value: '信息技术分院' },
                { label: '生物科技分院', value: '生物科技分院' },
              ]}
            />
          </Form.Item>

          <Form.Item label="年级" name="grade" rules={[{ required: true }]}>
            <Select
              options={Array.from({ length: 6 }, (_, i) => 2020 + i).map(year => ({
                label: `${year}级`,
                value: `${year}级`,
              }))}
            />
          </Form.Item>

          <Form.Item label="班级" name="className" rules={[{ required: true }]}>
            <Select
              options={departments[editForm.getFieldValue('department')]?.map(cls => ({
                label: cls,
                value: cls,
              }))}
            />
          </Form.Item>

          <Form.Item label="楼层" name="floor" rules={[{ required: true }]}>
            <Select options={Object.keys(dormData).map(f => ({ label: f, value: f }))} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Student
