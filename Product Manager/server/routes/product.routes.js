const ProductController = require('../controllers/product.controller');

module.exports = (app) => {
    // Retrieve all products
    app.get('/api/products', ProductController.findAllProducts);

    // Retrieve a single product by ID
    app.get('/api/products/:id', ProductController.findOneSingleProduct);

    // Update an existing product by ID
    app.patch('/api/products/:id', ProductController.updateExistingProduct);

    // Create a new product
    app.post('/api/products', ProductController.createNewProduct);

    // Delete a product by ID
    app.delete('/api/products/:id', ProductController.deleteAnExistingProduct);
};