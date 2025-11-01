import React, {useState} from 'react'
import api from '../lib/apiClient'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [form, setForm] = useState({firstName:'', lastName:'', email:'', password:'', address:'', phone:''})
  const navigate = useNavigate()

  const onChange = (e)=> setForm({...form, [e.target.name]: e.target.value})

  const submit = (e) =>{
    e.preventDefault()
    api.post('/users', form)
      .then(()=>{
        toast.success('Registered successfully')
        navigate('/login')
      })
      .catch(err => {
        console.error(err)
        toast.error('Registration failed')
      })
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input name="firstName" value={form.firstName} onChange={onChange} placeholder="First name" className="w-full px-3 py-2 border rounded" />
        <input name="lastName" value={form.lastName} onChange={onChange} placeholder="Last name" className="w-full px-3 py-2 border rounded" />
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" className="w-full px-3 py-2 border rounded" />
        <input name="password" value={form.password} onChange={onChange} type="password" placeholder="Password" className="w-full px-3 py-2 border rounded" />
        <input name="address" value={form.address} onChange={onChange} placeholder="Address" className="w-full px-3 py-2 border rounded" />
        <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone" className="w-full px-3 py-2 border rounded" />
        <button className="px-4 py-2 bg-green-600 text-white rounded">Register</button>
      </form>
    </div>
  )
}
