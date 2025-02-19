import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Divider, List, Button, Modal, Tag, Typography, Badge } from 'antd'
import { Link } from 'react-router-dom'
import WordCloud from 'react-d3-cloud'

const { Text } = Typography

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedNotice, setSelectedNotice] = useState(null)
  const [wordData, setWordData] = useState([])
  const [notices, setNotices] = useState([])

  // 模拟后端获取消息云图数据
  useEffect(() => {
    // 这里可以替换为实际的 API 请求
    const mockWordData = [
      { text: '重要消息', value: 200 },
      { text: '一般通知', value: 50 },
      { text: '日常提醒', value: 30 },
      { text: '紧急公告', value: 20 },
      { text: '重要消息', value: 200 },
      { text: '一般通知', value: 50 },
      { text: '日常提醒', value: 30 },
      { text: '紧急公告', value: 20 },
      { text: '重要消息', value: 200 },
      { text: '一般通知', value: 50 },
      { text: '日常提醒', value: 30 },
      { text: '紧急公告', value: 20 },
      { text: '重要消息', value: 200 },
      { text: '一般通知', value: 50 },
      { text: '日常提醒', value: 30 },
      { text: '紧急公告', value: 20 },
      { text: '重要消息', value: 200 },
      { text: '一般通知', value: 50 },
      { text: '日常提醒', value: 30 },
      { text: '紧急公告', value: 20 },
    ]
    setWordData(mockWordData)
  }, [])

  // 模拟后端获取公告列表数据
  useEffect(() => {
    // 这里可以替换为实际的 API 请求
    const mockNotices = [
      { id: 1, title: '公告标题 1', content: '公告内容 1' },
      { id: 2, title: '公告标题 2', content: '公告内容 2' },
      { id: 3, title: '公告标题 3', content: '公告内容 3' },
    ]
    setNotices(mockNotices)
  }, [])

  const showModal = notice => {
    setSelectedNotice(notice)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const data = [
    '第一条公告',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ]
  return (
    <div>
      {/* 上方栅格列表 */}
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Link to="/pending">
            <Card title="待处理" extra={<Badge count={20} />} style={{ backgroundColor: '#e6f7ff' }}>
              <Tag color="blue">值日整改</Tag>
            </Card>
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/maintenance">
            <Card title="待处理" extra={<Badge count={20} />} style={{ backgroundColor: '#fff6cc' }}>
              <Tag color="yellow">待维修数</Tag>
            </Card>
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/violation">
            <Card title="待处理" extra={<Badge count={20} />} style={{ backgroundColor: '#ffe6e6' }}>
              <Tag color="red">违规违纪</Tag>
            </Card>
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/attendance">
            <Card title="待处理" extra={<Badge count={20} />} style={{ backgroundColor: '#e6fff2' }}>
              <Tag color="green">考勤统计</Tag>
            </Card>
          </Link>
        </Col>
      </Row>
      {/* 中间消息云图 */}
      <div style={{ height: '30vh', marginTop: 16 }}>
        <WordCloud
          data={wordData.map(d => ({ text: d.text, value: d.value }))}
          width={window.innerWidth}
          height={window.innerHeight * 0.3}
          font="Arial"
          fontSize={d => d.value}
        />
      </div>
      {/* 下方公告列表 */}
      <List
        size="small"
        header={<div>公高</div>}
        bordered
        dataSource={data}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </div>
  )
}

export default Home
