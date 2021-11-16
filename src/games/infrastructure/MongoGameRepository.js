const PlayerRepository = require('../../shared/domain/player/PlayerRepository');
const MongoosePlayer = require("../../players/infrastructure/MongoosePlayerSchema")

module.exports = class MongoGameRepository extends PlayerRepository {

    constructor() {
        super();
    }

    async createGame(playerId, game) {

        try {

            const playerInstance = await MongoosePlayer.findById(playerId) 

            playerInstance.games.push(game);
            return await playerInstance.save();
            
        } catch (err) {
            throw new Error('Error saving game' + err.message);
        }

    }


    async deleteGames(playerId) {

        try {
            const playerInstance = await MongoosePlayer.findById(playerId) 
            playerInstance.games = [];
            await playerInstance.save()
            return playerInstance;
            
        } catch (err) {
            throw new Error('Error deleting game' + err.message);
        }

    }
};