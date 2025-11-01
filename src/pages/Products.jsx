import React, {useEffect, useState} from 'react'
import api from '../lib/apiClient'
import ProductCard from '../components/ProductCard'

export default function Products(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(()=> setLoading(false))
  },[])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => <ProductCard key={p._id || p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
