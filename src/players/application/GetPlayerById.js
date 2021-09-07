module.exports = PlayerRepository => async playerId => {

    return await PlayerRepository.getById(playerId);
}