import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../lib/apiClient'
import { FaBox, FaUsers, FaChartBar } from 'react-icons/fa'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    reviews: 0
  })
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    Promise.all([
      api.get('/products'),
      api.get('/users')
    ]).then(([productsRes, usersRes]) => {
      setStats({
        products: productsRes.data.length,
        users: usersRes.data.length,
        reviews: 0 // Add reviews count when available
      })
      setLoading(false)
    }).catch(err => {
      console.error(err)
      setLoading(false)
    })
  }, [])

  if(loading) return <div>Loading...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <h3 className="text-2xl font-bold">{stats.products}</h3>
            </div>
            <FaBox className="text-blue-500 text-2xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold">{stats.users}</h3>
            </div>
            <FaUsers className="text-green-500 text-2xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Reviews</p>
              <h3 className="text-2xl font-bold">{stats.reviews}</h3>
            </div>
            <FaChartBar className="text-purple-500 text-2xl" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link 
          to="/admin/products" 
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2">Manage Products</h3>
          <p className="text-gray-600">Add, edit, or remove products from your store.</p>
        </Link>

        <Link 
          to="/admin/users" 
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
          <p className="text-gray-600">View and manage user accounts and roles.</p>
        </Link>
      </div>
    </div>
  )
}