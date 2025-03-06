import React, { useState } from 'react'
import { Card, Input, Button, Table, Modal, Form, Popconfirm, Tag, message, Tooltip } from 'antd'
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, RedoOutlined } from '@ant-design/icons'
import './index.scss'

const Dormitory = () => {
  const [form] = Form.useForm()
  const [buildings, setBuildings] = useState([
    {
      id: '1',
      name: 'A栋',
      order: 1,
      floors: 6,
      manager: '王老师',
      layers: [
        { id: '1-1', floor: 1, order: 1 },
        { id: '1-2', floor: 2, order: 2 },
      ],
    },
  ])
  const [searchBuildings, setSearchBuildings] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [editingBuilding, setEditingBuilding] = useState(null)
  const [editingLayer, setEditingLayer] = useState(null)
  const [editingLayerData, setEditingLayerData] = useState({})

  // 楼栋列配置
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
      width: 100,
      sorter: (a, b) => a.order - b.order,
    },
    {
      title: '层数',
      dataIndex: 'floors',
      key: 'floors',
      width: 100,
      render: text => <Tag color="blue">{text}层</Tag>,
    },
    {
      title: '管理员',
      dataIndex: 'manager',
      key: 'manager',
      width: 150,
    },
    {
      title: '管理',
      key: 'action',
      render: (_, record) => (
        <div className="action-buttons">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEditBuilding(record)}>
            编辑
          </Button>
          <Popconfirm
            okText="确认"
            cancelText="取消"
            title="确定删除该楼栋？"
            onConfirm={() => handleDeleteBuilding(record.id)}
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
      width: 180,
    },
  ]

  // 层数列配置

  // 展开层数配置
  const expandable = {
    expandedRowRender: record => (
      <Table
        columns={[
          {
            title: '层级',
            dataIndex: 'order',
            key: 'order',
            width: 400,
            align: 'center',
            render: (text, layer) =>
              editingLayer === layer.id ? (
                <Input
                  value={editingLayerData.order}
                  onChange={e =>
                    setEditingLayerData(prev => ({
                      ...prev,
                      order: e.target.value,
                    }))
                  }
                  onPressEnter={handleSaveLayerEdit}
                />
              ) : (
                text
              ),
          },
          {
            title: '序号',
            dataIndex: 'floor',
            key: 'floor',
            width: 400,
            align: 'center',
            render: (text, layer) =>
              editingLayer === layer.id ? (
                <Input
                  value={editingLayerData.floor}
                  onChange={e =>
                    setEditingLayerData(prev => ({
                      ...prev,
                      floor: e.target.value,
                    }))
                  }
                  onPressEnter={handleSaveLayerEdit}
                />
              ) : (
                text
              ),
          },
          {
            title: '操作',
            key: 'action',
            render: (_, layer) => (
              <div className="action-buttons">
                <Button
                  onClick={() => handleEditLayer(layer)}
                  type={editingLayer === layer.id ? 'primary' : 'default'}
                  icon={<EditOutlined />}
                >
                  {editingLayer === layer.id ? '保存' : '编辑'}
                </Button>
                <Popconfirm
                  title="确定删除该楼层？"
                  okText="确认"
                  cancelText="取消"
                  onConfirm={() => handleDeleteLayer(layer.id)} // 新增删除逻辑
                >
                  <Button danger icon={<DeleteOutlined />}>
                    删除
                  </Button>
                </Popconfirm>
              </div>
            ),
            width: 180,
            align: 'center',
          },
        ]}
        dataSource={record.layers}
        rowKey="id"
        pagination={false}
        bordered
      />
    ),
  }
  // 编辑楼层逻辑
  const handleEditLayer = layer => {
    if (editingLayer === layer.id) {
      // 点击保存按钮时保存修改
      handleSaveLayerEdit()
      // console.log('保存修改')
    } else {
      // 进入编辑状态
      setEditingLayer(layer.id)
      setEditingLayerData({ order: layer.order, floor: layer.floor })
      // console.log('编辑')
    }
  }

  // 更改楼层信息
  const handleSaveLayerEdit = () => {
    setBuildings(prev =>
      prev.map(building => ({
        ...building,
        layers: building.layers.map(layer => (layer.id === editingLayer ? { ...layer, ...editingLayerData } : layer)),
      }))
    )
    setEditingLayer(null)
    setEditingLayerData({})
  }
  // 删除楼层
  const handleDeleteLayer = layerId => {
    setBuildings(prev =>
      prev.map(building => ({
        ...building,
        layers: building.layers.filter(layer => layer.id !== layerId),
      }))
    )
    message.success('删除成功')
  }

  // 处理表单提交
  const handleSubmit = values => {
    if (!values) {
      form.resetFields()
      return
    }
    if (editingBuilding) {
      // 更新楼栋逻辑
      // console.log('更新楼栋逻辑')
      // console.log(editingBuilding)
      setBuildings(
        buildings.map(building =>
          building.id === editingBuilding.id
            ? {
                ...building,
                ...values,
                layers: Array.from({ length: values.floors }, (_, index) => ({
                  id: `${Date.now()}-${index + 1}`,
                  floor: values.order + (index + 1) + '00',
                  order: index + 1,
                })),
              }
            : building
        )
      )
      // console.log(values)
      setModalVisible(false)
      message.success('修改信息成功')
      form.resetFields() // 清空表单
      // return
    } else {
      // 新增楼栋逻辑
      const newBuilding = {
        id: Date.now().toString(),
        ...values,
        layers: Array.from({ length: values.floors }, (_, index) => ({
          id: `${Date.now()}-${index + 1}`,
          floor: values.order + (index + 1) + '00',
          order: index + 1,
        })),
      }
      // console.log(values)
      setBuildings([...buildings, newBuilding])
      message.success('新增成功')
    }
    setModalVisible(false)

    form.resetFields() // 清空表单
  }

  const handleEditBuilding = record => {
    setModalVisible(true)
    // console.log(record)
    // 回显数据
    setEditingBuilding(record)
    form.setFieldsValue({
      ...record,
    })
  }
  // 删除楼栋的函数示例
  const handleDeleteBuilding = id => {
    setBuildings(prev => prev.filter(building => building.id !== id))
    message.success('删除成功')
  }
  const handleSearch = name => {
    console.log(buildings.find(building => building.name === name))
    if (name === '') {
      message.error('请输入楼栋名称')
      return
    }
    const result = buildings.find(building => building.name === name)
    if (result) {
      setSearchBuildings([result])
    } else {
      setSearchBuildings([])
      message.error('没有该楼栋')
      setSearchBuildings(null)
    }
  }
  // 重置搜索
  const resetSearch = () => {
    setSearchText('')
    setSearchBuildings(null)
  }

  return (
    <Card
      title={
        <div className="header-toolbar">
          <Input
            placeholder="搜索楼栋名称"
            style={{ width: 200 }}
            allowClear
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            style={{ marginLeft: 8 }}
            onClick={() => handleSearch(searchText)}
          >
            搜索
          </Button>
          <Button icon={<RedoOutlined />} style={{ marginLeft: 8 }} onClick={() => resetSearch()}>
            重置
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setModalVisible(true)
              form.resetFields() // 清空表单
            }}
            style={{ marginLeft: 16 }}
          >
            新增楼栋
          </Button>
        </div>
      }
      headStyle={{ border: 'none' }}
      bodyStyle={{ padding: 0 }}
    >
      {/* 楼栋表格 */}
      <Table
        columns={columns}
        dataSource={searchBuildings ? searchBuildings : buildings}
        expandable={expandable}
        rowKey="id"
        bordered={false}
        scroll={{ x: 800 }}
      />

      {/* 楼栋编辑模态框 */}
      <Modal
        title={`${editingBuilding ? '编辑' : '新增'}楼栋`}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          setEditingBuilding(null)
        }}
        footer={editingBuilding ? undefined : null}
        cancelText="取消"
        okText="确认"
        onOk={() => form.submit()}
        // destroyOnClose={true}
        // afterClose={() => form.resetFields()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="栋数名称" name="name" rules={[{ required: true, message: '请输入栋数名称' }]}>
            <Input placeholder="例如：A栋" />
          </Form.Item>
          <Form.Item label="序号" name="order" rules={[{ required: true, message: '请输入序号' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="层数" name="floors" rules={[{ required: true, message: '请输入层数' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="管理员" name="manager" rules={[{ required: true, message: '请选择管理员' }]}>
            <Input />
          </Form.Item>
          {!editingBuilding && (
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          )}
        </Form>
      </Modal>
    </Card>
  )
}

// 全局样式建议

export default Dormitory
