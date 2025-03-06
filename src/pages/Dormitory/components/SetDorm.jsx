import React, { useState } from 'react'
import { Button, Table, message, Divider } from 'antd'
import './SetDorm.scss'

const buildingData = ['1栋', '2栋', '3栋', '4栋', '5栋', '6栋', '7栋', '8栋', '9栋', '10栋', '11栋']

const dormitoryData = {
  '1层': [
    { id: 'M501', type: '4人间', peopleCount: 4 },
    { id: 'M502', type: '6人间', peopleCount: 6 },
  ],
  '2层': [
    { id: 'M601', type: '4人间', peopleCount: 4 },
    { id: 'M602', type: '6人间', peopleCount: 6 },
  ],
}

const SetDorm = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('1栋')
  const [selectedFloor, setSelectedFloor] = useState('1层')
  const [dataSource, setDataSource] = useState(
    dormitoryData['1层'].map(dorm => ({
      ...dorm,
      beds: Array.from({ length: dorm.peopleCount }, (_, index) => `${dorm.id}-${index + 1}`),
    }))
  )

  const handleBuildingChange = building => {
    setSelectedBuilding(building)
    setSelectedFloor('1层')
    setDataSource(
      dormitoryData['1层'].map(dorm => ({
        ...dorm,
        beds: Array.from({ length: dorm.peopleCount }, (_, index) => `${dorm.id}-${index + 1}`),
      }))
    )
  }

  const handleFloorChange = floor => {
    setSelectedFloor(floor)
    setDataSource(
      dormitoryData[floor]?.map(dorm => ({
        ...dorm,
        beds: Array.from({ length: dorm.peopleCount }, (_, index) => `${dorm.id}-${index + 1}`),
      })) || []
    )
  }

  const handleSetNumbering = () => {
    message.success('编号设置成功！')
  }

  const handleInitBed = () => {
    message.success('床位初始化成功！')
  }

  const handleEdit = (record, type) => {
    message.info(`编辑${type}信息: ${record}`)
  }

  const handleDelete = (record, type) => {
    if (type === '宿舍') {
      setDataSource(prevData => prevData.filter(item => item.id !== record))
      message.success(`宿舍 ${record} 已删除`)
    } else if (type === '床位') {
      setDataSource(prev =>
        prev.map(item => ({
          ...item,
          beds: item.beds.filter(bed => bed !== record),
        }))
      )
      message.success(`床位 ${record} 已删除`)
    }
  }

  const expandedRowRender = record => {
    return (
      <Table
        dataSource={record.beds.map(bed => ({ id: bed }))}
        columns={[
          {
            title: '床位编号',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: '操作',
            key: 'action',
            render: (_, bedRecord) => (
              <>
                <Button
                  type="primary"
                  size="small"
                  style={{ marginRight: 8 }}
                  onClick={() => handleEdit(bedRecord.id, '床位')}
                >
                  编辑
                </Button>
                <Button type="danger" size="small" onClick={() => handleDelete(bedRecord.id, '床位')}>
                  删除
                </Button>
              </>
            ),
          },
        ]}
        rowKey="id"
        pagination={false}
        bordered
      />
    )
  }

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
    {
      title: '入住人数',
      dataIndex: 'peopleCount',
      key: 'peopleCount',
    },
    {
      title: '操作',
      key: 'action',
      render: record => (
        <>
          <Button type="primary" size="small" style={{ marginRight: 8 }} onClick={() => handleEdit(record.id, '宿舍')}>
            编辑
          </Button>
          <Button type="danger" size="small" onClick={() => handleDelete(record.id, '宿舍')}>
            删除
          </Button>
        </>
      ),
    },
  ]

  return (
    <div className="set-dorm-page">
      <Divider orientation="left">楼栋选择</Divider>
      <div>
        {buildingData.map(building => (
          <Button
            className="building-buttons"
            key={building}
            type={selectedBuilding === building ? 'primary' : 'default'}
            onClick={() => handleBuildingChange(building)}
          >
            {building}
          </Button>
        ))}
      </div>

      <Divider orientation="left">楼层选择</Divider>
      <div className="main-content">
        <div className="floor-buttons">
          {Object.keys(dormitoryData).map(floor => (
            <Button
              key={floor}
              type={selectedFloor === floor ? 'primary' : 'default'}
              onClick={() => handleFloorChange(floor)}
              block
            >
              {floor}
            </Button>
          ))}
        </div>

        <div className="right-content">
          <div className="action-buttons">
            <Button type="primary" onClick={handleSetNumbering} style={{ marginRight: 8 }}>
              设置编号
            </Button>
            <Button type="primary" onClick={handleInitBed}>
              初始化床位
            </Button>
          </div>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 5 }}
            rowKey="id"
            bordered
            style={{ marginTop: 16 }}
            expandable={{ expandedRowRender }}
          />
        </div>
      </div>
    </div>
  )
}

export default SetDorm
