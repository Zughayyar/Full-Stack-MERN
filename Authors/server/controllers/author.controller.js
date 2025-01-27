const {Author} = require('../models/author.model');

module.exports = {
    // Retrieve all authors
    findAllAuthors: (request, response) => {
        Author.find(undefined, undefined, undefined)
        .then(allAuthors => response.json(allAuthors))
        .catch(error => response.json(error));
    },

    // Retrieve a single Author by ID
    findOneAuthor: (request, response) => {
        let authorId = request.params.authorId;
        Author.findOne({_id: authorId}, undefined, undefined)
        .then(author => response.json(author))
        .catch(error => response.json(error));
    },

    // Create a new Author (Insert)
    createAuthor: (request, response) => {
        Author.create(request.body, undefined)
        .then(author => response.json(author))
        .catch(error => response.status(400).json(error));
    },

    // Update an existing Author by ID
    updateAuthor: (request, response) => {
        let authorId = request.params.authorId;

        // Extract data to update from the request body
        Author.findOneAndUpdate(
            { _id: authorId },            // Filter: Find author by ID
            { $set: request.body },       // Update: Fields to update
            { new: true, runValidators: true } // Options: Return updated document, apply validation
        )
            .then(author => {
                if (!author) {
                    return response.status(404).json({ message: "Author not found" });
                }
                response.json(author);    // Return the updated author
            })
            .catch(error => response.status(400).json(error)); // Handle errors
    },

    // Delete an existing Author by ID
    deleteAuthor: (request, response) => {
        let authorId = request.params.authorId;
        Author.deleteOne({_id: authorId}, undefined)
        .then(author => response.json(author))
        .catch(error => response.status(400).json(error));
    }




}