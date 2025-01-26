const { Product } = require('../models/product.model');

module.exports = {
    // Retrieve all products
    findAllProducts: (request, response) => {
        Product.find()
            .then(allProducts => response.json(allProducts))
            .catch(err => response.json(err));
    },

    // Retrieve a single product by ID
    findOneSingleProduct: (request, response) => {
        let id = request.params.id
        Product.findOne({ _id: id })
            .then(product => response.json(product))
            .catch(error => response.json(error));
    },

    // Create a new product
    createNewProduct: (req, res) => {
        Product.create(req.body)
            .then(newProduct => res.status(201).json({ success: true, product: newProduct }))
            .catch(err => res.status(400).json({ success: false, error: err.message }));
    },

    // Update an existing product by ID
    updateExistingProduct: (req, res) => {
        Product.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedProduct => {
                if (!updatedProduct) {
                    return res.status(404).json({ success: false, message: "Product not found" });
                }
                res.json({ success: true, product: updatedProduct });
            })
            .catch(err => res.status(400).json({ success: false, error: err.message }));
    },

    // Delete an existing product by ID
    deleteAnExistingProduct: (req, res) => {
        Product.deleteOne({ _id: req.params.id })
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.status(404).json({ success: false, message: "Product not found" });
                }
                res.json({ success: true, result });
            })
            .catch(err => res.status(500).json({ success: false, error: err.message }));
    }
};