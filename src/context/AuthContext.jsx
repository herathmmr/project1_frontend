import React, { createContext, useContext, useState, useEffect } from 'react'
import { storage } from '../utils/localStorage'
import api from '../lib/apiClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try to get user from localStorage on mount
    const storedUser = storage.get('user')
    if (storedUser) {
      setUser(storedUser)
      // Set authorization header for API calls
      api.defaults.headers.common['Authorization'] = `Bearer ${storedUser.token}`
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    const userData = response.data
    setUser(userData)
    storage.set('user', userData)
    api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
    return userData
  }

  const register = async (userData) => {
    const response = await api.post('/auth/register', userData)
    const newUser = response.data
    setUser(newUser)
    storage.set('user', newUser)
    api.defaults.headers.common['Authorization'] = `Bearer ${newUser.token}`
    return newUser
  }

  const logout = () => {
    setUser(null)
    storage.remove('user')
    delete api.defaults.headers.common['Authorization']
  }

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    storage.set('user', updatedUser)
    return updatedUser
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateUser,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  )
}