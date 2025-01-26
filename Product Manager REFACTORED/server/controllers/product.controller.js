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
    createNewProduct: (request, response) => {
        Product.create(request.body)
            .then(product => response.json(product))
            .catch(error => response.json(error));
    },

    // Update an existing product by ID
    updateExistingProduct: (request, response) => {
        Product.findOneAndUpdate(
            { _id: request.params.id },
            request.body,
            { new: true ,runValidators: true },
        )
            .then(updatedProduct => response.json(updatedProduct))
            .catch(error => response.json(error));
    },

    // Delete an existing product by ID
    deleteAnExistingProduct: (request, response) => {
        Product.deleteOne({ _id: request.params.id })
            .then(response => response.json(response))
            .catch(error => response.json(error));
    }
};