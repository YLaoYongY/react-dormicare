import React, { useState } from 'react'
import { Line, Pie } from '@ant-design/charts'
import { List, Button, Typography, DatePicker, Card, Row, Col } from 'antd'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography

const Attendance = () => {
  const [deadlineAM, setDeadlineAM] = useState(new Date())
  const [deadlinePM, setDeadlinePM] = useState(new Date())

  // 模拟数据
  const lineData = [
    { date: '2023-01-01', count: 5 },
    { date: '2023-01-02', count: 3 },
    // 更多数据...
  ]

  const pieData1 = [
    { type: '原因1', value: 20 },
    { type: '原因2', value: 30 },
    // 更多数据...
  ]

  const pieData2 = [
    { type: '1层', value: 20 },
    { type: '2层', value: 30 },
    // 更多数据...
  ]

  const pieData3 = [
    { type: '上午', value: 20 },
    { type: '下午', value: 30 },
    { type: '晚上', value: 50 },
  ]

  const pieData4 = [
    { type: '1天', value: 15 },
    { type: '2天', value: 60 },
    { type: '3天', value: 25 },
  ]

  // 模拟任务清单数据
  const taskListAM = [
    { id: 1, room: '101', status: '待审核' },
    // 更多数据...
  ]

  const taskListPM = [
    { id: 1, room: '102', status: '待审核' },
    // 更多数据...
  ]

  const lineConfig = {
    data: lineData,
    xField: 'date',
    yField: 'count',
    seriesField: 'type',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
    },
    height: 400, // 设置高度
  }

  const pieConfig = {
    data: pieData1,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    height: 200, // 设置高度
  }

  const pieConfig2 = {
    data: pieData2,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    height: 200, // 设置高度
  }

  const pieConfig3 = {
    data: pieData3,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    height: 200, // 设置高度
  }

  const pieConfig4 = {
    data: pieData4,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    height: 200, // 设置高度
  }

  return (
    <div>
      <Title level={2}>值日统计</Title>
      <Line {...lineConfig} />

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Pie {...pieConfig} />
          <Title level={5} style={{ textAlign: 'center', color: '#1890ff' }}>
            原因导致卫生不合格
          </Title>
        </Col>
        <Col span={6}>
          <Pie {...pieConfig2} />
          <Title level={5} style={{ textAlign: 'center', color: '#1890ff' }}>
            楼层卫生不合格
          </Title>
        </Col>
        <Col span={6}>
          <Pie {...pieConfig3} />
          <Title level={5} style={{ textAlign: 'center', color: '#1890ff' }}>
            时间段卫生不合格
          </Title>
        </Col>
        <Col span={6}>
          <Pie {...pieConfig4} />
          <Title level={5} style={{ textAlign: 'center', color: '#1890ff' }}>
            连续几天卫生不合格
          </Title>
        </Col>
      </Row>

      <Title level={3} style={{ marginTop: '20px' }}>
        任务清单
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Title level={4} style={{ textAlign: 'center' }}>
            上午
          </Title>
          <List
            itemLayout="horizontal"
            dataSource={taskListAM}
            renderItem={item => (
              <List.Item actions={[<Link to={`/audit/${item.id}`}>审核</Link>]}>
                <List.Item.Meta title={item.room} description={`状态: ${item.status}`} />
              </List.Item>
            )}
          />
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={deadlineAM}
            onChange={setDeadlineAM}
            style={{ marginBottom: '20px' }}
          />
        </Col>
        <Col span={12}>
          <Title level={4} style={{ textAlign: 'center' }}>
            下午
          </Title>
          <List
            itemLayout="horizontal"
            dataSource={taskListPM}
            renderItem={item => (
              <List.Item actions={[<Link to={`/audit/${item.id}`}>审核</Link>]}>
                <List.Item.Meta title={item.room} description={`状态: ${item.status}`} />
              </List.Item>
            )}
          />
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={deadlinePM}
            onChange={setDeadlinePM}
            style={{ marginBottom: '20px' }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Attendance
