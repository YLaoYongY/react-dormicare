import React, { useState, useEffect } from 'react'
import { Row, Col, DatePicker, Select, Button, Table, Modal, Spin, message } from 'antd'
import { SearchOutlined, ReloadOutlined, ManOutlined, WomanOutlined, DeleteOutlined } from '@ant-design/icons'

const { Option } = Select
const { RangePicker } = DatePicker

// 模拟API请求
const mockApi = {
  getMajors: () => Promise.resolve(['计算机科学', '软件工程', '网络工程']),
  getClasses: (year, major) =>
    Promise.resolve([
      { id: 1, name: '计科1班', total: 30, male: 20, female: 10 },
      { id: 2, name: '软件1班', total: 28, male: 15, female: 13 },
    ]),
  getDormAssignments: classId =>
    Promise.resolve([
      {
        id: 'D101',
        type: '4人间',
        beds: [
          { id: 'D101-1', student: null },
          { id: 'D101-2', student: '张三' },
        ],
      },
    ]),
  getAvailableBeds: gender =>
    Promise.resolve([
      { id: 'D102-1', dormId: 'D102', type: '4人间' },
      { id: 'D103-1', dormId: 'D103', type: '6人间' },
    ]),
}

const RoommateAssignment = () => {
  const [loading, setLoading] = useState(false)
  const [majors, setMajors] = useState([])
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedMajor, setSelectedMajor] = useState(null)
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [assignGender, setAssignGender] = useState(null)
  const [availableBeds, setAvailableBeds] = useState([])

  // 初始化专业数据
  useEffect(() => {
    mockApi.getMajors().then(data => setMajors(data))
  }, [])

  // 处理搜索
  const handleSearch = () => {
    if (selectedYear && selectedMajor) {
      setLoading(true)
      mockApi.getClasses(selectedYear, selectedMajor).then(data => {
        setClasses(data)
        setLoading(false)
      })
    }
  }

  // 处理班级选择
  const handleClassSelect = classId => {
    const selected = classes.find(c => c.id === classId)
    setSelectedClass(selected)
    setLoading(true)
    mockApi.getDormAssignments(classId).then(data => {
      setAssignments(data)
      setLoading(false)
    })
  }

  // 打开分配模态框
  const handleAssignStart = gender => {
    if (!selectedClass) {
      message.error('请先选择班级')
      return
    }
    setAssignGender(gender)
    mockApi.getAvailableBeds(gender).then(data => {
      setAvailableBeds(data)
      setIsModalVisible(true)
    })
  }

  // 提交分配
  const handleAssignSubmit = () => {
    // 实际应调用分配API
    message.success('分配成功')
    setIsModalVisible(false)
  }

  // 表格列配置
  const columns = [
    {
      title: '宿舍编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '宿舍类型',
      dataIndex: 'type',
      key: 'type',
    },
  ]

  return (
    <div className="roommate-assignment">
      {/* 搜索栏 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <DatePicker picker="year" placeholder="选择年份" onChange={date => setSelectedYear(date.year())} />
        </Col>
        <Col span={6}>
          <Select placeholder="选择专业" style={{ width: '100%' }} onChange={value => setSelectedMajor(value)}>
            {majors.map(major => (
              <Option key={major} value={major}>
                {major}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={12}>
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
            搜索
          </Button>
          <Button icon={<ReloadOutlined />} style={{ marginLeft: 8 }}>
            重置
          </Button>
          <Button
            type="primary"
            icon={<ManOutlined />}
            style={{ marginLeft: 8 }}
            onClick={() => handleAssignStart('male')}
          >
            分配男生宿舍
          </Button>
          <Button
            type="primary"
            icon={<WomanOutlined />}
            style={{ marginLeft: 8 }}
            onClick={() => handleAssignStart('female')}
          >
            分配女生宿舍
          </Button>
          <Button danger icon={<DeleteOutlined />} style={{ marginLeft: 8 }}>
            清空宿舍
          </Button>
        </Col>
      </Row>

      {/* 数据展示 */}
      <Spin spinning={loading}>
        <Row gutter={24}>
          {/* 班级列表 */}
          <Col span={8}>
            <div className="class-list">
              {classes.map(cls => (
                <div
                  key={cls.id}
                  className={`class-item ${selectedClass?.id === cls.id ? 'selected' : ''}`}
                  onClick={() => handleClassSelect(cls.id)}
                >
                  <h4>{cls.name}</h4>
                  <div>总人数: {cls.total}</div>
                  <div>
                    男生: {cls.male} 女生: {cls.female}
                  </div>
                </div>
              ))}
            </div>
          </Col>

          {/* 宿舍分配情况 */}
          <Col span={16}>
            <Table
              columns={columns}
              dataSource={assignments}
              rowKey="id"
              expandable={{
                expandedRowRender: record => (
                  <div className="bed-list">
                    {record.beds.map(bed => (
                      <div key={bed.id} className="bed-item">
                        {bed.id} {bed.student ? `（${bed.student}）` : ''}
                      </div>
                    ))}
                  </div>
                ),
              }}
            />
          </Col>
        </Row>
      </Spin>

      {/* 分配模态框 */}
      <Modal
        title={`为 ${selectedClass?.name} 分配${assignGender === 'male' ? '男生' : '女生'}宿舍`}
        visible={isModalVisible}
        onOk={handleAssignSubmit}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        <div className="bed-selection">
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <Select placeholder="选择楼栋" style={{ width: '100%' }}>
                <Option value="A">A栋</Option>
                <Option value="B">B栋</Option>
              </Select>
            </Col>
            <Col span={12}>
              <Select placeholder="选择楼层" style={{ width: '100%' }}>
                <Option value="1">1楼</Option>
                <Option value="2">2楼</Option>
              </Select>
            </Col>
          </Row>

          <Table
            rowKey="id"
            dataSource={availableBeds}
            columns={[
              { title: '宿舍编号', dataIndex: 'dormId' },
              { title: '宿舍类型', dataIndex: 'type' },
              { title: '可用床位', render: () => '1/4' },
            ]}
            pagination={false}
          />
        </div>
      </Modal>
    </div>
  )
}

export default RoommateAssignment
