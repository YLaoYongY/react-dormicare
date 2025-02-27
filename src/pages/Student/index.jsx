import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Input, Select, Table, Modal, Tag } from 'antd'
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
    const select = e.target.closest('.ant-select-selector')
    if (select) {
      const input = select.querySelector('input')
      if (input) {
        input.removeAttribute('readonly')
        input.focus()
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

  return (
    <div style={{ padding: 24 }}>
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
        </div>

        {/* 第二行筛选条件 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
          <Form.Item label="院系" name="department">
            <Select
              style={{ width: 180 }}
              options={[
                { label: '信息技术分院', value: '信息技术分院' },
                { label: '生物科技分院', value: '生物科技分院' },
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
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>
            查询
          </Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Form.Item>
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
    </div>
  )
}

export default Student
