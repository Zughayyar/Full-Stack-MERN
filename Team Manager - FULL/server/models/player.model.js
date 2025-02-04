const mongoose = require('mongoose')

// Define Schema
const PlayerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: [true, 'Player name is required'],
        minLength: [2, 'Player name must be at least 2 characters']
    },
    preferredPosition: {
        type: String
    },
    playerStatus: {
        type: String,
        default: "undefined"
    }
}, { timestamps: true })

// Export the Model
module.exports.Player = mongoose.model('Player', PlayerSchema)