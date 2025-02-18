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
  {
    path: '*',
    element: <h1>404 Not Found</h1>,
  },
])
export default router
