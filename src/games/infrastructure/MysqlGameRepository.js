const SequelizeGame = require("./MysqlGameSchema")


module.exports = class MysqlGameRepository {
    
    async createGame(playerId, game) {

        try {

            await SequelizeGame.create({
                diceOne: game.diceOne,
                diceTwo: game.diceTwo,
                result: game.result,
                won: game.won,
                playerId
            });

            
        } catch (err) {
            throw new Error('Error saving game' + err.message);
        }
    }


    async deleteGames(playerId) {

        try {

           await SequelizeGame.destroy({
                where: {
                    playerId
                }
            });
            
        } catch (err) {
            throw new Error('Error deleting game' + err.message);
        }
    }
};