module.exports = PlayerRepository => async (playerId, username) => {

    const player = await PlayerRepository.getByUsername(username);

    if (player) throw new Error(`Username '${player.username}' already exist in the system!`);

    await PlayerRepository.update(playerId, username);

    return `Player has updated his username to '${username}' successfully`;

}