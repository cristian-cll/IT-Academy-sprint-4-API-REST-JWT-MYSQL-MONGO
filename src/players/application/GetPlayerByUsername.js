module.exports = PlayerRepository => async playerUsername => {

    return PlayerRepository.getByUsername(playerUsername);
}
