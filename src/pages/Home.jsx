import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaStar, FaEnvelope } from 'react-icons/fa'
import api from '../lib/apiClient'

export default function Home(){
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    // Fetch featured products (latest 3)
    api.get('/products?limit=3')
      .then(res => setFeaturedProducts(res.data))
      .catch(err => console.error('Failed to load featured products:', err))
  }, [])

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Our Store</h1>
            <p className="text-xl mb-8 text-blue-100">Discover amazing products and share your experience with our community</p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/products" 
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Browse Products
              </Link>
              <Link 
                to="/register" 
                className="px-8 py-3 border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-blue-900/20"></div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaShoppingCart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            <p className="text-gray-600">Browse through our extensive collection of quality products</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaStar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
            <p className="text-gray-600">Share your experience and read authentic reviews</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Contact</h3>
            <p className="text-gray-600">Get in touch with us for any inquiries or support</p>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredProducts.map(product => (
                <Link 
                  key={product._id} 
                  to={`/products/${product._id}`}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    <p className="text-blue-600 font-semibold">${product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="container mx-auto px-6 text-center pb-16">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join our community today and discover amazing products. Get started with your shopping journey!
        </p>
        <Link 
          to="/register" 
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Create an Account
        </Link>
      </div>
    </div>
  )
}
