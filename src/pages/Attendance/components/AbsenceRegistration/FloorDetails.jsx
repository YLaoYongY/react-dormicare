import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Row, Col, List, Tag, Statistic } from 'antd'
import { TeamOutlined, UserOutlined, WarningOutlined } from '@ant-design/icons'

// 模拟数据（实际使用时需要替换为API获取的数据）
const mockData = {
  3: [
    {
      room: '301',
      absentees: 2,
      students: [
        { name: '张三', reason: '病假', status: 'confirmed' },
        { name: '李四', reason: '无故缺勤', status: 'unconfirmed' },
      ],
    },
    { room: '305', absentees: 1, students: [{ name: '王五', reason: '事假', status: 'confirmed' }] },
  ],
}

const FloorDetails = () => {
  const { floor } = useParams()
  const data = mockData[floor] || []

  // 统计信息
  const totalAbsent = data.reduce((sum, room) => sum + room.absentees, 0)
  const mostAbsentRoom = data.sort((a, b) => b.absentees - a.absentees)[0]?.room || '无'

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: '24px', color: '#1a3353' }}>
          <WarningOutlined style={{ marginRight: 8, color: '#ff4d4f' }} />
          {floor}楼缺勤详情
        </h1>

        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={8}>
            <Statistic
              title="总缺勤人数"
              value={totalAbsent}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Col>
          <Col span={8}>
            <Statistic title="最多缺勤宿舍" value={mostAbsentRoom} prefix={<UserOutlined />} />
          </Col>
        </Row>
      </div>

      <Row gutter={[16, 16]}>
        {data.map((room, index) => (
          <Col key={index} xs={24} sm={12} lg={8}>
            <Card
              title={`${room.room} 宿舍`}
              bordered={false}
              headStyle={{ backgroundColor: '#f0f5ff', border: 'none' }}
            >
              <List
                header={<div>缺勤人员 ({room.absentees}人)</div>}
                dataSource={room.students}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      style={{ cursor: 'pointer', padding: '12px' }}
                      onClick={() => navigate(`/profile/${encodeURIComponent(item.name)}`)}
                      title={item.name}
                      description={
                        <Tag color={item.status === 'confirmed' ? '#f50' : '#ff4d4f'} style={{ marginTop: 8 }}>
                          {item.reason}
                        </Tag>
                      }
                    />
                    <span>{item.status === 'confirmed' ? '已确认' : '待确认'}</span>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {data.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>当前楼层暂无缺勤记录</div>
      )}
    </div>
  )
}

export default FloorDetails
