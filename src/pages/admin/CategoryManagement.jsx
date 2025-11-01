import React, { useState, useEffect } from 'react'
import api from '../../lib/apiClient'
import toast from 'react-hot-toast'
import { FaPlus, FaTrash, FaSave } from 'react-icons/fa'

export default function CategoryManagement() {
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories')
      setCategories(res.data)
    } catch (err) {
      console.error(err)
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  const addCategory = async (e) => {
    e.preventDefault()
    if (!newCategory.trim()) return

    try {
      await api.post('/categories', { name: newCategory })
      toast.success('Category added')
      setNewCategory('')
      fetchCategories()
    } catch (err) {
      console.error(err)
      toast.error('Failed to add category')
    }
  }

  const deleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure? This will not delete products in this category.')) return

    try {
      await api.delete(`/categories/${categoryId}`)
      toast.success('Category deleted')
      fetchCategories()
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete category')
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold">Category Management</h2>
      
      {/* Add Category Form */}
      <form onSubmit={addCategory} className="flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
        >
          <FaPlus /> Add Category
        </button>
      </form>

      {/* Categories List */}
      <div className="space-y-2">
        {categories.map(category => (
          <div
            key={category._id}
            className="flex items-center justify-between p-3 border rounded hover:bg-gray-50"
          >
            <span>{category.name}</span>
            <button
              onClick={() => deleteCategory(category._id)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}