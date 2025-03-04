import './index.scss'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout as AntdLayout, theme } from 'antd'
import SideBar from './components/SideBar.jsx'
import xyIcon from '@/assets/xy.jpg'
import TopBar from './components/TopBar'
const { Header, Sider, Content } = AntdLayout
const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
}
const Layout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  // 内嵌菜单和只收缩一个父级菜单的逻辑
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23'])

  return (
    <AntdLayout style={{ minHeight: '100vh' }}>
      <Sider style={siderStyle} trigger={null} collapsible collapsed={collapsed}>
        {/* logo和系统名字 */}
        <div className={`demo-logo-vertical ${collapsed ? 'collapsed' : ''}`}>
          <img style={{ width: '40px', height: '40px' }} src={xyIcon} alt="" />
          {!collapsed && <h4 style={{ color: '#fff', marginLeft: '10px' }}>学校宿舍管理系统</h4>}
        </div>
        <SideBar />
      </Sider>
      <AntdLayout>
        <Header style={{ display: 'flex', padding: 0, background: '#1677FF', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <TopBar />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </AntdLayout>
    </AntdLayout>
  )
}

export default Layout
