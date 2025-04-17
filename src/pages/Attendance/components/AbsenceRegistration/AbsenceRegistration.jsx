// AbsenceRegistration.jsx
import React, { useState } from 'react'
import { Select, Card, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

// 模拟数据
const mockData = {
  1: { total: 120, absent: 2 },
  2: { total: 115, absent: 1 },
  3: { total: 130, absent: 1 },
  4: { total: 125, absent: 1 },
  5: { total: 140, absent: 2 },
  6: { total: 135, absent: 3 },
}

const AbsenceRegistration = () => {
  const navigate = useNavigate()
  const [selectedFloor, setSelectedFloor] = useState(null)
  // AbsenceRegistration.jsx
  const [floorData, setFloorData] = useState({
    1: {
      total: 120,
      absent: 2,
      rooms: [
        {
          room: '101',
          absentees: 2,
          students: [{ name: '张三', reason: '病假', status: 'confirmed' }],
        },
        {
          room: '101',
          absentees: 2,
          students: [{ name: '李四', reason: '病假', status: 'confirmed' }],
        },
      ],
    },
    2: {
      total: 115,
      absent: 1,
      rooms: [
        {
          room: '201',
          absentees: 1,
          students: [{ name: '王五', reason: '事假', status: 'confirmed' }],
        },
      ],
    },
    3: {
      total: 115,
      absent: 1,
      rooms: [
        {
          room: '311',
          absentees: 1,
          students: [{ name: '王五', reason: '事假', status: 'confirmed' }],
        },
      ],
    },
    4: {
      total: 130,
      absent: 1,
      rooms: [
        {
          room: '401',
          absentees: 1,
          students: [{ name: '王五', reason: '事假', status: 'confirmed' }],
        },
      ],
    },
    5: {
      total: 140,
      absent: 2,
      rooms: [
        {
          room: '505',
          absentees: 1,
          students: [{ name: '小明', reason: '事假', status: 'confirmed' }],
        },
      ],
    },
    6: {
      total: 135,
      absent: 3,
      rooms: [
        {
          room: '612',
          absentees: 1,
          students: [{ name: '康康', reason: '事假', status: 'confirmed' }],
        },
        {
          room: '615',
          absentees: 1,
          students: [{ name: '大明', reason: '事假', status: 'confirmed' }],
        },
        {
          room: '616',
          absentees: 1,
          students: [{ name: '小李', reason: '事假', status: 'confirmed' }],
        },
      ],
    },
    // 其他楼层数据...
  })

  // 计算考勤率
  const calculateAttendanceRate = floor => {
    const data = mockData[floor]
    return data ? (((data.total - data.absent) / data.total) * 100).toFixed(1) : 0
  }

  // 处理楼层点击
  const handleFloorClick = floor => {
    navigate(`/floor-details/${floor}`, {
      state: {
        floor: floor,
        data: floorData[floor], // 传递完整楼层数据
      },
    })
  }
  // 在父组件添加更新方法
  const updateAttendance = (floor, room, newData) => {
    setFloorData(prev => ({
      ...prev,
      [floor]: {
        ...prev[floor],
        rooms: prev[floor].rooms.map(r => (r.room === room ? { ...r, ...newData } : r)),
      },
    }))
  }
  return (
    <div style={{ padding: '20px' }}>
      <h1>缺勤登记</h1>

      {/* 楼层选择器 */}
      <div style={{ marginBottom: '20px' }}>
        <h2>选择楼层</h2>
        <Select
          placeholder="请选择楼层"
          style={{ width: 200, marginRight: '10px' }}
          onChange={value => setSelectedFloor(value)}
        >
          {[1, 2, 3, 4, 5, 6].map(floor => (
            <Option key={floor} value={floor}>
              {floor}楼
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={() => handleFloorClick(selectedFloor)} disabled={!selectedFloor}>
          查看详情
        </Button>
      </div>

      {/* 楼层卡片展示 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {[1, 2, 3, 4, 5, 6].map(floor => {
          const data = mockData[floor]
          return (
            <Card key={floor} title={`${floor}楼考勤统计`} hoverable onClick={() => handleFloorClick(floor)}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ margin: 0 }}>总人数: {data?.total || 0}</p>
                  <p style={{ margin: 0 }}>缺勤人数: {data?.absent || 0}</p>
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      color: calculateAttendanceRate(floor) >= 90 ? 'green' : 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    出勤率: {calculateAttendanceRate(floor)}%
                  </p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default AbsenceRegistration
