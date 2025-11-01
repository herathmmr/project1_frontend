import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile(){
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  let payload = null
  try{
    if(token){
      const raw = token.split('.')[1]
      payload = JSON.parse(atob(raw))
    }
  }catch(e){
    // ignore
  }

  const logout = ()=>{
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      {payload ? (
        <div className="space-y-2">
          <div><strong>Name:</strong> {payload.firstName} {payload.lastName}</div>
          <div><strong>Email:</strong> {payload.email}</div>
          <div><strong>Role:</strong> {payload.role}</div>
        </div>
      ) : (
        <div className="text-sm text-gray-500">No profile info available.</div>
      )}
      <div className="mt-4">
        <button onClick={logout} className="px-3 py-2 bg-red-600 text-white rounded">Logout</button>
      </div>
    </div>
  )
}
