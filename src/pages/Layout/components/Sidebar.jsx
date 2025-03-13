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
        label: '楼栋管理',
      },
      { key: '/set-dorm', label: '设置宿舍' },
      {
        key: '/roommate-assignment',
        label: '分配宿舍',
      },
      {
        key: '/RoomChange',
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
        key: '/role-management',
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

/*
角色管理页面要求
顶部是一行搜索栏 有角色名称搜索框 搜索按钮 重置搜索栏按钮 新增按钮
下方是一个表格 表头有 角色名称 角色备注 角色权限 操作 操作有三个按钮 编辑 分配全西安和删除 
当页面刚渲染或是点击重置按钮过后下方会显示全部数据 点击新增 会弹出一个表单模态框 标题是新增角色 对话框内容一个表单 有 角色名称 角色备注  都是必填项 要求 有表单验证  点击确定会在下方新增数据 并提示新增角色成功 
用户数据 的操作 点击编辑直接在 所在用户的数据展示里编辑 同时在点击编辑的同时 按钮文本变成保存 点击保存后会更改数据 点击分配权限时 会弹出一个权限分配的模态框 标题是为 点击谁的角色分配权限就是显示谁分配权限 内容是ant组件库的树形控件 内容是

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
        label: '楼栋管理',
      },
      { key: '/set-dorm', label: '设置宿舍' },
      {
        key: '/roommate-assignment',
        label: '分配宿舍',
      },
      {
        key: '/RoomChange',
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
        key: '/role-management',
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
  }, 这些页面所能实现的功能 排成树形控件的列表 
    点击删除直接删除所在用户数据


*/
