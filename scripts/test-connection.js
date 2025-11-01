const axios = require('axios')

console.log('Testing backend API connection...')

axios.get('http://localhost:3003/api/products')
  .then(response => {
    console.log('✅ Backend API connection successful!')
    console.log(`Found ${response.data.length} products`)
    process.exit(0)
  })
  .catch(error => {
    console.error('❌ Backend API connection failed!')
    if (error.code === 'ECONNREFUSED') {
      console.error('Backend server is not running. Please start it with:')
      console.error('cd "e:\\Course Videos\\project1" && npm start')
    } else {
      console.error('Error:', error.message)
    }
    process.exit(1)
  })