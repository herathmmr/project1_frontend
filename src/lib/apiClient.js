import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3003/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message
    })
    return Promise.reject(error)
  }
)

// Attach token when available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Health check function
api.checkConnection = async () => {
  try {
    await api.get('/products')
    console.log('✅ Backend API connection successful')
    return true
  } catch (err) {
    console.error('❌ Backend API connection failed:', err.message)
    return false
  }
}

export default api
