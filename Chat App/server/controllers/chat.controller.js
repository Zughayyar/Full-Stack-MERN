const {Chat} = require('../models/chat.model');

module.exports = {
    // Retrieve all chats
    findAllChats: (request, response) => {
        Chat.find(undefined, undefined, undefined)
            .then(allChats => response.json(allChats))
            .catch(error => response.json(error));
    },

    // Create a new Chat (Insert)
    createChat: (request, response) => {
        Chat.create(request.body, undefined)
            .then(chat => response.json(chat))
            .catch(error => response.status(400).json(error));
    },

    // Delete an existing Chat by ID
    deleteChat: (request, response) => {
        let chatId = request.params.chatId;
        Chat.deleteOne({_id: chatId}, undefined)
            .then(chat => response.json(chat))
            .catch(error => response.status(400).json(error));
    }

}