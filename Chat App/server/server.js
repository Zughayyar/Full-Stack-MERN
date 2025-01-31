require('dotenv').config();
require('./config/mongoose.config');

const express = require('express');
const cors = require('cors');
const http = require("http");
const { Server } = require("socket.io");
const ChatController = require("./controllers/chat.controller"); // Import ChatController

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

    socket.on("sendMessage", async (data) => {
        try {
            // Call the existing createChat function
            const req = { body: data };  // Simulate Express request
            const res = {
                json: (savedChat) => {
                    console.log("Message saved:", savedChat);
                    io.emit("receiveMessage", savedChat); // Send saved message to all clients
                },
                status: () => ({
                    json: (err) => console.error("Error saving message:", err),
                }),
            };

            await ChatController.createChat(req, res);
        } catch (error) {
            console.error("Error handling sendMessage:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected, socket id=" + socket.id);
    });
});

// Import and use API routes
const ChatRoutes = require("./routes/chat.routes");
ChatRoutes(app);

// Start server
server.listen(port, () => {
    console.log(`Listening at Port ${port}`);
});

