import React, { useState } from 'react'

import {
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  IdcardOutlined,
  TeamOutlined,
  SolutionOutlined,
  ApartmentOutlined,
  CarryOutOutlined,
  CarOutlined,
  CreditCardOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

const items = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: '首页',
  },
  {
    key: '2',
    icon: <CarryOutOutlined />,
    label: '考勤管理',
    children: [
      {
        key: '/attendance',
        label: '值日统计',
      },

      {
        key: '23',
        label: '查宿统计',
        children: [
          {
            key: '/absence-registration',
            label: '缺勤登记',
          },
        ],
      },
      {
        key: '24',
        label: '违规违纪',
        children: [
          {
            key: '/violation-handling',
            label: '违规记录',
          },
        ],
      },
    ],
  },
  {
    key: '3',
    icon: <ApartmentOutlined />,
    label: '报修管理',
    children: [
      {
        key: '/report-repair',
        label: '维修申请',
      },
    ],
  },
  {
    key: '4',
    icon: <TeamOutlined />,
    label: '学生管理',
    children: [
      {
        key: '/student',
        icon: <SolutionOutlined />,
        label: '学生列表',
      },
    ],
  },
  {
    key: '5',
    icon: <ApartmentOutlined />,
    label: '宿舍管理',
    children: [
      {
        key: '/dormitory',
        label: '楼层管理',
      },
      {
        key: '52',
        label: '分配宿舍',
      },
      {
        key: '55',
        label: '宿舍管理',
      },
      {
        key: '54',
        label: '调换申请',
      },
    ],
  },
  {
    key: '6',
    icon: <SettingOutlined />,
    label: '系统管理',
    children: [
      {
        key: '/setting',
        icon: <UserOutlined />,
        label: '用户管理',
      },
      {
        key: '62',
        icon: <IdcardOutlined />,
        label: '角色管理',
      },
    ],
  },
  {
    key: '7',
    icon: <CarOutlined />,
    label: '出入登记',
    children: [
      {
        key: '/travel',
        label: '假期出入登记',
      },
    ],
  },

  {
    key: '8',
    icon: <CreditCardOutlined />,
    label: '公告',
    children: [
      {
        key: '/notice',
        label: '公告列表',
      },
    ],
  },
]
const getLevelKeys = items1 => {
  const key = {}
  const func = (items2, level = 1) => {
    items2.forEach(item => {
      if (item.key) {
        key[item.key] = level
      }
      if (item.children) {
        func(item.children, level + 1)
      }
    })
  }
  func(items1)
  return key
}
const levelKeys = getLevelKeys(items)
const SideBar = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23'])
  const onOpenChange = openKeys => {
    const currentOpenKey = openKeys.find(key => stateOpenKeys.indexOf(key) === -1)
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter(key => key !== currentOpenKey)
        .findIndex(key => levelKeys[key] === levelKeys[currentOpenKey])
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter(key => levelKeys[key] <= levelKeys[currentOpenKey])
      )
    } else {
      // close
      setStateOpenKeys(openKeys)
    }
  }

  const route = useLocation()
  const router_key = route.pathname
  const navigate = useNavigate()
  const routerChange = e => {
    const path = e.key

    navigate(path)
  }

  return (
    <Menu
      onClick={routerChange}
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['/home']}
      selectedKeys={router_key}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      items={items}
    />
  )
}
export default SideBar
