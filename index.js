const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app)
const io = require('socket.io')(server)

app.use(express.static('.'))

app.get('/', (req, res) => {
    res.redirect('index.html')
})

server.listen(3000)