import React from 'react'
import { Navigate } from 'react-router-dom'

export default function RedirectBasedOnRole() {
  const token = localStorage.getItem('token')
  const [role, setRole] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setRole(payload.role)
      } catch (e) {
        setRole(null)
      }
    }
    setLoading(false)
  }, [token])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  }

  return <Navigate to="/" replace />
}