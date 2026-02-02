import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated } from './demoAuth'

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />
  }

  return children
}

export default RequireAuth


