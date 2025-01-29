require('dotenv').config();
require('./config/mongoose.config');

const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const http = require("http");
const { Server } = require("socket.io");

// Middleware
app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

// Socket.io connection handler
io.on("connection", (socket) => {
    console.log("User connected, socket id=" + socket.id);
    socket.on("sendMessage", (data) => {
        console.log(data);
        socket.broadcast.emit("receiveMessage", data);
    })
})

// Start server
server.listen(port, () => {
    console.log(`Listening at Port ${port}`);
});