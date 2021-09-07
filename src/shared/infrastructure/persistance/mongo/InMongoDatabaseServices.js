const mongoose = require('mongoose');
const MongoPlayerRepository = require('../../../../players/infrastructure/MongoPlayerRepository');
const MongoGameRepository = require('../../../../games/infrastructure/MongoGameRepository');
const MongoRankingRepository = require('../../ranking/MongoRankingRepository');

const {MONGO_DB, MONGO_HOST, MONGO_PORT} = process.env;

const uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

module.exports = class MongoDatabaseServices {
    constructor() {
        this.playerRepository = new MongoPlayerRepository();
        this.gameRepository = new MongoGameRepository();
        this.rankingRepository = new MongoRankingRepository();
    }

    async initDatabase() {
        mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        
        mongoose.connection.once('open', () => console.log('Connection successfully in MongoDB'));
        mongoose.connection.on('error', (error) => console.log('Connect error in MongoDB', error));
        mongoose.connection.on('disconnected',  () => console.log('Connection disconnected in MongoDB'));
        
    }
};