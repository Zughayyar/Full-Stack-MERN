const mongoose = require('mongoose');

// Define the schema
const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        minLength: [5, "Name must be at least 5 characters long"],
    }
}, { timestamps: true });

// Export the model
module.exports.Author = mongoose.model('Author', AuthorSchema);