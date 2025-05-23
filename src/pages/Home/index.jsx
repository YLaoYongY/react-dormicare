import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Divider, List, Button, Modal, Tag, Typography, Badge } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import WordCloud from 'react-d3-cloud'
import { useSelector } from 'react-redux'

const { Title, Text } = Typography

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedNotice, setSelectedNotice] = useState(null)
  const [wordData, setWordData] = useState([])
  const [notices, setNotices] = useState([])
  const [dutyCount, setDutyCount] = useState(useSelector(state => state.message.duty_rectification))
  const [report_repair, setReport_repair] = useState(useSelector(state => state.message.report_repair))
  const [violation_handling, setViolation_handling] = useState(useSelector(state => state.message.violation_handling))
  const [absence_registration, setAbsence_registration] = useState(
    useSelector(state => state.message.absence_registration)
  )
  const location = useLocation()
  useEffect(() => {
    setDutyCount(localStorage.getItem('duty_rectification'))
    setReport_repair(localStorage.getItem('report_repair'))
    setViolation_handling(localStorage.getItem('violation_handling'))
    setAbsence_registration(localStorage.getItem('absence_registration'))
  }, [])
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
    // dutyCount = useSelector(state => state.message.duty_rectification || 0)
    console.log(dutyCount)
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

  // 公告数据
  const noticesData = [
    { id: 1, title: '公告一', content: '这是公告一的内容' },
    { id: 2, title: '公告二', content: '这是公告二的内容' },
    // 更多公告...
  ]
  // 消息红点数据
  // const messageState = useSelector(state => state.message)
  // console.log(messageState)

  // 获取特定字段
  // const getMessageState = () => {
  //   dutyCount = useSelector(state => state.message.duty_rectification)
  //   console.log(dutyCount)
  // }
  // 模拟后端获取公告列表数据
  useEffect(() => {
    // 这里可以替换为实际的 API 请求
    const mockNotices = [
      { id: 1, title: '公告标题 1', content: '公告内容 1' },
      { id: 2, title: '公告标题 2', content: '公告内容 2' },
      { id: 3, title: '公告标题 3', content: '公告内容 3' },
    ]
    const noticeData = JSON.parse(localStorage.getItem('noticeData'))
    const length = noticeData.length - 1
    // console.log(length)

    // console.log([noticeData[length], noticeData[length - 1]])
    if (noticeData && noticeData.length > 1) {
      setNotices([noticeData[length], noticeData[length - 1]])
    } else {
      setNotices(mockNotices)
    }
  }, [])

  return (
    <div>
      {/* 上方栅格列表 */}
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Link to="/duty-rectification">
            <Card
              title="待处理"
              extra={dutyCount ? <Badge count={dutyCount} /> : ''}
              style={{ backgroundColor: '#e6f7ff' }}
            >
              <Tag color="blue">值日整改</Tag>
            </Card>
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/report-repair">
            <Card
              title="待处理"
              extra={report_repair ? <Badge count={report_repair} /> : ''}
              style={{ backgroundColor: '#fff6cc' }}
            >
              <Tag color="yellow">待维修数</Tag>
            </Card>
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/violation-handling">
            <Card
              title="待处理"
              extra={violation_handling ? <Badge count={violation_handling} /> : ''}
              style={{ backgroundColor: '#ffe6e6' }}
            >
              <Tag color="red">违规违纪</Tag>
            </Card>
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/absence-registration">
            <Card
              title="待处理"
              extra={absence_registration ? <Badge count={absence_registration} /> : ''}
              style={{ backgroundColor: '#e6fff2' }}
            >
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
          height={window.innerHeight * 0.4}
          font="Arial"
          fontSize={d => d.value}
        />
      </div>
      {/* 下方公告列表 */}

      <List
        size="small"
        style={{ marginTop: '20px', fontSize: '14px' }} // 设置小一点的字号
        header={<div style={{ fontSize: '18px', fontWeight: 'bold' }}>公高</div>}
        bordered
        dataSource={notices}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => showModal(item)}>
                查看
              </Button>,
            ]}
          >
            <List.Item.Meta title={item.title} description={item.content} />
          </List.Item>
        )}
      />
      <Modal
        title={selectedNotice ? selectedNotice.title : '公告'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            确认
          </Button>,
        ]}
      >
        <p>{selectedNotice ? selectedNotice.content : '请选择一个公告'}</p>
      </Modal>
    </div>
  )
}

export default Home
