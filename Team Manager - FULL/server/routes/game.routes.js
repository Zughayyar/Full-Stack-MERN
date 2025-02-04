const GameController = require("../controllers/game.controller")

module.exports = (app) => {
    // Retrieve all Games
    app.get('/api/games', GameController.findAllGames)

    // Retrieve a single Game by ID
    app.get('/api/games/:gameId', GameController.findOneGame)

    // Create a new Game
    app.post('/api/games', GameController.createGame)

    // Update a Game
    app.patch('/api/games/:gameId', GameController.updateGame)

    // Delete a Game by ID
    app.delete('/api/games/:gameId', GameController.deleteGame)

    // Add a Player to a Game
    app.post('/api/games/:gameId/addPlayer', GameController.addPlayerToGame)

    // Retrieve all players in one game
    app.get('/api/games/:gameId/players', GameController.populatePlayersInGame)
}