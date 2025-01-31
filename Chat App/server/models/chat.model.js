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

ChatSchema.set("toJSON", {
    transform: function (doc, ret) {
        // Keeping the createdAt timestamp as a standard ISO string (no modification)
        ret.createdAt = ret.createdAt.toISOString();
        return ret;
    },
});

// Export the model
module.exports.Chat = mongoose.model('Chat', ChatSchema);