import React, { useState } from 'react'
import { Card, Table, Tag, Input, Select, DatePicker, Button, Modal, Flex } from 'antd'
const { Option } = Select
const { RangePicker } = DatePicker

const ViolationHandling = () => {
  const [selectedTime, setSelectedTime] = useState([])
  const [selectedType, setSelectedType] = useState('all')
  const [selectedFloor, setSelectedFloor] = useState('all')
  const [searchId, setSearchId] = useState('')
  const [currentRecord, setCurrentRecord] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  // 模拟假数据
  const [violationData, setViolationData] = useState([
    {
      key: '1',
      studentName: '王小明',
      studentId: '2023001',
      dormNumber: 'A101',
      violationType: '晚归',
      date: '2024-03-05 23:58',
      status: '未处理',
    },
    {
      key: '2',
      studentName: '李思思',
      studentId: '2023002',
      dormNumber: 'B205',
      violationType: '违规电器',
      date: '2024-03-10 19:20',
      status: '未处理',
    },
    {
      key: '3',
      studentName: '张伟',
      studentId: '2023003',
      dormNumber: 'A302',
      violationType: '晚归',
      date: '2024-04-01 00:05',
      status: '已确认',
    },
    {
      key: '4',
      studentName: '陈芳',
      studentId: '2023004',
      dormNumber: 'B110',
      violationType: '噪音扰民',
      date: '2024-04-15 22:30',
      status: '未处理',
    },
    {
      key: '5',
      studentName: '刘洋',
      studentId: '2023005',
      dormNumber: 'A215',
      violationType: '违规电器',
      date: '2024-04-20 18:45',
      status: '已消除',
    },
    {
      key: '6',
      studentName: '赵敏',
      studentId: '2023006',
      dormNumber: 'B308',
      violationType: '晚归',
      date: '2024-05-02 23:55',
      status: '未处理',
    },
    {
      key: '7',
      studentName: '周杰',
      studentId: '2023007',
      dormNumber: 'A103',
      violationType: '违规电器',
      date: '2024-05-10 20:15',
      status: '已确认',
    },
    {
      key: '8',
      studentName: '林娜',
      studentId: '2023008',
      dormNumber: 'B209',
      violationType: '噪音扰民',
      date: '2024-05-18 21:00',
      status: '未处理',
    },
    {
      key: '9',
      studentName: '吴强',
      studentId: '2023009',
      dormNumber: 'A410',
      violationType: '晚归',
      date: '2024-05-20 00:10',
      status: '未处理',
    },
    {
      key: '10',
      studentName: '郑爽',
      studentId: '2023010',
      dormNumber: 'B115',
      violationType: '违规电器',
      date: '2024-05-25 19:30',
      status: '已消除',
    },
  ])

  // 表格列配置
  const columns = [
    {
      title: '学生姓名',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: '宿舍号',
      dataIndex: 'dormNumber',
      key: 'dormNumber',
    },
    {
      title: '违规类型',
      dataIndex: 'violationType',
      key: 'violationType',
    },
    {
      title: '违规时间',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: '处理状态',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === '未处理' ? 'orange' : status === '已确认' ? 'red' : 'green'}>{status}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            setCurrentRecord(record)
            setModalVisible(true)
          }}
          disabled={record.status !== '未处理'}
        >
          处理
        </Button>
      ),
    },
  ]

  // 处理筛选逻辑
  const filteredData = violationData.filter(item => {
    // 时间筛选
    const timeCondition =
      selectedTime.length === 0
        ? true
        : new Date(item.date) >= selectedTime[0].startOf('day') && new Date(item.date) <= selectedTime[1].endOf('day')

    // 类型筛选
    const typeCondition = selectedType === 'all' || item.violationType === selectedType

    // 楼层筛选
    const floorCondition = selectedFloor === 'all' || item.dormNumber.startsWith(selectedFloor)

    // 学号筛选
    const idCondition = searchId === '' || item.studentId.includes(searchId)
    console.log(selectedTime)

    return timeCondition && typeCondition && floorCondition && idCondition
  })

  // 处理状态变更
  const handleStatusChange = newStatus => {
    setViolationData(prev => prev.map(item => (item.key === currentRecord.key ? { ...item, status: newStatus } : item)))
    setModalVisible(false)
  }

  return (
    <Card
      title={
        <Flex gap={16} wrap="wrap">
          <RangePicker onChange={dates => setSelectedTime(dates || [])} value={selectedTime} />
          <Select placeholder="违规类型" style={{ width: 150 }} onChange={value => setSelectedType(value)}>
            <Option value="all">全部类型</Option>
            <Option value="晚归">晚归</Option>
            <Option value="违规电器">违规电器</Option>
          </Select>
          <Select placeholder="选择楼层" style={{ width: 120 }} onChange={value => setSelectedFloor(value)}>
            <Option value="all">全部楼层</Option>
            <Option value="A">A栋</Option>
            <Option value="B">B栋</Option>
          </Select>
          <Input.Search
            placeholder="输入学号"
            allowClear
            onSearch={value => setSearchId(value)}
            style={{ width: 200 }}
          />
        </Flex>
      }
    >
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 6 }}
        locale={{
          emptyText: <div style={{ padding: 40 }}>暂无违规记录</div>,
        }}
      />

      <Modal
        title={`违规处理 - ${currentRecord?.violationType}`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            取消
          </Button>,
          <Button key="confirm" type="primary" onClick={() => handleStatusChange('已确认')}>
            确认违规
          </Button>,
          <Button key="eliminate" danger onClick={() => handleStatusChange('已消除')}>
            消除记录
          </Button>,
        ]}
      >
        {currentRecord && (
          <div style={{ lineHeight: '32px' }}>
            <p>学生姓名：{currentRecord.studentName}</p>
            <p>学号：{currentRecord.studentId}</p>
            <p>违规时间：{currentRecord.date}</p>
            <p>当前状态：{currentRecord.status}</p>
          </div>
        )}
      </Modal>
    </Card>
  )
}

export default ViolationHandling
