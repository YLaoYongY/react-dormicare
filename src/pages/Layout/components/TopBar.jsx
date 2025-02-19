import React, { useState } from 'react'
import { Breadcrumb, Popconfirm, Dropdown } from 'antd'

import { Modal, Button, Layout as AntdLayout } from 'antd'

import autor from '@/assets/autor.jpeg'
import { useNavigate } from 'react-router-dom'

const TopBar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const tiaozhuan = () => {
    navigate('/login')
  }
  const showModal = e => {
    e.preventDefault()
    setOpen(true)
  }

  const hideModal = () => {
    setOpen(false)
  }
  const dropdownItems = [
    {
      key: '1',
      label: (
        <a href="" onClick={showModal}>
          切换账号
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a href="" onClick={showModal}>
          退出登录
        </a>
      ),
    },
  ]

  return (
    <>
      <Breadcrumb
        style={{
          margin: 'auto 24px',
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
            items: dropdownItems,
          }}
          placement="bottomRight"
          arrow
        >
          <img src={autor} alt="" style={{ width: '50px', height: '50px', borderRadius: '8px', cursor: 'pointer' }} />
        </Dropdown>
        <Modal title="温馨提示" open={open} onOk={tiaozhuan} onCancel={hideModal} okText="确认" cancelText="取消">
          <p>确定要退出登录吗</p>
        </Modal>
      </div>
    </>
  )
}

export default TopBar
