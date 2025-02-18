import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { useEffect } from 'react'

const AuthRouter = ({ children }) => {
  const token = useSelector(state => state.user)
  console.log(token)

  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace />
  }
}

export default AuthRouter
