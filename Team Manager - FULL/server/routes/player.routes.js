const PlayerController = require("../controllers/player.controller")

module.exports = (app) => {
    // Retrieve all Players
    app.get('/api/players', PlayerController.findAllPlayers)

    // Retrieve a single Player by ID
    app.get('/api/players/:playerId', PlayerController.findOnePlayer)

    // Create a new Player
    app.post('/api/players', PlayerController.createPlayer)

    // Update a Player
    app.patch('/api/players/:playerId', PlayerController.updatePlayer)

    // Delete a Player by ID
    app.delete('/api/players/:playerId', PlayerController.deletePlayer)
}