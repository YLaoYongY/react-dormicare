import React, { useState } from 'react'
import { Breadcrumb } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout as AntdLayout, Dropdown } from 'antd'

import autor from '@/assets/autor.jpeg'

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="#">
        切换账号
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="#">
        退出登录
      </a>
    ),
  },
]

const TopBar = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      
      <Breadcrumb
        style={{
          // color: '#fff',
          margin: 'auto 24px',
          // fontSize: '20px',
          fontSizeIcon: '20px',
        }}
        items={[
          {
            title: 'Users',
          },
          {
            title: ':id',

            href: '',
          },
          {
            title: ':id',

            href: '',
          },
        ]}
        params={{
          id: 1,
        }}
      />
      <div style={{ height: '64px', marginLeft: 'auto', marginRight: '24px', display: 'flex', alignItems: 'center' }}>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
          arrow
        >
          <img src={autor} alt="" style={{ width: '50px', height: '50px', borderRadius: '8px', cursor: 'pointer' }} />
        </Dropdown>
      </div>
    </>
  )
}
export default TopBar
