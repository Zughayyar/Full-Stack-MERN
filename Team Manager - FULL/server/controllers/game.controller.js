const {Game} = require('../models/game.model')

module.exports = {
    // Retrieve all Games
    findAllGames: (request, response) => {
        Game.find(undefined, undefined, undefined)
            .then(games => response.json(games))
            .catch(error => response.json(error));
    },

    // Retrieve a single Game by ID
    findOneGame: (request, response) => {
        let gameId = request.params.gameId;
        Game.findOne({_id: gameId}, undefined, undefined)
            .then(game => response.json(game))
            .catch(error => response.json(error));
    },

    // Create a new Game (Insert)
    createGame: (request, response) => {
        Game.create(request.body, undefined)
            .then(game => response.json(game))
            .catch(error => response.status(400).json(error));
    },

    // Update an existing Author by ID
    updateGame: (request, response) => {
        let gameId = request.params.gameId;
        // Extract data to update the request body
        Game.findOneAndUpdate(
            {_id: gameId},
            {$set: request.body},
            { new: true, runValidators: true, includeResultMetadata: true, lean: true }
        )
            .then(game => {
                if (!game) {
                    return response.status(400).json({message: 'Game not found'});
                }
                else {
                    response.json(game);
                }
            })
            .catch(error => response.status(400).json(error));
    },

    // Delete an existing Author by ID
    deleteGame: (request, response) => {
        let gameId = request.params.gameId;
        Game.deleteOne({_id: gameId}, undefined)
            .then(game => response.json(game))
            .catch(error => response.status(400).json(error));
    },

    // Populate all players in one game
    populatePlayersInGame: (request, response) => {
        let gameId = request.params.gameId;
        Game.findOne({_id: gameId}, undefined, undefined)
            .populate('players')
            .then(game => response.json(game))
            .catch(error => response.status(400).json(error));
    },

    // Add a player to a game (Preventing duplicate player IDs)
    addPlayerToGame: (request, response) => {
        let gameId = request.params.gameId;
        let playerId = request.body.playerId;

        if (!playerId) {
            return response.status(400).json({ message: 'Player ID is required' });
        }

        Game.findById(gameId, undefined, undefined)  // Find the game first
            .then(game => {
                if (!game) {
                    return response.status(404).json({ message: 'Game not found' });
                }

                if (game.players.includes(playerId)) { // Check if player is already in the game
                    return response.status(400).json({ message: 'Player is already in this game' });
                }

                // If the player is not already in the game, add them:
                return Game.findOneAndUpdate(
                    { _id: gameId },
                    { $push: { players: playerId } }, // Use $push to add
                    { new: true, runValidators: true,includeResultMetadata: true, lean: true }
            })
            .then(updatedGame => {
                if (!updatedGame) { // Handle cases where findOneAndUpdate might not return a result
                    return response.status(404).json({ message: 'Game not found' });
                }
                response.json(updatedGame);
            })
            .catch(error => {
                console.error("Error adding player to game:", error); // Log the error on the server
                response.status(500).json({ message: 'An error occurred' }); // Send a generic error to the client
            });
    }
}