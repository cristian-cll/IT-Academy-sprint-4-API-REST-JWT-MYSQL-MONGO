const RankingRepository = require('../../domain/ranking/RankingRepository');

const SequelizePlayer = require("../../../players/infrastructure/MysqlPlayerSchema");
const SequelizeGame = require("../../../games/infrastructure/MysqlGameSchema");
const sequelize = require("../../infrastructure/persistance/MySQL/Sequelize")

module.exports = class MysqlRankingRepository extends RankingRepository {

    constructor() {
        super();
    }

    async getRanking() {

        try {
            return await SequelizeGame.findAll({
                attributes: [
                    [sequelize.fn("count", sequelize.col("id")), "total_games_played"],
                    [sequelize.fn("AVG", sequelize.col("won")), "success_rate"]
                ],
            });

        } catch (err) {
            throw new Error('Player not found');
        }

    }

    async getWinner() {

        return await SequelizeGame.findOne({
            include: [{ model: SequelizePlayer, as: "player", attributes: [] }],
            group: ["PlayerId"],
            order: [[sequelize.fn("AVG", sequelize.col("won")), "DESC"]],
            attributes: [
                [sequelize.col("username"), "username"],
                [sequelize.fn("AVG", sequelize.col("won")), "success_rate"]
            ]
            
        });

    }

    async getLooser() {

        return await SequelizeGame.findOne({
            include: [{ model: SequelizePlayer, as: "player", attributes: [] }],
            group: ["PlayerId"],
            order: [[sequelize.fn("AVG", sequelize.col("won"))]],
            attributes: [
                [sequelize.col("username"), "username"],
                [sequelize.fn("AVG", sequelize.col("won")), "success_rate"]
            ]
        });

    }

};
