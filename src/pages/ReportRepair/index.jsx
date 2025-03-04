import React, { useState } from 'react'
import { Card, Table, Tag, Input, Select, DatePicker, Button, Modal, Flex, Image } from 'antd'
import moment from 'moment'
const { Option } = Select
const { RangePicker } = DatePicker
import a from '@/assets/1.png'
import b from '@/assets/2.png'
import c from '@/assets/3.jpg'

const MaintenanceRequest = () => {
  const [selectedTime, setSelectedTime] = useState([])
  const [selectedFacility, setSelectedFacility] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchSubmitter, setSearchSubmitter] = useState('')
  const [currentRecord, setCurrentRecord] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  // 模拟假数据
  const [requestData, setRequestData] = useState([
    {
      key: '1',
      facility: 'A栋电梯',
      description: '电梯门无法正常关闭',
      images: [a, b],
      submitter: '王老师',
      submitTime: '2025-03-10 14:30',
      status: '待批阅',
    },
    {
      key: '2',
      facility: 'B栋水管',
      description: '卫生间水管漏水',
      images: [c],
      submitter: '李同学',
      submitTime: '2024-03-10 14:30',
      status: '处理中',
    },
    // 更多数据...
  ])

  // 表格列配置
  const columns = [
    {
      title: '设施名称',
      dataIndex: 'facility',
      key: 'facility',
    },
    {
      title: '损坏描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '现场照片',
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
      // sorter: (a, b) => moment(a.submitTime) - moment(b.submitTime),
    },
    {
      title: '处理状态',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === '待批阅' ? 'orange' : status === '处理中' ? 'blue' : 'green'}>{status}</Tag>
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
          disabled={record.status === '已完成'}
        >
          {record.status === '待批阅' ? '审批' : '查看进度'}
        </Button>
      ),
    },
  ]

  // 筛选逻辑
  const filteredData = requestData.filter(item => {
    // 时间筛选逻辑
    const timeCondition =
      selectedTime.length === 0
        ? true
        : new Date(item.submitTime) >= selectedTime[0].startOf('day') &&
          new Date(item.submitTime) <= selectedTime[1].endOf('day')

    // 其他筛选条件保持不变
    const facilityCondition = selectedFacility === 'all' || item.facility.includes(selectedFacility)
    const statusCondition = selectedStatus === 'all' || item.status === selectedStatus
    const submitterCondition = searchSubmitter === '' || item.submitter.includes(searchSubmitter)
    // console.log(selectedTime)

    return timeCondition && facilityCondition && statusCondition && submitterCondition
  })

  // 处理状态变更
  const handleStatusChange = newStatus => {
    setRequestData(prev => prev.map(item => (item.key === currentRecord.key ? { ...item, status: newStatus } : item)))
    setModalVisible(false)
  }
  // 在状态管理部分添加重置方法
  const handleResetFilters = () => {
    setSelectedTime([])
    setSelectedFacility('all')
    setSelectedStatus('all')
    setSearchSubmitter('')
    // console.log(selectedFacility, selectedStatus)
  }
  return (
    <Card
      title={
        <Flex gap={16} wrap="wrap">
          <RangePicker
            onChange={dates => setSelectedTime(dates || [])} // 添加null保护
            value={selectedTime} // 保持受控状态
          />
          <Select
            placeholder="设施类型"
            style={{ width: 150 }}
            onChange={value => setSelectedFacility(value)}
            value={selectedFacility}
          >
            <Option value="all">全部设施</Option>
            <Option value="电梯">电梯</Option>
            <Option value="水管">水管</Option>
            <Option value="电路">电路</Option>
          </Select>
          <Select
            placeholder="处理状态"
            style={{ width: 120 }}
            onChange={value => setSelectedStatus(value)}
            value={selectedStatus}
          >
            <Option value="all">全部状态</Option>
            <Option value="待批阅">待批阅</Option>
            <Option value="处理中">处理中</Option>
            <Option value="已完成">已完成</Option>
          </Select>
          <Input.Search
            placeholder="搜索提交人"
            allowClear
            onSearch={value => setSearchSubmitter(value)}
            style={{ width: 200 }}
          />
          <Button
            type="default"
            onClick={handleResetFilters}
            style={{
              transition: 'all 0.3s',
              ':hover': {
                transform: 'scale(1.05)',
              },
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
          emptyText: <div style={{ padding: 40 }}>暂无维修申请</div>,
        }}
      />

      <Modal
        title={`维修处理 - ${currentRecord?.facility}`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={
          currentRecord?.status === '待批阅'
            ? [
                <Button key="cancel" onClick={() => setModalVisible(false)}>
                  关闭
                </Button>,
                <Button key="reject" danger onClick={() => handleStatusChange('已拒绝')}>
                  拒绝申请
                </Button>,
                <Button key="approve" type="primary" onClick={() => handleStatusChange('处理中')}>
                  批准申请
                </Button>,
              ]
            : [
                <Button key="close" type="primary" onClick={() => setModalVisible(false)}>
                  关闭
                </Button>,
              ]
        }
        width={800}
      >
        {currentRecord && (
          <div style={{ lineHeight: '32px' }}>
            <p>
              <strong>设施名称：</strong>
              {currentRecord.facility}
            </p>
            <p>
              <strong>问题描述：</strong>
              {currentRecord.description}
            </p>
            <p>
              <strong>提交人：</strong>
              {currentRecord.submitter}
            </p>
            <p>
              <strong>提交时间：</strong>
              {currentRecord.submitTime}
            </p>
            <p>
              <strong>当前状态：</strong>
              {currentRecord.status}
            </p>
            <div style={{ marginTop: 16 }}>
              <strong>现场照片：</strong>
              <Image.PreviewGroup>
                <Flex gap={8} wrap="wrap">
                  {currentRecord?.images?.map((img, index) => (
                    <Image key={index} src={img} width={120} height={90} style={{ borderRadius: 4 }} />
                  ))}
                </Flex>
              </Image.PreviewGroup>
            </div>
          </div>
        )}
      </Modal>
    </Card>
  )
}

export default MaintenanceRequest
