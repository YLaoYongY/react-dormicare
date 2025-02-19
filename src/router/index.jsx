import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Attendance from '@/pages/Attendance'
import Dormitory from '@/pages/Dormitory'
import Notice from '@/pages/Notice'
import ReportRepair from '@/pages/ReportRepair'
import Setting from '@/pages/Setting'
import Student from '@/pages/Student'
import Travel from '@/pages/Travel'

import AuthRouter from '@/components/AuthRouter.jsx'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRouter>
        <Layout />
      </AuthRouter>
    ),
    children: [
      {
        index: true,
        // path: 'home',
        element: <Home />,
      },
      {
        path: 'attendance',
        element: <Attendance />,
      },
      {
        path: 'dormitory',
        element: <Dormitory />,
      },
      {
        path: 'notice',
        element: <Notice />,
      },
      {
        path: 'report-repair',
        element: <ReportRepair />,
      },
      {
        path: 'setting',
        element: <Setting />,
      },
      {
        path: 'student',
        element: <Student />,
      },
      {
        path: 'travel',
        element: <Travel />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <h1>404 Not Found</h1>,
  },
])
export default router
