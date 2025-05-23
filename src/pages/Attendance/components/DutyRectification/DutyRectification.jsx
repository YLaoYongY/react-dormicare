import React, { useEffect, useState } from 'react'
import { Card, Table, Tag, Input, Select, DatePicker, Button, Modal, Flex, Image, Form } from 'antd'
import moment from 'moment'
const { Option } = Select
const { RangePicker } = DatePicker
import a from '@/assets/1.png'
import b from '@/assets/2.png'
import c from '@/assets/3.jpg'
import { useDispatch } from 'react-redux'
import { setDuty_rectification } from '@/store/components/message'
const DutyRectification = () => {
  const [selectedTime, setSelectedTime] = useState([])
  const [selectedType, setSelectedType] = useState('all') // 改为整改类型
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchDormNumber, setSearchDormNumber] = useState('') // 新增宿舍号搜索
  const [currentRecord, setCurrentRecord] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false) // 新增打回模态框
  const [rejectReason, setRejectReason] = useState('')

  // 修改后的模拟数据
  const [requestData, setRequestData] = useState([
    {
      key: '1',
      bedNumber: 'A101-1',
      dormNumber: 'A101',
      rectificationType: '卫生整改',
      images: [a],
      submitter: '王老师',
      submitTime: '2024-03-10T14:30:00',
      status: '待处理',
    },
    {
      key: '2',
      bedNumber: 'B202-3',
      dormNumber: 'B202',
      rectificationType: '设施整改',
      images: [b],
      submitter: '李同学',
      submitTime: '2024-03-16T14:30:00',
      status: '整改合格',
    },
  ])
  // 筛选待处理逻辑
  const filterMessageData = () => {
    const dispatch = useDispatch()

    // 状态同步逻辑
    useEffect(() => {
      const validData = requestData.filter(item => moment(item.submitTime).isValid())

      // 同步待处理数量
      const pendingCount = validData.filter(item => item.status === '待处理').length
      dispatch(setDuty_rectification(pendingCount))

      // 同步其他数据（示例）
      // dispatch(updateAllData(validData))
    }, [requestData, dispatch])
    const filterdata = requestData.filter(item => {
      return item.status === '待处理'
    })
    console.log(filterdata.length)
    dispatch(setDuty_rectification(filterdata.length))
  }
  filterMessageData()

  // 修改后的表格列配置
  const columns = [
    {
      title: '床位',
      dataIndex: 'bedNumber',
      key: 'bedNumber',
    },
    {
      title: '整改类型',
      dataIndex: 'rectificationType',
      key: 'rectificationType',
    },
    {
      title: '整改照片',
      dataIndex: 'images',
      key: 'images',
      render: images => (
        <Image.PreviewGroup items={images || []}>
          <Flex gap={8} wrap="wrap">
            {images.map((img, index) => (
              <Image key={index} src={img} width={80} height={60} style={{ borderRadius: 4 }} />
            ))}
          </Flex>
        </Image.PreviewGroup>
      ),
    },
    {
      title: '提交人',
      dataIndex: 'submitter',
      key: 'submitter',
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
    },
    {
      title: '处理状态',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === '待处理' ? 'orange' : status === '整改合格' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Flex gap={8}>
          <Button type="primary" onClick={() => handleApprove(record)} disabled={record.status !== '待处理'}>
            通过
          </Button>
          <Button
            danger
            onClick={() => {
              setCurrentRecord(record)
              setIsRejectModalVisible(true)
            }}
            disabled={record.status !== '待处理'}
          >
            打回
          </Button>
        </Flex>
      ),
    },
  ]

  // 处理通过
  const handleApprove = record => {
    console.log(record)
    setRequestData(prev => prev.map(item => (item.key === record.key ? { ...item, status: '整改合格' } : item)))
    filterMessageData()
  }

  // 处理打回
  const handleReject = () => {
    setRequestData(prev =>
      prev.map(item =>
        item.key === currentRecord.key
          ? {
              ...item,
              status: '已打回',
              rejectReason,
            }
          : item
      )
    )
    setIsRejectModalVisible(false)
    setRejectReason('')
    filterMessageData()
  }

  const filteredData = requestData.filter(item => {
    // 转换提交时间为moment对象
    const submitMoment = moment(item.submitTime)
    const timeCondition =
      selectedTime.length === 0
        ? true
        : new Date(item.submitTime) >= selectedTime[0].startOf('day') &&
          new Date(item.submitTime) <= selectedTime[1].endOf('day')

    const typeCondition = selectedType === 'all' || item.rectificationType === selectedType
    const dormCondition = searchDormNumber === '' || item.dormNumber.includes(searchDormNumber.toUpperCase())
    const statusCondition = selectedStatus === 'all' || item.status === selectedStatus
    filterMessageData()
    return timeCondition && typeCondition && dormCondition && statusCondition
  })

  return (
    <Card
      title={
        <Flex gap={16} wrap="wrap">
          <RangePicker
            onChange={dates => setSelectedTime(dates || [])} // 确保始终为数组
            value={selectedTime}
          />
          <Input
            placeholder="宿舍号"
            allowClear
            onChange={e => setSearchDormNumber(e.target.value)}
            style={{ width: 120 }}
          />
          <Select placeholder="整改类型" style={{ width: 150 }} value={selectedType} onChange={setSelectedType}>
            <Option value="all">全部类型</Option>
            <Option value="卫生整改">卫生整改</Option>
            <Option value="设施整改">设施整改</Option>
            <Option value="纪律整改">纪律整改</Option>
          </Select>
          <Select
            placeholder="处理状态"
            style={{ width: 120 }}
            value={selectedStatus ? selectedStatus : []}
            onChange={setSelectedStatus}
          >
            <Option value="all">全部状态</Option>
            <Option value="待处理">待处理</Option>
            <Option value="整改合格">整改合格</Option>
            <Option value="已打回">已打回</Option>
          </Select>
          <Button
            onClick={() => {
              setSelectedTime([])
              setSelectedType('all')
              setSelectedStatus('all')
              setSearchDormNumber('')
            }}
          >
            重置筛选
          </Button>
        </Flex>
      }
    >
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 6 }}
        locale={{
          emptyText: <div style={{ padding: 40 }}>暂无整改记录</div>,
        }}
      />

      {/* 打回原因模态框 */}
      <Modal
        title={`打回整改 - ${currentRecord?.dormNumber} ${currentRecord?.bedNumber}`}
        open={isRejectModalVisible}
        onCancel={() => setIsRejectModalVisible(false)}
        onOk={handleReject}
      >
        <Form layout="vertical">
          <Form.Item label="打回原因">
            <Input.TextArea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="请输入打回原因（可选）"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}

export default DutyRectification
