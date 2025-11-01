import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({product}){
  return (
    <div className="bg-white rounded shadow-sm overflow-hidden">
      <img src={product.image || product.imageUrl || 'https://via.placeholder.com/400x250'} alt={product.name} className="w-full h-44 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{product.name || product.title}</h3>
        <p className="text-gray-600">${product.price}</p>
        <div className="mt-3">
          <Link to={`/products/${product._id || product.id}`} className="text-sm text-blue-600">View</Link>
        </div>
      </div>
    </div>
  )
}
