const express = require("express")
var bodyParser = require('body-parser')
var cors = require('cors')
require('./models/index')
const userApi = require('./controllers/user')
const bookingApi = require('./controllers/booking')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/user', userApi.addUser)
app.get('/checkUser/:email', userApi.checkUser)
app.post('/book', bookingApi.addBooking)

app.listen(process.env.PORT || 8000, () => {
    console.log('app running on port 8000')
})