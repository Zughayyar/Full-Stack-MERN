const { Product } = require('../models/product.model');

module.exports = {
    // Retrieve all products
    findAllProducts: (req, res) => {
        Product.find()
            .then(allProducts => res.json({ success: true, products: allProducts }))
            .catch(err => res.status(500).json({ success: false, error: err.message }));
    },

    // Retrieve a single product by ID
    findOneSingleProduct: (req, res) => {
        Product.findOne({ _id: req.params.id })
            .then(singleProduct => {
                if (!singleProduct) {
                    return res.status(404).json({ success: false, message: "Product not found" });
                }
                res.json({ success: true, product: singleProduct });
            })
            .catch(err => res.status(500).json({ success: false, error: err.message }));
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