const ChatController = require("../controllers/chat.controller");


module.exports = (app) => {
    app.get("/api/chats", ChatController.findAllChats)
    app.post("/api/chats", ChatController.createChat)
    app.delete("/api/chats/:id", ChatController.deleteChat)
}