const mongoose = require('mongoose');

// Define the schema
const ChatSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    message: {
        type: String,
    }
}, { timestamps: true });

// Export the model
module.exports.Chat = mongoose.model('Chat', ChatSchema);