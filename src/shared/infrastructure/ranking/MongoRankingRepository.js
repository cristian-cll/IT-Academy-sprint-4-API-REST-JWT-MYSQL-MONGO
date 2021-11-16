const RankingRepository = require('../../domain/ranking/RankingRepository');
const MongoosePlayer = require("../../../players/infrastructure/MongoosePlayerSchema");

module.exports = class MongoRankingRepository extends RankingRepository {

    constructor() {
        super();
    }

    async getRanking() {

        return await MongoosePlayer.aggregate([
            { $unwind: "$games" },
            {
                $group: {
                    _id: null,
                    total_games_played: { $sum: 1 },
                    success_rate: { $avg: "$games.won" }
                }
            },
            { $project: { _id: 0, success_rate: 1, total_games_played: 1 } }
        ]);

    }

    async getWinner() {
        
        return await MongoosePlayer.aggregate([
            {$project: {
                username: "$username",
                success_rate: { $ifNull: [{ $avg: "$games.won" }, 0] },
                _id: 0
            }},
            {$sort: { success_rate: -1 }},
            {$limit: 1},
        ]);

    }

    async getLooser() {
        
        return await MongoosePlayer.aggregate([
            {$project: {
                username: "$username",
                success_rate: { $ifNull: [{ $avg: "$games.won" }, 0] },
                _id: 0
            }},
            {$sort: { success_rate: 1 }},
            {$limit: 1},
        ]);

    }

};