const {Player} = require('../models/player.model')

module.exports = {
    // Retrieve all Players
    findAllPlayers: (request, response) => {
        Player.find(undefined, undefined, undefined)
            .then(players => response.json(players))
            .catch(error => response.json(error));
    },

    // Retrieve a single Author by ID
    findOnePlayer: (request, response) => {
        let playerId = request.params.playerId;
        Player.findOne({_id: playerId}, undefined, undefined)
            .then(player => response.json(player))
            .catch(error => response.json(error));
    },

    // Create a new Author (Insert)
    createPlayer: (request, response) => {
        Player.create(request.body, undefined)
            .then(player => response.json(player))
            .catch(error => response.status(400).json(error));
    },

    // Update an existing Author by ID
    updatePlayer: (request, response) => {
        let playerId = request.params.playerId;
        // Extract data to update the request body
        Player.findOneAndUpdate(
            {_id: playerId},
            {$set: request.body},
            { new: true, runValidators: true, includeResultMetadata: true, lean: true }
        )
            .then(player => {
                if (!player) {
                    return response.status(400).json({message: 'Player not found'});
                }
                else {
                    response.json(player);
                }
            })
            .catch(error => response.status(400).json(error));
    },

    // Delete an existing Author by ID
    deletePlayer: (request, response) => {
        let playerId = request.params.playerId;
        Player.deleteOne({_id: playerId}, undefined)
            .then(player => response.json(player))
            .catch(error => response.status(400).json(error));
    }

}