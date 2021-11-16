const Player = require('../domain/Player');
const PlayerRepository = require('../../shared/domain/player/PlayerRepository');
const MongoosePlayer = require("./MongoosePlayerSchema");

module.exports = class MongoPlayerRepository extends PlayerRepository {

    constructor() {
        super();
    }

    async add(player) {

        try {

            const mongoosePlayer = new MongoosePlayer({
                username: player.username,
                games: player.games
            });
            await mongoosePlayer.save();

            return mongoosePlayer._id;

        } catch (error) {
            throw new Error('Error Occurred');
        }

    }

    async update(playerId, username) {

        try {
            return await MongoosePlayer.findByIdAndUpdate(playerId, { username: username });

        } catch (error) {
            throw new Error('Player ID not found');
        }

    }

    async getById(playerId) {

        try {
            return await MongoosePlayer.findById(playerId, {
                username: 1, games: 1, success_rate: { $ifNull: [{ $avg: "$games.won" }, 0] }
            });
        } catch (err) {
            throw new Error('Player ID not found');
        }

    }

    async getByUsername(username) {

        try {
            return await MongoosePlayer.findOne(
                { username: username }
            );

        } catch (err) {
            throw new Error('Player not found');
        }

    }

    async getAll() {

        const data = await MongoosePlayer.aggregate([
            { $project: { _id: 0, username: 1, success_rate: { $avg: "$games.won" } } }
        ]);

        return data.map(({ username, _id, success_rate }) => new Player(username, _id, success_rate));

    }

};