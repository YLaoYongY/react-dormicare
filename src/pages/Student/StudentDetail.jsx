import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, Descriptions, Tag, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import './studentDetail.scss'

const mockStudent = {
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
  dormMembers: ['李四', '王五', '赵六'],
  dormManagerPhone: '13800138001',
}

const StudentDetail = () => {
  const { id } = useParams()

  return (
    <div className="student-detail" style={{ padding: 24 }}>
      <Button className="back-btn" type="link" icon={<ArrowLeftOutlined />}>
        <Link to="/student">返回列表</Link>
      </Button>
      <Card title="学生详细信息" bordered={false}>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="姓名">{mockStudent.name}</Descriptions.Item>
          <Descriptions.Item label="宿舍号">{mockStudent.dorm}</Descriptions.Item>
          <Descriptions.Item label="职位">
            {mockStudent.position.map(p => (
              <Tag key={p}>{p}</Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="院系">{mockStudent.department}</Descriptions.Item>
          <Descriptions.Item label="年级">{mockStudent.grade}</Descriptions.Item>
          <Descriptions.Item label="班级">{mockStudent.className}</Descriptions.Item>
          <Descriptions.Item label="班主任">
            <span className="contact-info">
              {mockStudent.teacher.name}（{mockStudent.teacher.phone}）
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="辅导员">
            {mockStudent.counselor.name}（{mockStudent.counselor.phone}）
          </Descriptions.Item>
          <Descriptions.Item label="所在楼层">{mockStudent.floor}</Descriptions.Item>
          <Descriptions.Item label="层长">{mockStudent.floorManager}</Descriptions.Item>
          <Descriptions.Item label="宿舍成员" span={2}>
            <div className="dorm-members">
              {mockStudent.dormMembers.map(m => (
                <Tag key={m}>{m}</Tag>
              ))}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="宿舍长联系方式">{mockStudent.dormManagerPhone}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}

export default StudentDetail
