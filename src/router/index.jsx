import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
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
  },
  {
    path: '/login',
    element: <Login />,
  },
])
export default router
