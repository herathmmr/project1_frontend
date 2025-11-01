import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function AdminRoute({ children }) {
  const token = localStorage.getItem('token')
  const location = useLocation()
  const [isAdmin, setIsAdmin] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (token) {
      try {
        // Decode JWT payload
        const payload = JSON.parse(atob(token.split('.')[1]))
        setIsAdmin(payload.role === 'admin')
      } catch (e) {
        setIsAdmin(false)
      }
    } else {
      setIsAdmin(false)
    }
    setLoading(false)
  }, [token])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!token || !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}