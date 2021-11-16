module.exports = GameRepository => async playerId => {

    // Persist player
    return await GameRepository.deleteGames(playerId);

};