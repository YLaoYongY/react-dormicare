// FloorDetails.jsx
import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Table, Tag, Card, Modal, Button } from 'antd'

const FloorDetails = () => {
  const location = useLocation()
  const { floor } = useParams()

  // 从路由state获取数据
  const { data } = location.state || {}
  const [editingRoom, setEditingRoom] = useState(null)
  // 列配置
  const columns = [
    {
      title: '房间号',
      dataIndex: 'room',
      key: 'room',
      width: 120,
    },
    {
      title: '缺勤人数',
      dataIndex: 'absentees',
      key: 'absentees',
      width: 100,
    },
    {
      title: '缺勤详情',
      dataIndex: 'students',
      key: 'students',
      render: students => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {students.map((student, index) => (
            <Tag key={index} color={student.status === 'confirmed' ? 'green' : 'volcano'}>
              {student.name}（{student.reason}）
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button size="small" onClick={() => setEditingRoom(record)}>
          编辑
        </Button>
      ),
    },
  ]

  return (
    <div style={{ padding: 20 }}>
      <Card title={`${floor}楼考勤总览`} style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 40 }}>
          <div>
            <p style={{ margin: 0 }}>总人数: {data?.total || 0}</p>
            <p style={{ margin: 0 }}>缺勤人数: {data?.absent || 0}</p>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                color: data && ((data.total - data.absent) / data.total) * 100 >= 90 ? 'green' : 'red',
                fontWeight: 'bold',
              }}
            >
              出勤率: {data ? (((data.total - data.absent) / data.total) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
      </Card>

      <Table
        columns={columns}
        dataSource={data?.rooms || []}
        rowKey="room"
        pagination={false}
        bordered
        scroll={{ x: 800 }}
      />
      <Modal
        visible={!!editingRoom}
        onCancel={() => setEditingRoom(null)}
        onOk={() => {
          // 调用父组件更新方法
          updateAttendance(floor, editingRoom.room, newData)
          setEditingRoom(null)
        }}
      >
        {/* 编辑表单 */}
      </Modal>
    </div>
  )
}

export default FloorDetails
