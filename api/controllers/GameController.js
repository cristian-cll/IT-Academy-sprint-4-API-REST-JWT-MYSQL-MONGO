// Use cases
const CreateGame = require("../../src/games/application/CreateGame");
const DeleteGames = require("../../src/games/application/DeleteGames");

module.exports = (dependecies) => {

    // Dependencies
    const { gameRepository, playerRepository } = dependecies.DatabaseService;

    // Injecting dependencies
    const NewGameCommand = CreateGame(gameRepository, playerRepository);
    const DeleteGamesCommand = DeleteGames(gameRepository, playerRepository);

    const newGame = async (req, res, next) => {

        // Extract player id from query
        const { playerId } = req.params;        
        
        // Call use case
        try {
            const newGame = await NewGameCommand(playerId);
            res.status(201);
            res.json(newGame);
        } catch (error) {
            next(error);
        }

    };

    const deleteGames = async (req, res, next) => {

        // Extract player id from query
        const { playerId } = req.params;

        // Call use case
        try {
            const playerDeletedGames = await DeleteGamesCommand(playerId);
            res.status(202);
            res.json({
                message: `Games deleted` ,
                player: playerDeletedGames
            });
        } catch (error) {
            next(error);
        }
    };
 
    return {
        newGame,
        deleteGames
    };
    
};
