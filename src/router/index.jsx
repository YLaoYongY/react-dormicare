import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Attendance from '@/pages/Attendance'
import AbsenceRegistration from '@/pages/Attendance/components/AbsenceRegistration/AbsenceRegistration'
import FloorDetails from '@/pages/Attendance/components/AbsenceRegistration/FloorDetails'
import ViolationHandling from '@/pages/Attendance/components/ViolationHandling/ViolationHandling'

import Dormitory from '@/pages/Dormitory'
import Notice from '@/pages/Notice'
import ReportRepair from '@/pages/ReportRepair'
import Setting from '@/pages/Setting'
import Student from '@/pages/Student'
import StudentDetail from '@/pages/Student/StudentDetail'

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
      { index: true, element: <Home /> },
      { path: 'attendance', element: <Attendance /> },
      { path: 'absence-registration', element: <AbsenceRegistration /> },
      { path: 'floor-details/:floor', element: <FloorDetails /> },
      { path: 'violation-handling', element: <ViolationHandling /> },
      { path: 'dormitory', element: <Dormitory /> },
      { path: 'notice', element: <Notice /> },
      { path: 'report-repair', element: <ReportRepair /> },
      { path: 'setting', element: <Setting /> },
      { path: 'student', element: <Student /> },
      { path: 'student/:id', element: <StudentDetail /> },

      { path: 'travel', element: <Travel /> },
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
