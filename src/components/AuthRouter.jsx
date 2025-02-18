import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AuthRouter = ({ children }) => {
  const token = useSelector(state => state.user.token)
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace />
  }
}

export default AuthRouter
