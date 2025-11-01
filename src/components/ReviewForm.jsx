import React, {useState} from 'react'
import api from '../lib/apiClient'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function ReviewForm({ productId, onPosted }){
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  const submit = (e) =>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    if(!token){
      toast.error('Please login to post a review')
      navigate('/login')
      return
    }

    api.post('/reviews', { productId, rating, comment })
      .then(()=>{
        toast.success('Review posted')
        setComment('')
        setRating(5)
        if(onPosted) onPosted()
      })
      .catch(err=>{
        console.error(err)
        toast.error('Failed to post review')
      })
  }

  return (
    <form onSubmit={submit} className="mt-6 bg-white p-4 rounded shadow-sm">
      <h4 className="font-semibold mb-2">Leave a Review</h4>
      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm">Rating</label>
        <select value={rating} onChange={e=>setRating(e.target.value)} className="ml-2 border px-2 py-1 rounded">
          {[5,4,3,2,1].map(r=> <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Write your review" className="w-full border p-2 rounded mb-3" />
      <div className="text-right">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Submit Review</button>
      </div>
    </form>
  )
}
