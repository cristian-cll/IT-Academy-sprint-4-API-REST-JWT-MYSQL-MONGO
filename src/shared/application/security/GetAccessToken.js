module.exports = (PlayerRepository, accessToken) => async (username, _id) => {

    const player = await PlayerRepository.getById(_id);

    if (!player || player.username !== username) {
        throw new Error("Bad Credentials");
    }

    return accessToken.generate({
        _id: player.id,
        username: player.username
    });

};