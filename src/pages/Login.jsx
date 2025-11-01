import React, {useState} from 'react'
import api from '../lib/apiClient'
import toast from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const submit = (e) =>{
    e.preventDefault()
    api.post('/users/login', { email, password })
      .then(res => {
        const token = res.data.token
        if(token) {
          localStorage.setItem('token', token)
          toast.success('Login successful')
          
          // Decode token to get role
          const payload = JSON.parse(atob(token.split('.')[1]))
          if(payload.role === 'admin') {
            navigate('/admin/dashboard')
          } else {
            // Navigate to the requested page or home
            const from = location.state?.from?.pathname || '/'
            navigate(from)
          }
        }
      })
      .catch(err => {
        console.error(err)
        toast.error('Login failed')
      })
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-4">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 border rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-3 py-2 border rounded" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
      </form>
    </div>
  )
}
