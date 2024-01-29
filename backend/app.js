const express = require("express")

const app = express()
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, { cors: {
    origin : "http://localhost:3000",
    methods : ["GET", "POST"]
    },
})

io.on("connection", (socket) => {
    console.log(socket.id)
    //io.emit("receive-message", "Mor kaka baba ra bolere")

    //socket.emit("send-message", "Mor kaka baba ra bolere")
    socket.on("join_room", (room) => {
        console.log("joined to room",  room)
        socket.join(room)
    })

    socket.on("send-message", (message, room, user) => {
        console.log("message", message)
        console.log("user", user)
        console.log("room", room)
        socket.to(room).emit("receive-message", user + " : " + message)
    })

    socket.on("disconnect", () => {
        console.log("user disconnected: ", socket.id )
    })
})


server.listen(5000, () => {
    console.log("Server Running on port: 5000")
})