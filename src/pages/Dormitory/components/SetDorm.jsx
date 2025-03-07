import React, { useEffect, useState } from 'react'
import { Button, Table, message, Divider, Form, Modal, Input, InputNumber, Select } from 'antd'
import './SetDorm.scss'

const dormitoryData = {
  '1栋': {
    '1层': [
      { id: 'M501', type: '4人间', peopleCount: 4 },
      { id: 'M502', type: '6人间', peopleCount: 6 },
    ],
    '2层': [
      { id: 'M601', type: '4人间', peopleCount: 4 },
      { id: 'M602', type: '6人间', peopleCount: 6 },
    ],
  },
  '2栋': {
    '1层': [
      { id: 'N101', type: '2人间', peopleCount: 2 },
      { id: 'N102', type: '4人间', peopleCount: 4 },
    ],
  },
  // 其他楼栋数据...
}
const buildingData = Object.keys(dormitoryData)
const SetDorm = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(buildingData[0])
  const [selectedFloor, setSelectedFloor] = useState('')
  const [dataSource, setDataSource] = useState([])
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [editForm] = Form.useForm()
  const [editVisible, setEditVisible] = useState(false)
  const [editingDorm, setEditingDorm] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editedData, setEditedData] = useState({})

  const getFloors = () => {
    return dormitoryData[selectedBuilding] ? Object.keys(dormitoryData[selectedBuilding]) : []
  }
  // 初始化选中楼层
  useEffect(() => {
    const floors = getFloors()
    if (floors.length > 0) {
      setSelectedFloor(floors[0])
    }
  }, [selectedBuilding])

  // 更新数据源
  useEffect(() => {
    if (selectedFloor && dormitoryData[selectedBuilding]?.[selectedFloor]) {
      setDataSource(
        dormitoryData[selectedBuilding][selectedFloor].map(dorm => ({
          ...dorm,
          beds: [], // 初始化为空数组
        }))
      )
    }
  }, [selectedBuilding, selectedFloor])

  const handleBuildingChange = building => {
    setSelectedBuilding(building)
  }

  const handleFloorChange = floor => {
    setSelectedFloor(floor)
  }
  const handleSetNumbering = () => {
    setVisible(true)
  }

  const generateDorms = values => {
    const { areaCode, startNum, endNum, dormType, peopleCount } = values
    const dorms = []

    for (let num = startNum; num <= endNum; num++) {
      const dormId = areaCode ? `${areaCode}-${num}` : `${num}`
      dorms.push({
        id: dormId,
        type: dormType,
        peopleCount: peopleCount,
        beds: [],
      })
    }
    return dorms
  }
  // 床位ID生成方法
  const generateBedId = (dormId, index) => {
    const [areaCode, baseNumber] = dormId.includes('-') ? dormId.split('-') : [null, dormId]
    return areaCode ? `${areaCode}-${baseNumber}-${index + 1}` : `${dormId}-${index + 1}`
  }
  const updateDormitoryData = newDorms => {
    if (!dormitoryData[selectedBuilding][selectedFloor]) {
      dormitoryData[selectedBuilding][selectedFloor] = []
    }
    dormitoryData[selectedBuilding][selectedFloor] = [...dormitoryData[selectedBuilding][selectedFloor], ...newDorms]
    setDataSource(prev => [
      ...prev,
      ...newDorms.map(dorm => ({
        ...dorm,
        // 在设置编号时不生成对应的床位编号
        // beds: Array.from({ length: dorm.peopleCount }, (_, index) => `${dorm.id}-${index + 1}`),
      })),
    ])
  }
  const handleModalOk = () => {
    form.validateFields().then(values => {
      const newDorms = generateDorms(values)
      updateDormitoryData(newDorms)
      setVisible(false)
      form.resetFields()
    })
  }
  // 修改初始化床位逻辑
  const handleInitBed = () => {
    const updatedData = dataSource.map(dorm => {
      // 从宿舍ID中解析区域号（如果有的话）
      const [areaCode, baseNumber] = dorm.id.includes('-') ? dorm.id.split('-') : [null, dorm.id]

      return {
        ...dorm,
        beds: Array.from({ length: dorm.peopleCount }, (_, index) => {
          // 有区域号时格式：区域号-宿舍号-床位号
          // 无区域号时格式：宿舍号-床位号
          return areaCode ? `${areaCode}-${baseNumber}-${index + 1}` : `${dorm.id}-${index + 1}`
        }),
      }
    })

    setDataSource(updatedData)
    message.success('床位初始化成功！')
  }
  const handleEdit = record => {
    if (editingId === record.id) {
      // 保存逻辑
      const newData = dataSource.map(item => {
        if (item.id === record.id) {
          // 生成新的床位编号
          const [areaCode, baseNumber] = editedData.id?.includes('-') ? editedData.id.split('-') : [null, editedData.id]

          return {
            ...item,
            ...editedData,
            beds: Array.from({ length: editedData.peopleCount || item.peopleCount }, (_, index) => {
              return areaCode ? `${areaCode}-${baseNumber}-${index + 1}` : `${editedData.id}-${index + 1}`
            }),
          }
        }
        return item
      })

      setDataSource(newData)
      setEditingId(null)
    } else {
      // 进入编辑模式
      setEditingId(record.id)
      setEditedData({ ...record })
    }
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

  // 宿舍编辑表单的提交处理
  const handleEditSubmit = () => {
    editForm.validateFields().then(values => {
      const newPeopleCount = values.peopleCount
      const originalPeopleCount = editingDorm.peopleCount

      setDataSource(prev =>
        prev.map(dorm => {
          if (dorm.id === editingDorm.id) {
            // 生成新的床位数组
            const newBeds = Array.from({ length: newPeopleCount }, (_, index) => {
              // 保留原有床位（如果存在）
              if (index < originalPeopleCount) {
                return dorm.beds[index] || generateBedId(values.id, index)
              }
              // 新增床位
              return generateBedId(values.id, index)
            }).slice(0, newPeopleCount) // 确保不超过新的人数

            return {
              ...dorm,
              id: values.id,
              type: values.type,
              peopleCount: newPeopleCount,
              beds: newBeds,
            }
          }
          return dorm
        })
      )

      // 更新模拟数据源
      if (dormitoryData[selectedBuilding]?.[selectedFloor]) {
        dormitoryData[selectedBuilding][selectedFloor] = dormitoryData[selectedBuilding][selectedFloor].map(dorm => {
          if (dorm.id === editingDorm.id) {
            return {
              ...dorm,
              id: values.id,
              type: values.type,
              peopleCount: newPeopleCount,
            }
          }
          return dorm
        })
      }

      setEditVisible(false)
      message.success('宿舍信息修改成功')
    })
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
      render: (text, record) =>
        editingId === record.id ? (
          <Input value={editedData.id} onChange={e => setEditedData({ ...editedData, id: e.target.value })} />
        ) : (
          text
        ),
    },
    {
      title: '宿舍类型',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) =>
        editingId === record.id ? (
          <Select value={editedData.type} onChange={value => setEditedData({ ...editedData, type: value })}>
            <Select.Option value="2人间">2人间</Select.Option>
            <Select.Option value="4人间">4人间</Select.Option>
            <Select.Option value="6人间">6人间</Select.Option>
          </Select>
        ) : (
          text
        ),
    },
    {
      title: '入住人数',
      dataIndex: 'peopleCount',
      key: 'peopleCount',
      render: (text, record) =>
        editingId === record.id ? (
          <InputNumber
            min={1}
            value={editedData.peopleCount}
            onChange={value => setEditedData({ ...editedData, peopleCount: value })}
          />
        ) : (
          text
        ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div className="action-buttons">
          <Button onClick={() => handleEdit(record)} type={editingId === record.id ? 'primary' : 'default'}>
            {editingId === record.id ? '保存' : '编辑'}
          </Button>
          <Button
            type="danger"
            size="small"
            onClick={() => handleDelete(record.id, '宿舍')}
            disabled={editingId === record.id}
          >
            删除
          </Button>
        </div>
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
        <Modal title="设置宿舍编号" visible={visible} onOk={handleModalOk} onCancel={() => setVisible(false)}>
          <Form form={form} layout="vertical">
            <Form.Item label="区域编号" name="areaCode">
              <Input placeholder="例如：A区" />
            </Form.Item>
            <Form.Item label="起始编号" name="startNum" rules={[{ required: true, message: '请输入起始编号' }]}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="结束编号" name="endNum" rules={[{ required: true, message: '请输入结束编号' }]}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="宿舍类型" name="dormType" rules={[{ required: true, message: '请选择宿舍类型' }]}>
              <Select>
                <Select.Option value="2人间">2人间</Select.Option>
                <Select.Option value="4人间">4人间</Select.Option>
                <Select.Option value="6人间">6人间</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="入住人数" name="peopleCount" rules={[{ required: true, message: '请输入入住人数' }]}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <Divider orientation="left">楼层选择</Divider>
      <div className="main-content">
        <div className="floor-buttons">
          {getFloors().map(floor => (
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
          <Modal
            title="编辑宿舍信息"
            visible={editVisible}
            onOk={handleEditSubmit}
            onCancel={() => setEditVisible(false)}
          >
            <Form form={editForm} layout="vertical">
              <Form.Item label="宿舍编号" name="id" rules={[{ required: true, message: '请输入宿舍编号' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="宿舍类型" name="type" rules={[{ required: true, message: '请选择宿舍类型' }]}>
                <Select>
                  <Select.Option value="2人间">2人间</Select.Option>
                  <Select.Option value="4人间">4人间</Select.Option>
                  <Select.Option value="6人间">6人间</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="入住人数"
                name="peopleCount"
                rules={[
                  {
                    required: true,
                    message: '请输入入住人数',
                    type: 'number',
                    min: 1,
                  },
                ]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default SetDorm
