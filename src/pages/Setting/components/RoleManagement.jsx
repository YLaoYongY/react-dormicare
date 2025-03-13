import React, { useState, useEffect, useCallback } from 'react'
import { Button, Form, Input, Table, Modal, Tree, message } from 'antd'
import {
  HomeOutlined,
  CarryOutOutlined,
  ApartmentOutlined,
  TeamOutlined,
  SettingOutlined,
  CarOutlined,
  CreditCardOutlined,
  SolutionOutlined,
  UserOutlined,
  IdcardOutlined,
  FolderOutlined,
  FileOutlined,
} from '@ant-design/icons'

const RoleManagement = () => {
  const [form] = Form.useForm()
  const [searchForm] = Form.useForm()
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isPermissionModalVisible, setIsPermissionModalVisible] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [selectedRole, setSelectedRole] = useState(null)
  const [checkedKeys, setCheckedKeys] = useState([])
  // 新增状态控制查看权限弹窗
  const [isViewPermissionModalVisible, setIsViewPermissionModalVisible] = useState(false)
  const [viewingPermissions, setViewingPermissions] = useState([])
  // 模拟初始数据
  useEffect(() => {
    setData([
      {
        id: 1,
        roleName: '管理员',
        roleRemark: '系统管理员',
        permissions: ['/', '/attendance', '/student'],
      },
    ])
    setFilteredData([
      {
        id: 1,
        roleName: '管理员',
        roleRemark: '系统管理员',
        permissions: ['/', '/attendance', '/student'],
      },
    ])
  }, [])

  // 权限树形控件数据
  const treeData = [
    {
      title: '报修管理',
      key: '3',
      icon: <ApartmentOutlined />,
      children: [
        {
          title: '维修申请',
          key: '/report-repair',
          children: [
            {
              title: '批阅',
              key: 'repair-approve',
            },
            {
              title: '查看进度',
              key: 'repair-progress',
            },
          ],
        },
      ],
    },
    {
      title: '学生管理',
      key: '4',
      icon: <TeamOutlined />,
      children: [
        {
          title: '学生列表',
          key: '/student',
          children: [
            {
              title: '编辑',
              key: 'student-edit',
            },
            {
              title: '重置密码',
              key: 'student-reset-pwd',
            },
            {
              title: '删除',
              key: 'student-delete',
            },
          ],
        },
      ],
    },
    // 其他模块保持类似结构...
  ]

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      render: (text, record) =>
        editingId === record.id ? (
          <Input value={text} onChange={e => handleEditChange(e, record.id, 'roleName')} />
        ) : (
          text
        ),
    },
    {
      title: '角色备注',
      dataIndex: 'roleRemark',
      render: (text, record) =>
        editingId === record.id ? (
          <Input value={text} onChange={e => handleEditChange(e, record.id, 'roleRemark')} />
        ) : (
          text
        ),
    },
    {
      title: '操作',
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              if (editingId === record.id) {
                handleSave(record.id)
              } else {
                setEditingId(record.id)
              }
            }}
          >
            {editingId === record.id ? '保存' : '编辑'}
          </Button>
          <Button type="link" onClick={() => handleAssignPermissions(record)}>
            分配权限
          </Button>
          <Button type="link" onClick={() => handleViewPermissions(record)}>
            查看权限
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </>
      ),
    },
  ]

  // 在组件内添加以下方法
  const generatePermissionTree = useCallback((permissions, allNodes) => {
    const permissionSet = new Set(permissions)
    const findParents = (nodes, targetKey, path = []) => {
      for (const node of nodes) {
        const newPath = [...path, node]
        if (node.key === targetKey) return newPath
        if (node.children) {
          const found = findParents(node.children, targetKey, newPath)
          if (found) return found
        }
      }
      return null
    }

    const result = []
    const addedKeys = new Set()

    permissions.forEach(key => {
      const path = findParents(allNodes, key)
      if (path) {
        path.forEach(node => {
          if (!addedKeys.has(node.key)) {
            const newNode = {
              title: node.title,
              key: node.key,
              children: [],
              disabled: true,
            }

            // 构建层级关系
            let currentLevel = result
            path.slice(0, path.indexOf(node)).forEach(parent => {
              let exist = currentLevel.find(n => n.key === parent.key)
              if (!exist) {
                exist = {
                  title: parent.title,
                  key: parent.key,
                  children: [],
                  disabled: true,
                }
                currentLevel.push(exist)
                addedKeys.add(parent.key)
              }
              currentLevel = exist.children
            })

            if (!currentLevel.some(n => n.key === node.key)) {
              currentLevel.push(newNode)
              addedKeys.add(node.key)
            }
          }
        })
      }
    })

    return result
  }, [])

  // 查看权限处理方法
  const handleViewPermissions = role => {
    setViewingPermissions(role.permissions)
    setIsViewPermissionModalVisible(true)
  }

  const handleSearch = values => {
    const filtered = data.filter(item => {
      return !values.roleName || item.roleName.includes(values.roleName)
    })
    setFilteredData(filtered)
  }

  const handleReset = () => {
    searchForm.resetFields()
    setFilteredData(data)
  }

  const handleAdd = () => {
    setIsModalVisible(true)
  }

  const handleEditChange = (e, id, field) => {
    const newData = data.map(item => {
      if (item.id === id) {
        return { ...item, [field]: e.target.value }
      }
      return item
    })
    setData(newData)
    setFilteredData(newData)
  }

  const handleSave = id => {
    setEditingId(null)
    message.success('修改保存成功')
  }

  const handleDelete = id => {
    const newData = data.filter(item => item.id !== id)
    setData(newData)
    setFilteredData(newData)
    message.success('删除成功')
  }

  const handleAddSubmit = values => {
    const newRole = {
      id: Date.now(),
      ...values,
      permissions: ['/report-approve', 'student-edit'],
    }
    setData([...data, newRole])
    setFilteredData([...data, newRole])
    setIsModalVisible(false)
    form.resetFields()
    message.success('新增角色成功')
  }

  const handleAssignPermissions = role => {
    setSelectedRole(role)
    setCheckedKeys(role.permissions)
    setIsPermissionModalVisible(true)
  }
  const generateTitleMap = useCallback(nodes => {
    const map = {}
    const traverse = nodes => {
      nodes.forEach(node => {
        map[node.key] = node.title
        if (node.children) {
          traverse(node.children)
        }
      })
    }
    traverse(nodes)
    return map
  }, [])
  const handlePermissionSubmit = () => {
    const titleMap = generateTitleMap(treeData)
    const permissions = checkedKeys.map(key => titleMap[key])

    const newData = data.map(item => {
      if (item.id === selectedRole.id) {
        return { ...item, permissions }
      }
      return item
    })

    setData(newData)
    setFilteredData(newData)
    setIsPermissionModalVisible(false)
    message.success('权限分配成功')
  }

  return (
    <div style={{ padding: 20 }}>
      {/* 搜索栏 */}
      <Form form={searchForm} onFinish={handleSearch} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item label="角色名称" name="roleName" style={{ marginRight: 16 }}>
          <Input placeholder="请输入角色名称" style={{ width: 150 }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            搜索
          </Button>
          <Button onClick={handleReset} style={{ marginRight: 8 }}>
            重置
          </Button>
          <Button type="primary" onClick={handleAdd}>
            新增
          </Button>
        </Form.Item>
      </Form>
      {/* 角色表格 */}
      <Table columns={columns} dataSource={filteredData} rowKey="id" bordered style={{ marginTop: 20 }} />
      {/* 新增角色模态框 */}
      <Modal title="新增角色" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAddSubmit}>
          <Form.Item label="角色名称" name="roleName" rules={[{ required: true, message: '请输入角色名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="角色备注" name="roleRemark" rules={[{ required: true, message: '请输入角色备注' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* 分配权限模态框 */}
      <Modal
        title={`为 ${selectedRole?.roleName} 分配权限`}
        visible={isPermissionModalVisible}
        onCancel={() => setIsPermissionModalVisible(false)}
        onOk={handlePermissionSubmit}
      >
        <Tree
          checkable
          checkedKeys={checkedKeys}
          onCheck={keys => setCheckedKeys(keys)}
          treeData={treeData}
          defaultExpandAll
        />
      </Modal>

      <Modal
        title="角色权限详情"
        visible={isViewPermissionModalVisible}
        onCancel={() => setIsViewPermissionModalVisible(false)}
        footer={null}
      >
        <ul>
          {viewingPermissions.map((permission, index) => (
            <li key={index}>{permission}</li>
          ))}
        </ul>
      </Modal>
    </div>
  )
}

export default RoleManagement
