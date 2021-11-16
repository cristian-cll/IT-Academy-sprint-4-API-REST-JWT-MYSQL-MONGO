const Game = require('../domain/Game');

module.exports = GameRepository => async playerId => {

    // create new game object
    let newGame = Game.play();

    // Persist player
    await GameRepository.createGame(playerId, newGame);

    return newGame;

};