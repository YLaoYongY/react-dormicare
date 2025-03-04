import React, { useState } from 'react'
import { Table, Tag, Button, Card } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const RoomChange = () => {
  // 模拟数据
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      applicant: '张三',
      applyDorm: 'A栋302',
      applyBed: '1号床',
      targetUser: '李四',
      targetDorm: 'B栋105',
      targetBed: '3号床',
      applyStatus: '审核通过',
      execStatus: '待调换',
    },
    {
      key: '2',
      applicant: '王五',
      applyDorm: 'C栋201',
      applyBed: '2号床',
      targetUser: '赵六',
      targetDorm: 'A栋415',
      targetBed: '4号床',
      applyStatus: '审核未通过',
      execStatus: '已调换',
    },
  ])

  // 表格列配置
  const columns = [
    {
      title: '申请人',
      dataIndex: 'applicant',
      key: 'applicant',
      width: 120,
    },
    {
      title: '申请宿舍',
      dataIndex: 'applyDorm',
      key: 'applyDorm',
      width: 120,
    },
    {
      title: '申请床位',
      dataIndex: 'applyBed',
      key: 'applyBed',
      width: 120,
    },
    {
      title: '调换人',
      dataIndex: 'targetUser',
      key: 'targetUser',
      width: 120,
    },
    {
      title: '调换宿舍',
      dataIndex: 'targetDorm',
      key: 'targetDorm',
      width: 120,
    },
    {
      title: '调换床位',
      dataIndex: 'targetBed',
      key: 'targetBed',
      width: 120,
    },
    {
      title: '申请状态',
      dataIndex: 'applyStatus',
      key: 'applyStatus',
      render: status => (
        <Tag
          color={status === '审核通过' ? '#e6f4ff' : '#fff1f0'}
          style={{
            color: status === '审核通过' ? '#1677ff' : '#ff4d4f',
            border: 'none',
          }}
        >
          {status}
        </Tag>
      ),
      width: 130,
    },
    {
      title: '执行状态',
      dataIndex: 'execStatus',
      key: 'execStatus',
      render: status => (
        <Tag
          color={status === '已调换' ? '#f6ffed' : '#fffbe6'}
          style={{
            color: status === '已调换' ? '#52c41a' : '#faad14',
            border: 'none',
          }}
        >
          {status}
        </Tag>
      ),
      width: 130,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            type="text"
            icon={<CheckOutlined style={{ color: '#52c41a' }} />}
            style={{ padding: '4px 8px' }}
            onClick={() => handleStatusChange(record.key, '审核通过')}
          />
          <Button
            type="text"
            icon={<CloseOutlined style={{ color: '#ff4d4f' }} />}
            style={{ padding: '4px 8px' }}
            onClick={() => handleStatusChange(record.key, '审核未通过')}
          />
        </div>
      ),
      width: 100,
    },
  ]
  // 添加状态更新方法
  const handleStatusChange = (key, newStatus) => {
    setDataSource(prev => prev.map(item => (item.key === key ? { ...item, applyStatus: newStatus } : item)))
  }

  return (
    <Card
      title="宿舍调换申请"
      headStyle={{ border: 'none' }}
      bodyStyle={{ padding: 0 }}
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered={false}
        scroll={{ x: 1100 }}
        style={{
          border: 'none',
          borderRadius: 8,
        }}
        rowClassName={() => 'antd-custom-row'}
      />
    </Card>
  )
}

// 在全局CSS中添加：
// .antd-custom-row:hover td { background: #fafafa !important; }
// .ant-table-thead th { background: #fff !important; border-bottom: 1px solid #f0f0f0 !important; }

export default RoomChange
