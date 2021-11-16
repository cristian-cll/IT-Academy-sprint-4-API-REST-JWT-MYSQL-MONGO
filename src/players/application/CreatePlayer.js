const Player = require('../domain/Player');

module.exports = PlayerRepository => async username => {

    const player = await PlayerRepository.getByUsername(username);

    if (player) throw new Error(`Username '${player.username}' already exist in the system!`);

    if (!username || (/\s/.test(username))) {
        username = "Anonymous";
    }

    // Create new player object
    let newPlayer = new Player(username);

    // Persist player
    const _id = await PlayerRepository.add(newPlayer);

    return {
        _id,
        username
    };
}


