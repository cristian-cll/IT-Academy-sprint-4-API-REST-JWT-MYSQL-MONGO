const MysqlPlayerRepository = require('../../../../players/infrastructure/MysqlPlayerRepository');
const MysqlGameRepository = require('../../../../games/infrastructure/MysqlGameRepository');
const MysqlRankingRepository = require('../../ranking/MysqlRankingRepository');

const db = require("./Sequelize")
require("./associations");


class MysqlDatabaseServices {
    constructor() {
        this.playerRepository = new MysqlPlayerRepository();
        this.gameRepository = new MysqlGameRepository();
        this.rankingRepository = new MysqlRankingRepository();
    }

    async initDatabase() {

        try {
            await db.authenticate();
            await db.sync({ force: false }) // we synchronize the mysql models
            console.log('Connection successfully in MySQL.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }

    }
};


module.exports = MysqlDatabaseServices;