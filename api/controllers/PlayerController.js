// Use cases
const AddPlayer = require('../../src/players/application/CreatePlayer');
const GetAllPlayers = require('../../src/players/application/GetAllPlayers');
const GetPlayer = require('../../src/players/application/GetPlayerById');
const UpdatePlayer = require('../../src/players/application/UpdatePlayer');
const GetAccessToken = require('../../src/shared/application/security/GetAccessToken');

module.exports = (dependencies) => {

    // Dependencies
    const { playerRepository } = dependencies.DatabaseService;
    const { Authentication } = dependencies;

    // Injecting dependencies
    const AddPlayerCommand = AddPlayer(playerRepository);
    const GetAllPlayersCommand = GetAllPlayers(playerRepository);
    const GetPlayerCommand = GetPlayer(playerRepository);
    const UpdatePlayerCommand = UpdatePlayer(playerRepository);
    const createTokenCommand = GetAccessToken(playerRepository, Authentication);


    const addNewPlayer = async (req, res, next) => {

        // Extract player username
        const { username } = req.body;

        // Call use case
        try {
            const player = await AddPlayerCommand(username);
            const token = await createTokenCommand(player.username, player._id)
            res.status(201);
            res.json({
                id: player._id,
                token
            });
        } catch (error) {
            next(error);
        }

    };

    const getAllPlayers = async (req, res, next) => {

        // Call use case
        try {
            const players = await GetAllPlayersCommand();
            res.status(200);
            res.json(players);
        } catch (error) {
            next(error);
        }

    };

    const getPlayer = async (req, res, next) => {

        // Extract player id from query
        const { playerId } = req.params;

        // Call use case
        try {
            const players = await GetPlayerCommand(playerId);
            res.status(200);
            res.json(players);
        } catch (error) {
            next(error);
        }

    };

    const editPlayer = async (req, res, next) => {

        // Extract player id from query and username from body request
        const { playerId } = req.params;
        const { username } = req.body;

        // Call use case
        try {
            const player = await UpdatePlayerCommand(playerId, username);
            res.status(200);
            res.json(player);
        } catch (error) {
            next(error);
        }

    };
    return {
        addNewPlayer,
        getAllPlayers,
        getPlayer,
        editPlayer
    };
};
