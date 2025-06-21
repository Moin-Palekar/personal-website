const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.send('Hello World!')
})

app.get('/home', (req, res) => {
  res.send('Hello World!')
})

app.get('/contact', (req, res) => {
  res.send('Hello World!')
})

app.get('/blog', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})