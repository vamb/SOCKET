const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
  }
})

io.on("connection", socket => {
  console.log(`User connected: ${socket?.id}`)

  socket.on("join_room", data => {
    socket.join(data)
  })

  // socket.on("send_message", (data)=>{
  //   console.log('data', data)
  //   socket.broadcast.emit("receive_message", data)
  // })

  socket.on("send_message", data => {
    socket.to(data?.['room']).emit("receive_message", data)
  })
})


server.listen(3001, ()=>{
  console.log("SERVER IS RUNNING 222 333")
})
