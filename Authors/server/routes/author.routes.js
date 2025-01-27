const AuthorController = require("../controllers/Author.controller");

module.exports =(app) => {

    // Retrieve all Authors
    app.get('/api/authors', AuthorController.findAllAuthors)

    // Retrieve a single Author by ID
    app.get('/api/authors/:authorId', AuthorController.findOneAuthor)

    // Create a new author
    app.post('/api/authors', AuthorController.createAuthor)

    // Update an Author
    app.patch('/api/authors/:authorId', AuthorController.updateAuthor)

    // Delete an author by ID
    app.delete('/api/authors/:authorId', AuthorController.deleteAuthor)

}