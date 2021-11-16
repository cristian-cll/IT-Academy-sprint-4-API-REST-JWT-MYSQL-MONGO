const Player = require('../domain/Player');
const PlayerRepository = require('../../shared/domain/player/PlayerRepository');
const SequelizePlayer = require("./MysqlPlayerSchema");
const SequelizeGame = require("../../games/infrastructure/MysqlGameSchema");
const sequelize = require("../../shared/infrastructure/persistance/MySQL/Sequelize");


module.exports = class MysqlPlayerRepository extends PlayerRepository {

    constructor() {
        super();
    }

    async add(playerInstance) {

        try {

            const user = await SequelizePlayer.create(
                {
                    username: playerInstance.username
                },
                {
                    include: "games",
                }
            );

            return user.id;

        } catch (err) {
            throw new Error('Error Occurred');
        }

    }


    async getById(playerId) {
  
        try {
            return await SequelizePlayer.findByPk(playerId, {
                include: [{
                    model: SequelizeGame,
                    as: "games",
                    attributes: ["diceOne", "diceTwo", "result", "won", "playerId"]
                }]
            });
        } catch (err) {
            throw new Error('Player not found in MySQL');
        }

    }


    async getByUsername(playerUsername) {
        
        try {
            return await SequelizePlayer.findOne(
                { where: { username: playerUsername } }
            );

        } catch (err) {
            throw new Error('Player not found in MySQL');
        }

    }

    async update(PlayerId, username) {

        try {
            return await SequelizePlayer.update(
                { username: username },
                { where: { id: PlayerId } }
            )
        } catch (err) {
            throw new Error('Error Occurred');
        }

    }


    async getAll() {

        try {
            const data = await SequelizePlayer.findAll({

                include: [{ model: SequelizeGame, as: "games", attributes: [] }],
                attributes: [
                    //[sequelize.col("Player.id"), "id"], if we want to show the id
                    [sequelize.col("username"), "username"],
                    [sequelize.fn("AVG", sequelize.col("games.won")), "success_rate"],
                ],
                group: ["Player.id"],
                raw: true,
            });


            return data.map(({username, id, success_rate}) => new Player(username, id, success_rate) );
    
        } catch (err) {
            throw new Error('Error Occurred');
        }

    }

};