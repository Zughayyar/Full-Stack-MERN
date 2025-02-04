const mongoose = require('mongoose')

// Define Schema
const GameSchema = new mongoose.Schema({
    GameNumber: {
        type: Number,
        required: [true, 'Game Number is required'],
        unique: true
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    }]
}, { timestamps: true })

// Export the Model
module.exports.Game = mongoose.model('Game', GameSchema)