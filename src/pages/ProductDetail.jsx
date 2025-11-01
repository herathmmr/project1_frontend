import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import api from '../lib/apiClient'
import ReviewForm from '../components/ReviewForm'

export default function ProductDetail(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(()=>{
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
  },[id])

  if(!product) return <div>Loading...</div>

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{product.name || product.title}</h2>
      <img src={product.image || product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded mb-4" />
      <p className="mb-4">{product.description}</p>
      <p className="text-xl font-semibold">Price: ${product.price}</p>
      {/* Reviews listing if present */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Reviews</h3>
        {(product.reviews || []).length === 0 ? (
          <div className="text-sm text-gray-500">No reviews yet.</div>
        ) : (
          <div className="space-y-3">
            {(product.reviews || []).map((r, idx)=> (
              <div key={r._id || idx} className="bg-white p-3 rounded shadow-sm">
                <div className="text-sm font-semibold">{r.userName || r.email || 'User'}</div>
                <div className="text-sm text-yellow-600">Rating: {r.rating}</div>
                <div className="mt-1 text-gray-700">{r.comment}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ReviewForm productId={product._id || product.id} onPosted={() => {
        // simple refresh: re-fetch product
        api.get(`/products/${id}`).then(res => setProduct(res.data)).catch(()=>{})
      }} />
    </div>
  )
}
