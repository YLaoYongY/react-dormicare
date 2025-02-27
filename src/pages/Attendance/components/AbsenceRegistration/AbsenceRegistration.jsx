import React, { useState } from 'react'
import { Select, Card, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

const AbsenceRegistration = () => {
  const navigate = useNavigate()
  const [selectedFloor, setSelectedFloor] = useState(null)

  const handleFloorClick = floor => {
    navigate(`/floor-details/${floor}`)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>缺勤登记</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>选择楼层</h2>
        <Select
          placeholder="请选择楼层"
          style={{ width: 200, marginRight: '10px' }}
          onChange={value => setSelectedFloor(value)}
        >
          <Option value="1">1楼</Option>
          <Option value="2">2楼</Option>
          <Option value="3">3楼</Option>
          <Option value="4">4楼</Option>
          <Option value="5">5楼</Option>
          <Option value="6">6楼</Option>
        </Select>
        <Button type="primary" onClick={() => handleFloorClick(selectedFloor)}>
          查看详情
        </Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {[1, 2, 3].map(floor => (
          <Card
            key={floor}
            title={`${floor}楼考勤统计`}
            style={{ width: '30%', cursor: 'pointer' }}
            onClick={() => handleFloorClick(floor)}
          >
            <p>缺勤人数: 5</p>
            <p>出勤率: 90%</p>
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {[4, 5, 6].map(floor => (
          <Card
            key={floor}
            title={`${floor}楼考勤统计`}
            style={{ width: '30%', cursor: 'pointer' }}
            onClick={() => handleFloorClick(floor)}
          >
            <p>缺勤人数: 5</p>
            <p>出勤率: 90%</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AbsenceRegistration
