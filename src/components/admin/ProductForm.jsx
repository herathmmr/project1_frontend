import React, { useState, useEffect } from 'react'
import api from '../../lib/apiClient'
import toast from 'react-hot-toast'

export default function ProductForm({ product, onSave, onCancel }) {
  const [categories, setCategories] = useState([])
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    image: product?.image || '',
    category: product?.category || '',
    stock: product?.stock || 0
  })

  useEffect(() => {
    // Fetch categories
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Failed to load categories:', err))
  }, [])

  const onChange = (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('description', form.description)
      formData.append('price', form.price)
      formData.append('category', form.category)
      formData.append('stock', form.stock)
      
      if (imageFile) {
        formData.append('image', imageFile)
      } else if (form.image) {
        formData.append('image', form.image)
      }

      if (product?._id) {
        await api.put(`/products/${product._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Product updated successfully')
      } else {
        await api.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Product created successfully')
      }
      onSave()
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Failed to save product')
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
          rows="3"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
          step="0.01"
          min="0"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {imagePreview && (
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-32 h-32 object-cover rounded border"
            />
          )}
          {!imagePreview && form.image && (
            <img 
              src={form.image} 
              alt="Current" 
              className="w-32 h-32 object-cover rounded border"
            />
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Stock</label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
          min="0"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <button 
          type="button" 
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {product?._id ? 'Update' : 'Create'} Product
        </button>
      </div>
    </form>
  )
}