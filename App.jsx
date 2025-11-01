import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Inquiry from './pages/Inquiry'
import Profile from './pages/Profile'
import AdminDashboard from './pages/admin/Dashboard'
import ProductManagement from './pages/admin/ProductManagement'
import UserManagement from './pages/admin/UserManagement'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/routes/AdminRoute'
import RedirectBasedOnRole from './components/routes/RedirectBasedOnRole'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/:id" element={<ProductDetail/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/inquiry" element={<PrivateRoute><Inquiry/></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard/></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><ProductManagement/></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><UserManagement/></AdminRoute>} />
          <Route path="/redirect" element={<RedirectBasedOnRole />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
