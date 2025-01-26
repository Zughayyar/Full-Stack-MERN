const mongoose = require('mongoose');

// Define the schema
const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

// Export the model
module.exports.Product = mongoose.model('Product', ProductSchema);