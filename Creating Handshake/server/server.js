require("dotenv").config();
require("./config/mongoose.config");

const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

// Middleware
app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

// Routes
const playerRoutes = require("./routes/player.routes");
playerRoutes(app);


// Socket.io connection handler
io.on("connection", (socket) => {
    console.log("User connected, socket id=" + socket.id);
    socket.on("sendMessage", (data) => {
        console.log(data);
        socket.broadcast.emit("receiveMessage", data);
    })
});



// Start server
server.listen(port, () => {
    console.log(`Listening at Port ${port}`);
});