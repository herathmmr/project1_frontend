import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'

export default function Header(){
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const logout = ()=>{
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">Store</Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/products" className="text-gray-700">Products</Link>
          {token ? (
            <>
              <Link to="/profile" className="text-gray-700">Profile</Link>
              <button onClick={logout} className="text-gray-700">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700">Login</Link>
              <Link to="/register" className="text-gray-700">Register</Link>
            </>
          )}
          <Link to="/cart" className="text-gray-700"><FaShoppingCart/></Link>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-gray-700" onClick={()=>setOpen(!open)} aria-label="Toggle menu">
          {open ? <FaTimes/> : <FaBars/>}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2">
            <Link to="/products" onClick={()=>setOpen(false)} className="block">Products</Link>
            {token ? (
              <>
                <Link to="/profile" onClick={()=>setOpen(false)} className="block">Profile</Link>
                <button onClick={()=>{ setOpen(false); logout(); }} className="block text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={()=>setOpen(false)} className="block">Login</Link>
                <Link to="/register" onClick={()=>setOpen(false)} className="block">Register</Link>
              </>
            )}
            <Link to="/cart" onClick={()=>setOpen(false)} className="block">Cart</Link>
          </div>
        </div>
      )}
    </header>
  )
}
