const axios = require('axios')

const base = 'http://localhost:3003/api'

axios.get(`${base}/products`)
  .then(res => {
    if(Array.isArray(res.data)){
      console.log('SMOKE OK: products endpoint returned', res.data.length, 'items')
      process.exit(0)
    } else {
      console.error('SMOKE FAIL: products endpoint did not return an array')
      process.exit(2)
    }
  })
  .catch(err => {
    console.error('SMOKE ERROR:', err.message)
    process.exit(3)
  })
